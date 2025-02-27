import React from "react";
import "./PersonCard.css";

const PersonCard = ({
  chatId,
  otherId,
  name,
  lastMessage,
  timestamp,
  setcurrentChatId,
  setCurrentClientId,
  setCurrentClientName,
}) => {
  console.log({ otherId });
  let a = new Date(timestamp._seconds * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let h = new Date(timestamp._seconds).getHours();
  let m = new Date(timestamp._seconds).getMinutes();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return (
    <div
      className="PersonCard"
      onClick={() => {
        setcurrentChatId(chatId);
        setCurrentClientId(otherId);
        setCurrentClientName(name);
      }}
    >
      <img src="/images/profile_icon.png" />
      <div className="personCardInfo">
        <div className="personCardInfo-one">
          <div className="person-name">{name}</div>
          <div className="pc-latest-message">
            {lastMessage && lastMessage.length > 15
              ? lastMessage.slice(0, 15) + "..."
              : lastMessage}
          </div>
        </div>
        <div className="personCardInfo-two">
          <div className="pc-timestamp">{timestamp && days[a.getDay()]}</div>
          <div className="pc-time">{timestamp && `${h}:${m}`}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
