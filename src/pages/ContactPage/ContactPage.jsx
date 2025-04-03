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
    <div className="main-container-c">
      {/* <NavBar/> */}
      <SubNavBar />
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
            <div className="contact-details">
              <ul>
                <li>
                  <BiSolidPhoneCall />
                  0660850741
                </li>
                <li>
                  <MdEmail />
                  igaming@gmail.com
                </li>
                <li>
                  <IoLocationSharp /> 132 igaming Street JHB,
                  <br />
                  Massachusetts 02156 South Africa
                </li>
              </ul>
              <div className="social-links-c">
                <div className="social-icon-c">
                  <IoLogoTwitter id="twitter" className="twitter-icon" />
                </div>
                <div className="social-icon-c">
                  <SlSocialInstagram id="ig" className="ig-icon" />
                </div>
                <div className="social-icon-c">
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
    </div>
  );
}
