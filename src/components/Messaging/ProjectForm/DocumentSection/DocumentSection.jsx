import React from 'react';
import './DocumentSection.css';

const DocumentSection = ({ documentName, documentIcon }) => {
    return (
        <div className="submission-section">
            <div className="document-link">
                <span>{documentName}</span>
                <img src={documentIcon} alt="Document" />

            </div>
        </div>
    );
};

export default DocumentSection;
