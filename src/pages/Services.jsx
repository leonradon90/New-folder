import React from "react";
import cityImage from "../assets/city-image.png";
import robotBlue from "../assets/robot-blue.svg";
import robotField from "../assets/robot-field.png";
import brainstorming from "../assets/brainstorming.svg";
import taskAutomation from "../assets/task-automation.png";
import lightning from "../assets/lightning.svg";
import cityAI from "../assets/city-ai.png";
import humanCogwheels from "../assets/human-cogwheels.svg";
import settingsIcon from "../assets/settings.svg";
import {Link} from "react-router-dom";  

export default function Services() {
    return (
        <div>
            <div className="ai-services">
            <h1 className="main-heading">Our AI Services</h1>
            <p>Discover how our suite of AI-powered services can revolutionize your business, enhance efficiency, and drive growth</p>
        </div>
        <div className="services-page">
            <div className="ai-service">           
                <img className="ai-service-image" src={cityImage} alt=""/>
                <div className="ai-service-content">
                <div className="image-title">
                <img src={robotBlue} className="ai-service-icon" alt="" width="50px" height="50px"/>
                <div>
                <h2 className="ai-chatbot">AI Powered Chatbots</h2>
                <p>Enhance customer satisfaction and reduce support overhead with AI-driven chatbots. Available 24/7, they provide instant responses, resolve common queries, and escalate complex issues seamlessly.</p>
             </div> 
            </div>
                <h3>Key Feautures</h3>
                <ul>
                    <li>24/7 Customer Assistance</li>
                    <li>Natural Language Understanding</li>
                    <li>FAQ Handling</li>
                    <li>CRM Integration</li>
                </ul>
            <Link to ="/contact"><button className="explore-services active services-button">Explore Chatbots &#8594</button></Link>    
            </div>
             </div>
             <div className="ai-service">
                <img className="ai-service-image" src={robotField} alt=""/>
                <div className="ai-service-content">
                <div className="image-title">
                <img src={brainstorming} className="ai-service-icon" alt="" width="50px"/>
                <div>
                <h2 className="ai-chatbot">Custom AI Solutions Development</h2>
                <p>Have a unique challenge? We design and build bespoke AI solutions tailored to your specific business needs, helping you unlock new opportunities and gain a competitive edge.</p>
                </div>
                </div>
                <h3>Key Feautures</h3>
                <ul>
                    <li>Needs Assessment & Strategy</li>
                    <li>Machine Learning Model Development</li>
                    <li>Data Science & Analytics</li>
                    <li>Deployment & Ongoing Support</li>
                </ul>
               <Link to ="/contact"><button className="explore-services active services-button">Get Custom Quote &#8594</button></Link> 
            </div>
            </div>
             <div className="ai-service">
                <img src={taskAutomation} className="ai-service-image" alt=""/>
                <div className="ai-service-content">
                <div className="image-title">
                <img src={lightning} className="ai-service-icon" alt="" width="50px"/>
                <div>
                <h2 className="ai-chatbot">AI-Powered Task Automation</h2>
                <p>Automate repetitive and time-consuming tasks across your business operations. From data entry to customer communication, let AI handle the mundane so your team can focus on high-value work.</p>
                </div>
                </div>
                <h3>Key Feautures</h3>
                <ul>
                    <li>Process Automation</li>
                    <li>Data Processing & Analysis</li>
                    <li>Automated Reporting</li>
                    <li>Integration with Existing Tools</li>
                </ul>
               <Link to="/contact"><button className="explore-services active services-button">Discuss Automation &#8594</button></Link> 
            </div>
            </div>
              <div className="ai-service">
                <img src={cityAI} className="ai-service-image" alt="" width="100%"/>
                <div className="ai-service-content">
                <div className="image-title">
                <img src={humanCogwheels} className="ai-service-icon" alt=""  width="50px"/>
                  <div>
                <h2 className="ai-chatbot">Autonomous AI Agents</h2>
                <p>Deploy intelligent AI agents to handle complex workflows, from customer onboarding to proactive support and sales outreach. These agents operate autonomously to drive efficiency and results.</p>
                </div>
                </div>
                <h3>Key Feautures</h3>
                <ul>
                    <li>Autonomous Task Execution</li>
                    <li>Complex Workflow Automation</li>
                    <li>Proactive Customer Engagement</li>
                    <li>Data-driven Decision Making</li>
                </ul>
             <Link to ="/contact">   <button className="explore-services active services-button">Deploy an Agent &#8594</button></Link>
            </div>
            </div>
        </div>

        <div className="integrate-ai main-cover">
            <img src={settingsIcon} alt="" width="50"/>
            <h1>Ready to Integrate AI?</h1>
            <p>Whether you're looking to implement a specific solution or explore a custom AI strategy, our team is here to guide you.</p>
            <a href="https://calendar.app.google/2cHLdLWbzSeaVJGd7"><button className="get-consultation">Schedule A Free Consultation &#8594</button></a>
        </div>
        </div>
    )
}