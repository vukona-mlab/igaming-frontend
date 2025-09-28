import React, { useState } from "react";
import "./contactPact.css";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io5";
import { SlSocialInstagram } from "react-icons/sl";
import { FaDiscord } from "react-icons/fa";
// import NavBar from "../../components/Common/Navbar/navbar";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import Footer from "../footer/Footer";

export default function ContactPage({setName, setSurname, setEmail, setSubject, setMessage, setPhoneNumber, handleQuerySubmit }) {
  const [formData, handleFormDataChange] = useState({})
    const handleChange = (e) => {
    handleFormDataChange({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    
  }
  return (
    <div id="contact" className="main-container-c">
      {/* <NavBar/> */}
      {/* <SubNavBar /> */}
      <div className="heading-container-c">
        <h1 className="frst-heading-c">Contact Us</h1>
        <div className="scnd-heading-c">
          {" "}
          <p>Any questions or remarks? Just write us a message!</p>
        </div>
      </div>
      <div className="contact-page-c">
        {/* <div className="heading-container-c">
        <h1 className="frst-heading-c">Contact Us</h1>
        <div className="scnd-heading-c">
          {" "}
          <p>Any questions or remarks? Just write us a message!</p>
        </div>
      </div> */}
        <div className="contact-container-c">
          <div className="left-c">
            <h2 className="contact-heading-c">Contact Information</h2>
            <div className="thrd-heading-c">
              <p>Say something to start a live chat!</p>
            </div>
            <div className="contact-details-c">
              <ul>
                <li>
                  <span>
                    <BiSolidPhoneCall className="contact-icon-c" />
                  </span>
                  <span className="contact-info-c">0660850741</span>
                </li>
                <li>
                  <span>
                    <MdEmail className="contact-icon-c" />
                  </span>
                  <span className="contact-info-c">igaming@gmail.com</span>
                </li>
                <li>
                  <span>
                    <IoLocationSharp className="contact-icon-c" />
                  </span>{" "}
                  <span className="contact-info-c">
                    132 igaming Street JHB,
                    <br />
                    Massachusetts 02156 South Africa
                  </span>
                </li>
              </ul>
              <div className="social-links-c">
                <div className="social-icon-c">
                  <IoLogoTwitter id="twitter" className="twitter-icon" />
                </div>
                <div className="social-icon-c">
                  <SlSocialInstagram id="ig" className="ig-icon" />
                </div>
                {/* <div className="social-icon-c">
                  <FaDiscord id="discord" className="discord-icon" />
                </div> */}
              </div>
              {/* <div className="ellipse-conainer">
                <img
                  src="/images/Ellipse-full.png"
                  alt="full ellipse"
                  className="full-ellipse"
                ></img>
                <img
                  src="/images/Ellipse-half.png"
                  alt="half ellipse"
                  className="half-ellipse"
                ></img>
              </div> */}
            </div>
          </div>
          <div className="right-c">
            <form>
              <div className="input-container-c">
                <div className="input-left">
                  <label htmlFor="fname" className="name-email">
                    First name
                  </label>
                  <br />
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    className="input-field-c"
                    placeholder="John"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <br />
                  <label htmlFor="email" className="name-email">
                    Email
                  </label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john.doe@igaming.co.za"
                    className="input-field-c"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </div>
                <div className="input-right">
                  <label htmlFor="lname" className="last-number">
                    Last name
                  </label>
                  <br />
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    className="input-field-c"
                    placeholder="Doe"
                    onChange={(ev) => setSurname(ev.target.value)}
                  />
                  <br />
                  <label htmlFor="phoneNumber" className="last-number">
                    Phone number
                  </label>
                  <br />
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="input-field-c"
                    placeholder="0123456789"
                    onChange={(ev) => setPhoneNumber(ev.target.value)}
                  />
                </div>
              </div>
              <div className="subjects-c">
                <div className="message-box-c">
                  <label htmlFor="subject" className="message-text-c">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    placeholder="Write your subject"
                    style={{ height: "50px", padding: 10 }}
                    className="message-c"
                    onChange={(ev) => setSubject(ev.target.value)}
                  />
                </div>
                <div className="message-box-c">
                  <label htmlFor="message" className="message-text-c">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message.."
                    style={{ height: "200px" }}
                    className="message-c"
                    onChange={(ev) => setMessage(ev.target.value)}
                  />
                  <input type="button" className="send-button-c" value={"Send Message"} onClick={handleQuerySubmit}/>
                  {/* <div className="send-button-c" onClick={handleFormSubmission}>Send Message</div> */}
                </div>
              </div>
            </form>
            {/* <div className="chat-box-c">
              <div className="chat-text">Chat With Us</div>
              <div className="chat-img">
                <img
                  src="/images/message-icon.png"
                  alt="chat with us icon"
                  className="chat-icon-c"
                ></img>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
