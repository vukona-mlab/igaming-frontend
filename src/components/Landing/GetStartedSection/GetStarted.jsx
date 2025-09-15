import React from "react";
import "./getStarted.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SectionContainer from "../../SectionContainer";
import SectionHeader from "../section-header/SectionHeader";

export default function GetStarted() {
  return (
    <SectionContainer>
    <div className="gs">
      <SectionHeader text="Get Started" />
      <h1>
        <span className="how">How</span>{" "}
        <span className="ri-experts">Ri Experts </span>
        <span className="works">Works</span>
      </h1>
      <div className="second-heading">
        Understand the process before you hire your guy
      </div>
      <div className="cards-containers">
        <Container>
          <Row>
            <Col>
              <div className="cards">
                <div className="img-card">
                  <img
                    src="/images/red-magnifying-img.png"
                    width="300"
                  ></img>
                </div>
                
                <p>Access a pool of top talent across gaming categories.</p>
              </div>
            </Col>
            <Col>
              <div className="cards">
                <div className="img-card">
                  <img src="/images/green-red-img.png" width="300"></img>
                </div>
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
                    src="/images/green-tick-img.png"
                    width="300"
                  ></img>
                </div>
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
    </SectionContainer>

  );
}
