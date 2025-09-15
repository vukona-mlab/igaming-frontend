import React from "react";
import { LuMessageSquareShare } from "react-icons/lu"; // Import the LuMessageSquareShare icon
import ThumbsUpIcon from "../../../assets/mdi-light_thumb-up.svg";
import ShareIcon from "../../../assets/share.svg";
//import ShareIcon from '../../../assets/share.svg';
import "./ProjectCard.css";

const ProjectCard = ({
  projectPicture,
  projectName,
  likes,
  authorName,
  onDemoClick,
  onShareClick,
}) => {
  const formatLikes = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="fp-project-card">
      <div className="fp-project-image">
        <button className="fp-share-button" onClick={onShareClick}>
          <img src={ShareIcon} alt="share" className="fp-share-icon-first" />
        </button>
        <img
          src={projectPicture}
          alt={`${projectName} preview`}
          className="fp-project-picture"
        />
      </div>
      <div className="fp-project-info">
        <div className="fp-project-details">
          <h3 className="fp-project-name">{projectName}</h3>
          <p className="fp-project-p">{formatLikes(likes)} likes</p>
          <p className="fp-project-p">Author : {authorName}</p>
          <div className="fp-project-footer">
            <div className="d-flex justify-content-between align-items-center">
              <img
                src={ThumbsUpIcon}
                alt="thumbs up"
                className="fp-thumbs-icon"
              />
              <LuMessageSquareShare
                size={24}
                className="fp-share-icon"
                onClick={onShareClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
