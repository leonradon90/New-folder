import {Link} from "react-router-dom";
import mail from "../assets/mail.svg";
import robotWhite from "../assets/robot-white.svg";
import cross from "../assets/cross.svg";

export default function Contact() {
    return(
        <div>
               <img className="contact-image" src={mail} alt=""/>
        <h1 className="contact-us-title">Contact Us</h1>
        <p className="contact-us-text">Have questions or ready to start a project? We'd love to hear from you.</p>
        <div className="contact-page">
        <form className="contact-form" action="https://formsubmit.co/info@lekronis.com" method = "POST">
            <h2>
                Send us a Message
            </h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
            <label for="name">Full Name</label>
            <input type="text" name="name" placeholder="John Doe"/>
            <label for="email">Email Address</label>
            <input type="text" name="email" placeholder="you@example.com"/>
            <label for="message">Message</label>
            <textarea name="message" rows="5" placeholder="How can we help you today?"></textarea>
            <button className="explore-services active services-button" id="form-button">Send Message</button>
        </form>
        <div className="lets-connect">
            <h2>Let's Connect</h2>
            <p>We're eager to learn about your business and how our AI solutions can help you succeed.</p>
        </div>
        </div>
        <div className="our-location">
              <h2>Our Location & Hours</h2>
            <div className="address">
            <div className="email">
            <p><span>Lekronis HQ</span><br/>
            Naum Naumovski Borce 56, Skopje, 1000<br/>
            Email: info@lekronis.com<br/>
            Phone: +389 76 202 931</p></div>
            <div className="weekday">
            <p><span>Business Hours</span><br/>
            Monday - Saturday: 8:00 AM - 6:00 PM (CEST)<br/>
            Sunday: Closed</p>
            </div>
            </div>
        </div>
       
          <footer>
                <p>© 2025 Lekronis. All rights reserved.</p>
                <button id="chat-toggle-button" className="chat-toggle">
                  <img id="chat-icon-open" src={robotWhite} alt="chat open" hidden />
                  <img id="chat-icon-close" src={cross} alt="chat close" hidden />
                </button>
                {/* Chatbot will later be handled with React state/hooks */}
              </footer>
        </div>

    )
}