import React from "react";
import {
  BsCameraVideo,
  BsPersonCircle,
  BsThreeDotsVertical,
} from "react-icons/bs";
import "./ChatBox.css";

export default function EmptyChatBox() {
  return (
    <div className="f-chat-box">
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="avatar-wrapper">
            <BsPersonCircle className="default-avatar" />
            <span className={`online-status}`}></span>
          </div>
          <div className="user-info">
            <h3 className="user-name">{"No User"}</h3>
            <span className="user-status">No User</span>
          </div>
        </div>

        <div className="chat-header-right">
          <button className="video-call-button">
            <BsCameraVideo size={24} />
          </button>
          <button className="options-button">
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>
      <div style={{ padding: 15 }}>
        <span>No ongoing chats</span>
      </div>
    </div>
  );
}
