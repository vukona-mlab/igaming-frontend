import React from 'react';
import { LuMessageSquareShare } from 'react-icons/lu'; // Import the LuMessageSquareShare icon
import ThumbsUpIcon from '../../../assets/mdi-light_thumb-up.svg';
import ShareIcon from '../../../assets/share.svg';
//import ShareIcon from '../../../assets/share.svg';
import './ProjectCard.css';

const ProjectCard = ({ 
  projectPicture, 
  projectName, 
  likes,
  authorName, 
  onDemoClick,
  onShareClick 
}) => {
  const formatLikes = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };


  return (
    <div className="project-card">
      <div className="project-image">
        <button className="share-button" onClick={onShareClick}>
          <img src={ShareIcon} alt="share" className="share-icon-first" />
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
          <p className="project-p">{formatLikes(likes)} likes</p>
          <p className="project-p">Author : {authorName}</p>
          <div className="project-footer">
            <div className="d-flex justify-content-between align-items-center">
              <img src={ThumbsUpIcon} alt="thumbs up" className="thumbs-icon" />
              <LuMessageSquareShare 
                size={24} 
                className="share-icon" 
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
