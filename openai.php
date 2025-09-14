<?php
// openai.php - Complete working example for OpenAI Assistants API

header('Content-Type: application/json');

$apiKey = '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';
$assistantId = 'asst_kK39U12s2342yrSKsUO8y7GQ';

function sendRequest($method, $url, $data = null) {
    global $apiKey;
    $ch = curl_init($url);
    $headers = [
        "Authorization: Bearer $apiKey",
        "Content-Type: application/json",
        "OpenAI-Beta: assistants=v2"
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
    if ($data !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    $resp = curl_exec($ch);
    if ($resp === false) {
        error_log('Curl error: ' . curl_error($ch));
    }
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $json = json_decode($resp, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log('JSON decode error: ' . json_last_error_msg());
    }
    return ['http_code' => $code, 'raw' => $resp, 'json' => $json];
}

// Read user message from JSON POST body
$input = json_decode(file_get_contents('php://input'), true);
$userMessage = trim($input['message'] ?? '');

if (!$userMessage) {
    http_response_code(400);
    echo json_encode(['error' => 'No message provided']);
    exit;
}

// 1) Create a new conversation thread
$threadResp = sendRequest('POST', 'https://api.openai.com/v1/threads');
if ($threadResp['http_code'] < 200 || $threadResp['http_code'] >= 300) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create thread', 'details' => $threadResp]);
    exit;
}
$threadId = $threadResp['json']['id'] ?? null;
if (!$threadId) {
    http_response_code(500);
    echo json_encode(['error' => 'No thread ID returned', 'details' => $threadResp]);
    exit;
}

// 2) Send user message to the thread
$postMsgResp = sendRequest('POST', "https://api.openai.com/v1/threads/$threadId/messages", [
    "role" => "user",
    "content" => [
        [
            "type" => "text",
            "text" => $userMessage
        ]
    ]
]);
if ($postMsgResp['http_code'] < 200 || $postMsgResp['http_code'] >= 300) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to post user message', 'details' => $postMsgResp]);
    exit;
}

// 3) Run the assistant on the thread
$runResp = sendRequest('POST', "https://api.openai.com/v1/threads/$threadId/runs", [
    "assistant_id" => $assistantId
]);
if ($runResp['http_code'] < 200 || $runResp['http_code'] >= 300) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to run assistant', 'details' => $runResp]);
    exit;
}
$runId = $runResp['json']['id'] ?? null;
if (!$runId) {
    http_response_code(500);
    echo json_encode(['error' => 'No run ID returned', 'details' => $runResp]);
    exit;
}

// 4) Poll the assistant run status until completed (max 30 seconds)
$maxAttempts = 30;
$attempt = 0;
$status = '';
do {
    sleep(1);
    $pollResp = sendRequest('GET', "https://api.openai.com/v1/threads/$threadId/runs/$runId");
    $status = $pollResp['json']['status'] ?? '';
    $attempt++;
    if ($attempt >= $maxAttempts) break;
} while ($status !== 'completed' && $status !== 'failed' && $status !== 'cancelled');

if ($status !== 'completed') {
    http_response_code(500);
    echo json_encode(['error' => 'Assistant run did not complete', 'status' => $status, 'details' => $pollResp]);
    exit;
}

// 5) Get all messages in the thread to find the assistant's reply
$messagesResp = sendRequest('GET', "https://api.openai.com/v1/threads/$threadId/messages");

// Optionally save debug info to a file
file_put_contents(__DIR__ . '/openai_debug.json', json_encode($messagesResp['json'], JSON_PRETTY_PRINT));

// Extract assistant reply from messages
function extractAssistantReply($messages) {
    if (!isset($messages['data'])) return null;

    foreach ($messages['data'] as $msg) {
        $author = $msg['role'] ?? ($msg['author'] ?? null);
        if ($author === 'assistant') {
            $content = $msg['content'] ?? null;
            if (!$content || !is_array($content)) continue;

            $texts = [];
            foreach ($content as $part) {
                if (isset($part['type']) && $part['type'] === 'text') {
                    // This can be a string or an array with 'value'
                    if (is_array($part['text']) && isset($part['text']['value'])) {
                        $texts[] = $part['text']['value'];
                    } elseif (is_string($part['text'])) {
                        $texts[] = $part['text'];
                    }
                }
            }
            if (!empty($texts)) {
                return implode("\n", $texts);
            }
        }
    }
    return null;
}

$answer = extractAssistantReply($messagesResp['json']);

if (!$answer) {
    http_response_code(500);
    echo json_encode([
        'error' => 'No valid assistant reply found',
        'messages_response' => $messagesResp,
    ], JSON_PRETTY_PRINT);
    exit;
}

// Clean the assistant's answer by removing file citation tags like  
$cleanAnswer = preg_replace('/【\d+:\d+†[^】]+】/', '', $answer);

http_response_code($messagesResp['http_code']);
echo json_encode(['answer' => trim($cleanAnswer)]);
