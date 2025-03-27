import React from 'react';
import './ImageViewer.css';

const ImageViewer = ({ image, onClose }) => {
  return (
    <div className="image-viewer-overlay" onClick={onClose}>
      <div className="image-viewer-content" onClick={e => e.stopPropagation()}>
        <button className="close-viewer-button" onClick={onClose}>×</button>
        <img src={image.url} alt={image.name} className="viewer-image" />
      </div>
    </div>
  );
};

export default ImageViewer; 