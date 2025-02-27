import React from "react";
import "./PeopleComponent.css";
import PersonCard from "../PersonCard/PersonCard";

const PeopleComponent = ({ people }) => {
  return (
    <div className="PeopleComponent">
      {/* {people.map((person, i) => (
        <PersonCard key={i} person={person} />
      ))} */}
    </div>
  );
};

export default PeopleComponent;
