import React from 'react';
import './About.css'; // Custom CSS for the background
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import SectionContainer from '../SectionContainer';

const About = () => {
  return (
    <SectionContainer containerColor={'#f8f9fa'}>
      <section id='about' className="about-section text-center text-white d-flex align-items-center">
        <div className="container">
          <h1 className="display-4 fw-bold"> Ri Experts </h1>
          <p className="lead">
            <b> RI Experts is a premier freelance platform dedicated
              exclusively to professionals in the gaming industry.
              Whether you're an experienced consultant, a skilled
              developer, a compliance expert, or a creative marketer,
              RI Experts provides a space where your expertise meets
              businesses looking for specialised talent.
            </b>
          </p>
          <p className="lead"><b>RI Experts was founded with a clear vision: to create a dynamic and trusted platform
            where gaming industry professionals, businesses, and start-ups can connect
            seamlessly. We understand the industry’s unique demands and aim to bridge the
            gap between expert talent and companies seeking to innovate, grow, build affordable
            teams, and stay compliant in an ever-evolving market.
          </b> </p>
          <p className="lead"><b>We empower freelancers by providing them with opportunities to work with top-tier
            gaming operators, software providers, affiliates, and other industry players. At the
            same time, we help businesses and start-ups find the right professionals to complete
            projects efficiently.
          </b> </p>
          <p className="lead"><b>Our mission is to build a thriving ecosystem where skilled professionals can showcase their
            expertise and gaming industry businesses can access top talent with ease, ensuring
            growth, compliance, and innovation across the sector.
          </b> </p>
        </div>
      </section>
    </SectionContainer>

  );
};

export default About;