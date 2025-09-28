import React, { useState } from 'react';
import './ProjectDescription.css';


const ProjectDescription = ({ description, title }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const descriptionContent = (
        <>
            <p>
                {description}
            </p>
        </>
    );

    return (
        <>
            <div className="descriptions-section">
                <h2>{title}</h2>
                <div className="section-header">
                    <h3>Description</h3>
                    <button
                        className="view-full-screen"
                        onClick={() => setIsFullScreen(true)}
                        title="View Description"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>
                <div className="descriptions-content">
                    {descriptionContent}
                </div>
                <div className="submission-date">
                    <span>Submission date</span>
                    <span>2025 April 24</span>
                </div>
            </div>
            {isFullScreen && (
                <div className="full-screen-overlay">
                    <div className="full-screen-content">
                        <div className="full-screen-header">
                            <h2>777 Spinning Game - Description</h2>
                            <button
                                className="close-full-screen"
                                onClick={() => setIsFullScreen(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="full-screen-body">
                            {descriptionContent}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectDescription;
