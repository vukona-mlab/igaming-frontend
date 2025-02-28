import React from 'react';
import { LuMessageSquareShare } from 'react-icons/lu'; // Import the LuMessageSquareShare icon
import ThumbsUpIcon from '../../../assets/mdi-light_thumb-up.svg';
import ShareIcon from '../../../assets/share.svg';
//import ShareIcon from '../../../assets/share.svg';
import './Project-Card.css';

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
    <div className="project-card-p">
      <div className="project-image-p">
        <button className="share-button-p" onClick={onShareClick}>
          <img src={ShareIcon} alt="share" className="share-icon-first-p" />
        </button>
        <img 
          src={projectPicture} 
          alt={`${projectName} preview`} 
          className="project-picture-p"
        />
      </div>
      <div className="project-info-p">
        <div className="project-details-p">
          <h3 className="project-name-p">{projectName}</h3>
          <p className="project-p">{formatLikes(likes)} likes</p>
          <p className="project-p">Author : {authorName}</p>
          <div className="project-footer-p">
            <div className="d-flex justify-content-between align-items-center">
              <img src={ThumbsUpIcon} alt="thumbs up" className="thumbs-icon-p" />
              <LuMessageSquareShare 
                size={24} 
                className="share-icon-p" 
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
