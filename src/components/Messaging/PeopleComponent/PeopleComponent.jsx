import React from "react";
import "./PeopleComponent.css";
import PersonCard from "../PersonCard/PersonCard";

const PeopleComponent = ({
  people,
  setcurrentChatId,
  setCurrentClientId,
  setCurrentClientName,
}) => {
  return (
    <div className="PeopleComponent">
      <div className="people-title">People</div>
      {people.map((person, i) => (
        <PersonCard
          key={i}
          chatId={person.chatId}
          otherId={person.otherId}
          name={person.name}
          lastMessage={person.lastMessage}
          timestamp={person.timestamp}
          setcurrentChatId={setcurrentChatId}
          setCurrentClientId={setCurrentClientId}
          setCurrentClientName={setCurrentClientName}
        />
      ))}
    </div>
  );
};

export default PeopleComponent;
