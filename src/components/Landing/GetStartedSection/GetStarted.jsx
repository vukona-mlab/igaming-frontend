import React from "react";
import "./getStarted.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function GetStarted() {
  return (
    <div className="gs">
      <div className="get-started-box">
        <h6>
          Get Started<div className="red-line"></div>
        </h6>
      </div>
      <h1>
        <span className="how">How</span>{" "}
        <span className="ri-experts">Ri Experts </span>
        <span className="works">Works</span>
      </h1>
      <div className="second-heading">
<<<<<<< HEAD
        Undertand the process before you hire your guy
=======
        Understand the process before you hire your guy
>>>>>>> 88ccef9b6aa48dc1833a7fd7cc6f7cb1941722be
      </div>
      <div className="cards-containers">
        <Container>
          <Row>
            <Col>
              <div className="cards">
                <div className="img-card">
                  <img
                    src="/public/images/red-magnifying-img.png"
                    width="300"
                  ></img>
                </div>
<<<<<<< HEAD
                <hr />
=======
                
>>>>>>> 88ccef9b6aa48dc1833a7fd7cc6f7cb1941722be
                <p>Access a pool of top talent across gaming categories.</p>
              </div>
            </Col>
            <Col>
              <div className="cards">
                <div className="img-card">
                  <img src="/public/images/green-red-img.png" width="300"></img>
                </div>
<<<<<<< HEAD
                <hr />
=======
>>>>>>> 88ccef9b6aa48dc1833a7fd7cc6f7cb1941722be
                <p>
                  Get quality done quickly and within <br />
                  budget.
                </p>
              </div>
            </Col>
            <Col>
              <div className="cards">
                <div className="img-card">
                  <img
                    src="/public/images/green-tick-img.png"
                    width="300"
                  ></img>
                </div>
<<<<<<< HEAD
                <hr />
=======
>>>>>>> 88ccef9b6aa48dc1833a7fd7cc6f7cb1941722be
                <p>
                  Only pay when you're happy with the <br />
                  services.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
