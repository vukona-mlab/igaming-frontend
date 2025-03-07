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
      {people.length === 0 ? (
        <div>No chats</div>
      ) : (
        <>
          <div className="people-title">People</div>
          {people.map((person, i) => (
            <div key={i}>
              <div>{console.log(person)}</div>
              <PersonCard
                key={i}
                chatId={person.id}
                otherId={
                  (person &&
                    person.participants &&
                    person.participants.filter(
                      (part) => part.uid !== localStorage.getItem("uid")
                    )[0].uid) ||
                  ""
                }
                name={
                  (person &&
                    person.participants &&
                    person.participants.filter(
                      (part) => part.uid !== localStorage.getItem("uid")
                    )[0].name) ||
                  ""
                }
                lastMessage={person.lastMessage}
                timestamp={person.createdAt._seconds}
                photoUrl={
                  (person &&
                    person.participants &&
                    person.participants.filter(
                      (part) => part.uid !== localStorage.getItem("uid")
                    )[0].photoURL) ||
                  ""
                }
                setcurrentChatId={setcurrentChatId}
                setCurrentClientId={setCurrentClientId}
                setCurrentClientName={setCurrentClientName}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PeopleComponent;
