import React from "react";
import "./contactPact.css";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io5";
import { SlSocialInstagram } from "react-icons/sl";
import { FaDiscord } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mpwpjayk");

  if (state.succeeded) {
    return <p>Thanks for your message! We will be in contact with you soon.</p>;
  }

  return (
    <div className="contact-page">
      <div className="heading-container">
        <h1>Contact Us</h1>
        <div className="scnd-heading">
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
              <li>
                <BiSolidPhoneCall /> 0660850741
              </li>
              <li>
                <MdEmail /> igaming@gmail.com
              </li>
              <li>
                <IoLocationSharp /> 132 iGaming Street JHB,
                <br />
                Massachusetts 02156 South Africa
              </li>
            </ul>
            <div className="social-links">
              <IoLogoTwitter />
              <SlSocialInstagram />
              <FaDiscord />
            </div>
          </div>
        </div>

        <div className="right">
          {/* SINGLE FORM FOR SUBMISSION */}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="input-left">
                <label htmlFor="fname">First Name:</label>
                <input type="text" id="fname" name="fname" required />
                <ValidationError
                  prefix="First name"
                  field="fname"
                  errors={state.errors}
                />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>

              <div className="input-right">
                <label htmlFor="lname">Last Name:</label>
                <input type="text" id="lname" name="lname" required />
                <ValidationError
                  prefix="Last Name"
                  field="lname"
                  errors={state.errors}
                />

                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" name="phone" required />
                <ValidationError
                  prefix="Phone"
                  field="phone"
                  errors={state.errors}
                />
              </div>
            </div>

            {/* SUBJECT SELECTION */}
            <div className="subjects">
              <h6>Select Subject:</h6>
              <div className="select-subjects">
                <input
                  type="checkbox"
                  id="subject1"
                  name="subject"
                  value="General Enquiry"
                />
                <label htmlFor="subject1">General Enquiry</label>

                <input
                  type="checkbox"
                  id="subject2"
                  name="subject"
                  value="Support"
                />
                <label htmlFor="subject2">Support</label>

                <input
                  type="checkbox"
                  id="subject3"
                  name="subject"
                  value="Feedback"
                />
                <label htmlFor="subject3">Feedback</label>

                <ValidationError
                  prefix="Subject"
                  field="subject"
                  errors={state.errors}
                />
              </div>
            </div>

            {/* MESSAGE BOX */}
            <div className="message-box">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write something..."
                style={{ height: "200px" }}
                required
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>

            {/* SUBMIT BUTTON (INSIDE FORM) */}
            <button type="submit" disabled={state.submitting}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
