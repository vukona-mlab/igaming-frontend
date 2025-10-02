import React, { useState, useEffect, useRef } from "react";
import Button from "../Button/MessageButton";
import ThumbsUpIcon from "../../assets/mdi-light_thumb-up.svg";
import ShareIcon from "../../assets/share.svg";
import "./ProjectCard.css";
import BACKEND_URL from "../../config/backend-config";
import { Spinner } from "react-bootstrap";

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
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] =useState([]);

  const fetchProjects= async() =>{
    setLoading(true)
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/projects/allProjects?role=${"freelancer"}`, 
      )
      if(!response.ok) throw new Error("Failed to fetch all projects");
      const data = await response.json();
      setProjects(data.projects || []); // store fetched projects
      console.log("fetched Projects", data);
    } catch (error) {
      console.error("Failed to fetch all Projects", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

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
          <p className="project-likes">
            {likes !== undefined ? formatLikes(likes) : 0} likes
          </p>
          <div className="project-stats">
            <span className="author">Author: {authorName}</span>
            <div className="thumbs-up">
              <img
                src={ThumbsUpIcon}
                alt="thumbs up"
                className="thumbs-icon"
              />
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
