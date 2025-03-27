import React from "react";
import "./contactPact.css";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io5";
import { SlSocialInstagram } from "react-icons/sl";
import { FaDiscord } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="heading-container">
        <h1>Contact Us</h1>
        <div className="scnd-heading">
          {" "}
          <p>Any questions or remarks? Just write us a message!</p>
        </div>
      </div>
      <div className="contact-container">
        <div className="left">
          <h2>Contact Information</h2>
          <div className="thrd-heading">
            <p>Say something to start a live chat!</p>
          </div>
          <div className="contact-details">
            <ul>
              <li><BiSolidPhoneCall className="contact-icon"/>0660850741</li>
              <li><MdEmail className="contact-icon"/>igaming@gmail.com</li>
              <li>
              <IoLocationSharp className="contact-icon"/> 132 igaming Street JHB,
                <br />
                Massachusetts 02156 South Africa
              </li>
            </ul>
            <div className="social-links"><IoLogoTwitter className="social-icon"/><SlSocialInstagram className="social-icon"/><FaDiscord className="social-icon"/></div>
            <img src="/public/images/Ellipse-full.png" alt="full ellipse" className="full-ellipse"></img>
            <img src="/public/images/Ellipse-half.png" alt="half ellipse" className="half-ellipse"></img>
          </div>
        </div>
        <div className="right">
            <form>
          <div className="input-container">
            <div className="input-left">
              {/* <form> */}
                <label htmlFor="fname">First name</label>
                <br />
                <input type="text" id="fname" name="fname" className="input-field" />
                <br />
                <label htmlFor="lname">Email</label>
                <br />
                <input type="text" id="lname" name="lname" className="input-field"/>
              {/* </form> */}
            </div>
            <div className="input-right">
              {/* <form> */}
                <label htmlFor="fname">Last name</label>
                <br />
                <input type="text" id="fname" name="fname" className="input-field"/>
                <br />
                <label htmlFor="lname">Phone number</label>
                <br />
                <input type="text" id="lname" name="lname" className="input-field"/>
              {/* </form> */}
            </div>
          </div>
          <div className="subjects">
            <h6 className="subject-heading">Select subject?</h6>
            <div className="select-subjects">
              {/* <form className="check-form"> */}
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
                <label htmlFor="vehicle1">General enquiry</label>
                <br />

                <input
                  type="checkbox"
                  id="vehicle2"
                  name="vehicle2"
                  value="Car"
                />
                <label htmlFor="vehicle2"> General enquiry</label>
                <br />

                <input
                  type="checkbox"
                  id="vehicle3"
                  name="vehicle3"
                  value="Boat"
                />
                <label htmlFor="vehicle3">General enquiry</label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle3"
                  name="vehicle3"
                  value="Boat"
                />
                <label htmlFor="vehicle3">General enquiry</label>
              {/* </form> */}
            </div>
            <div className="message-box">
            {/* <form action="action_page.php"> */}
              <label htmlFor="subject">Subject</label>
              <textarea
                id="subject"
                name="subject"
                placeholder="Write something.."
                style={{ height: "200px" }}
              />
            {/* </form> */}
            <div className="button">Send Message</div>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
