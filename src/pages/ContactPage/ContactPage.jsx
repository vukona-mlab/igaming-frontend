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
              <li><BiSolidPhoneCall />0660850741</li>
              <li><MdEmail />igaming@gmail.com</li>
              <li>
              <IoLocationSharp /> 132 igaming Street JHB,
                <br />
                Massachusetts 02156 South Africa
              </li>
            </ul>
            <div className="social-links"><IoLogoTwitter /><SlSocialInstagram /><FaDiscord /></div>
          </div>
        </div>
        <div className="right">
          <div className="input-container">
            <div className="input-left">
              <form>
                <label htmlFor="fname">First name:</label>
                <br />
                <input type="text" id="fname" name="fname" />
                <br />
                <label htmlFor="lname">Email:</label>
                <br />
                <input type="text" id="lname" name="lname" />
              </form>
            </div>
            <div className="input-right">
              <form>
                <label htmlFor="fname">Last name:</label>
                <br />
                <input type="text" id="fname" name="fname" />
                <br />
                <label htmlFor="lname">Phone number:</label>
                <br />
                <input type="text" id="lname" name="lname" />
              </form>
            </div>
          </div>
          <div className="subjects">
            <h6>Select subject?</h6>
            <div className="select-subjects">
              <form className="check-form">
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
              </form>
            </div>
            <div className="message-box">
            <form action="action_page.php">
              <label htmlFor="subject">Subject</label>
              <textarea
                id="subject"
                name="subject"
                placeholder="Write something.."
                style={{ height: "200px" }}
              />
            </form>
            <button>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
