import {Link} from "react-router-dom";
import robot from "../assets/robot.svg";
import lightBulb from "../assets/light-bulb.svg";
import taskAI from "../assets/task-ai.svg";
import arrowIncrease from "../assets/arrow-increase.svg";
import clock from "../assets/clock.svg";
import arrowDown from "../assets/arrow-down.svg";
import percentage from "../assets/percentage.svg";
import shoppingCart from "../assets/shopping-cart.svg";
import dollar from "../assets/dollar.svg";
import cityImage from "../assets/city-image.jpg";
import robotWhite from "../assets/robot-white.svg";
import cross from "../assets/cross.svg";



export default function Home() {
    return(
   <div>
      {/* Hero Section */}
      <div className="main-cover">
        <h1 className="main-heading">AI Chatbot Assistant</h1>
        <p className="main-heading-paragraph">
          Supercharge your business with cutting-edge AI solutions. From chatbot
          assistance to custom software, we empower your success.
        </p>
        <Link to="/services">
          <button className="explore-services active">Explore Services →</button>
        </Link>
        <Link to="/contact">
          <button className="explore-services">Contact Us →</button>
        </Link>
      </div>

      {/* Services Section */}
      <h1 className="our-services">Our Main Offerings</h1>
      <div className="our-offerings">
        <div className="services">
          <img className="robot-img" src={robot} alt="Chatbot" />
          <h2>Chatbot Assistant</h2>
          <p>
            Engage customers and automate support with an intelligent AI
            chatbot, trainable for your specific business needs.
          </p>
          <Link className="link" to="/chatbot">
            Ask Chatbot
          </Link>
        </div>

        <div className="services">
          <img className="icon-light-bulb" src={lightBulb} alt="Custom Software" />
          <h2>Custom Coded Software</h2>
          <p>
            Custom coded software for your needs that makes your work easier,
            improves revenue, and reduces costs.
          </p>
          <Link className="link" to="/services">
            Discover Possibilities
          </Link>
        </div>

        <div className="services">
          <img className="robot-img" src={taskAI} alt="AI Automation" />
          <h2>AI Task Automation Solutions</h2>
          <p>
            Tailored AI development to meet your unique business challenges.
            Let’s build the future of your business together.
          </p>
          <Link className="link" to="/contact">
            Automate Repetitive Tasks
          </Link>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits">
        <h2 className="results">
          Real Results with AI: Performance That Drives Growth
        </h2>
        <h3>
          Automate smarter. Convert faster. Support better. Businesses using our
          custom AI chatbot solutions are seeing dramatic improvements:
        </h3>

        <div className="results-show">
          <div className="results-showcase">
            <img src={arrowIncrease} alt="" width="50" />
            <p>
              <b>+45% Increase In Qualified Leads</b>
              <br />
              <span>through instant engagement</span>
            </p>
          </div>

          <div className="results-showcase">
            <img src={clock} alt="" width="50" />
            <p>
              <b>60–80% Faster Response Times</b>
              <br />
              <span>compared to traditional support</span>
            </p>
          </div>

          <div className="results-showcase">
            <img src={arrowDown} alt="" width="50" />
            <p>
              <b>Up To 70% Reduction In Manual Tickets</b>
              <br />
              <span>Freeing up your support team</span>
            </p>
          </div>

          <div className="results-showcase">
            <img src={percentage} alt="" width="50" />
            <p>
              <b>30–50% Drop In Operating Costs</b>
              <br />
              <span>By optimizing workflows</span>
            </p>
          </div>

          <div className="results-showcase">
            <img src={shoppingCart} alt="" width="50" />
            <p>
              <b>25% Boost In eCommerce Sales</b>
              <br />
              <span>Via intelligent product suggestions</span>
            </p>
          </div>

          <div className="results-showcase">
            <img src={dollar} alt="" width="50" />
            <p>
              <b>3x More Conversions In B2B</b>
              <br />
              <span>with real-time lead qualification</span>
            </p>
          </div>
        </div>

        <p className="benefits-text">
          <b>
            Whether you're in eCommerce, B2B, SaaS, or Services, our chatbot
            adapts to your business — and your bottom line.  
            Always-on, fully scalable, and brand-personalized.  
            It’s not just automation — it’s performance optimization.
          </b>
        </p>

        <a href="https://calendar.app.google/2cHLdLWbzSeaVJGd7" target="_blank">
          <button className="get-consultation results-consultation">
            Schedule A Free Consultation →
          </button>
        </a>
      </div>

      {/* Pricing Section */}
      <div className="pricing main-cover">
        <h1>Pricing</h1>
        <p>
          We have custom pricing for each client based on their needs. Whether
          you need an AI chatbot or an AI Agent, our price depends on your
          requirements and tech stack.
        </p>
        <a href="https://calendar.app.google/2cHLdLWbzSeaVJGd7" target="_blank">
          <button className="get-consultation">
            Schedule A Free Consultation →
          </button>
        </a>
      </div>

      {/* Product Showcase */}
      <div className="product-showcase">
        <img className="city-image" src={cityImage} alt="Product showcase" />
        <div className="city-div">
          <h1 className="heading">Unlock Your Business Potential</h1>
          <p>
            At Lekronis, we believe in the transformative power of artificial
            intelligence. Our solutions are designed to be:
          </p>
          <ul>
            <li><b>Innovative:</b> Leveraging the latest AI advancements</li>
            <li><b>Efficient:</b> Saving you time and resources</li>
            <li><b>Scalable:</b> Growing with your business needs</li>
            <li><b>User-Friendly:</b> Easy to integrate and use</li>
          </ul>
          <a href="https://calendar.app.google/2cHLdLWbzSeaVJGd7" target="_blank">
            <button className="get-consultation">Get a Free Consultation</button>
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="elevate-business main-cover">
        <h1>Ready to Elevate Your Business?</h1>
        <p>
          Join businesses already benefiting from our AI expertise. Let's
          discuss how we can help you achieve your goals.
        </p>
        <Link to="/contact">
          <button className="contact-us">Contact Us Today</button>
        </Link>
      </div>

      {/* Footer */}
      <footer>
        <p>© 2025 Lekronis. All rights reserved.</p>
        <button id="chat-toggle-button" className="chat-toggle">
          <img id="chat-icon-open" src={robotWhite} alt="chat open" />
          <img id="chat-icon-close" src={cross} alt="chat close" hidden />
        </button>
        {/* Chatbot will later be handled with React state/hooks */}
      </footer>
    </div>
  );
}