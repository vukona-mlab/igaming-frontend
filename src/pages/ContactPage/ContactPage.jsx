import React from "react";
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

export default function ContactPage() {
  return (
  <div className="main-container">
    {/* <NavBar/> */}
    <SubNavBar />
    <div className="contact-page">
      <div className="heading-container">
        <h1 className="frst-heading">Contact Us</h1>
        <div className="scnd-heading">
          {" "}
          <p>Any questions or remarks? Just write us a message!</p>
        </div>
      </div>
      <div className="contact-container">
        <div className="left">
          <h2 className="contact-heading">Contact Information</h2>
          <div className="thrd-heading">
            <p>Say something to start a live chat!</p>
          </div>
          <div className="contact-details">
            <ul>
              <li>
                <span>
                  <BiSolidPhoneCall className="contact-icon" />
                </span>
                <span className="contact-info">0660850741</span>
              </li>
              <li>
                <span>
                  <MdEmail className="contact-icon" />
                </span>
                <span className="contact-info">igaming@gmail.com</span>
              </li>
              <li>
                <span>
                  <IoLocationSharp className="contact-icon" />
                </span>{" "}
                <span className="contact-info">
                  132 igaming Street JHB,
                  <br />
                  Massachusetts 02156 South Africa
                </span>
              </li>
            </ul>
            <div className="social-links">
              <div className="social-icon">
                <IoLogoTwitter id="titter" className="twitter-icon" />
              </div>
              <div className="social-icon">
                <SlSocialInstagram id="ig" className="ig-icon" />
              </div>
              <div className="social-icon">
                <FaDiscord id="discord" className="discord-icon" />
              </div>
            </div>
            <div className="ellipse-conainer">
              <img
                src="/public/images/Ellipse-full.png"
                alt="full ellipse"
                className="full-ellipse"
              ></img>
              <img
                src="/public/images/Ellipse-half.png"
                alt="half ellipse"
                className="half-ellipse"
              ></img>
            </div>
          </div>
        </div>
        <div className="right">
          <form>
            <div className="input-container">
              <div className="input-left">
                <label htmlFor="fname" className="name-email">
                  First name
                </label>
                <br />
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  className="input-field"
                />
                <br />
                <label htmlFor="lname" className="name-email">
                  Email
                </label>
                <br />
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  className="input-field"
                />
              </div>
              <div className="input-right">
                <label htmlFor="fname" className="last-number">
                  Last name
                </label>
                <br />
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  className="input-field"
                />
                <br />
                <label htmlFor="lname" className="last-number">
                  Phone number
                </label>
                <br />
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  className="input-field"
                />
              </div>
            </div>
            <div className="subjects">
              <h6 className="subject-heading">Select subject?</h6>
              <div className="select-subjects">
                {/* <form className="check-form"> */}
                <input
                  type="checkbox"
                  id="checkbox"
                  name="vehicle1"
                  value="Bike"
                  className="checkbox"
                />
                <label htmlFor="vehicle1">General enquiry</label>
                <br />

                <input
                  type="checkbox"
                  id="checkbox"
                  name="vehicle2"
                  value="Car"
                  className="checkbox"
                />
                <label htmlFor="vehicle2"> General enquiry</label>
                <br />

                <input
                  type="checkbox"
                  id="checkbox"
                  name="vehicle3"
                  value="Boat"
                  className="checkbox"
                />
                <label htmlFor="vehicle3">General enquiry</label>
                <br />
                <input
                  type="checkbox"
                  id="checkbox"
                  name="vehicle3"
                  value="Boat"
                  className="checkbox"
                />
                <label htmlFor="vehicle3">General enquiry</label>
                {/* </form> */}
              </div>
              <div className="message-box">
                <label htmlFor="subject" className="message-text">
                  Message
                </label>
                <textarea
                  id="subject"
                  name="subject"
                  placeholder="Write write youir message.."
                  style={{ height: "200px" }}
                />
                <div className="send-button">Send Message</div>
              </div>
            </div>
          </form>
          <div className="chat-box">
            <div className="chat-text">Chat With Us</div>
            <div className="chat-img">
              <img
                src="/public/images/message-icon.png"
                alt="chat with us icon"
                className="chat-icon"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <Footer/>
  </div>
  );
}
