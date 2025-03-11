import React from "react";
import Button from "../Button/MessageButton";
import ThumbsUpIcon from "../../assets/mdi-light_thumb-up.svg";
import ShareIcon from "../../assets/share.svg";
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
    <div className="project-card">
      <div className="project-image">
        <button className="share-button" onClick={onShareClick}>
          <img src={ShareIcon} alt="share" className="share-icon" />
        </button>
        <img
          src={projectPicture}
          alt={`${projectName} preview`}
          className="project-picture"
        />
      </div>
      <div className="project-info">
        <div className="project-details">
          <h3 className="project-name">{projectName}</h3>
          <p className="project-likes">{likes && formatLikes(likes)} likes</p>
          <div className="project-stats">
            <span className="author">Author : {authorName}</span>
            <div className="thumbs-up">
              <img src={ThumbsUpIcon} alt="thumbs up" className="thumbs-icon" />
            </div>
          </div>
        </div>
        <Button onClick={onDemoClick} className="demo-btn">
          Demo Link
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
