import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectDetails.css";
import ImageViewer from "./ImageViewer";
import { CiCamera } from "react-icons/ci"; // Import the camera icon
import { GoUpload } from "react-icons/go";

const ProjectDetails = ({ project: initialProject, onClose }) => {
  const [currentTab, setCurrentTab] = useState("Details");
  const [project, setProject] = useState(initialProject);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadingDocs, setUploadingDocs] = useState(false);
  const [uploadProgressDocs, setUploadProgressDocs] = useState(0);
  const documentInputRef = useRef(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [currentImage, setCurrentImage] = useState(project.picture || "");

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileUpload = async (files) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${project.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const result = await response.json();

      // Update the project's files list by combining existing and new files
      setProject((prevProject) => ({
        ...prevProject,
        files: [...(prevProject.files || []), ...(result.updatedFiles || [])],
      }));

      // Force a re-render
      setUploadProgress(100);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again.");
      setUploading(false);
    }
  };

  const handleDocumentSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      handleDocumentUpload(files);
    }
  };

  const handleDocumentUpload = async (files) => {
    try {
      setUploadingDocs(true);
      setUploadProgressDocs(0);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("docs", file);
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${project.id}/docs`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload documents");
      }

      const result = await response.json();

      // Update the project's docs list
      setProject((prevProject) => ({
        ...prevProject,
        // docs: [...(prevProject.docs || []), ...(result.updatedDocs || [])],
        docs: [...(result.updatedDocs || [])],
      }));

      setUploadProgressDocs(100);
      setTimeout(() => {
        setUploadingDocs(false);
        setUploadProgressDocs(0);
      }, 1000);
    } catch (error) {
      console.error("Error uploading documents:", error);
      alert("Failed to upload documents. Please try again.");
      setUploadingDocs(false);
    }
  };

  const handleDeleteFile = async (fileUrl) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${project.id}/files`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ fileUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      // Update the project's files list
      setProject((prevProject) => ({
        ...prevProject,
        files: prevProject.files.filter((file) => file.url !== fileUrl),
      }));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file. Please try again.");
    }
  };

  const handleDeleteDocument = async (fileUrl) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${project.id}/docs`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ fileUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      // Update the project's docs list
      setProject((prevProject) => ({
        ...prevProject,
        docs: prevProject.docs.filter((doc) => doc.url !== fileUrl),
      }));
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document. Please try again.");
    }
  };

  // Update the Images tab section
  const renderImagesTab = () => (
    <div className="project-details-content">
      <div className="pjd-detail-group">
        <div className="images-header">
          <h3>Project Images</h3>
          <div className="upload-section">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <button
              className="pjd-upload-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <i className="fas fa-upload"></i> Upload Images
            </button>
            {uploading && (
              <div className="upload-progress-container">
                <div className="upload-progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="upload-status">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </div>
        </div>

        {(!project.files || project.files.length === 0) && (
          <div className="tab-description">
            <p>
              View and manage all project-related images. This section allows
              you to:
            </p>
            <ul>
              <li>View all project images in a grid layout</li>
              <li>Preview images in full size</li>
              <li>Upload new images to the project</li>
              <li>Delete images when they're no longer needed</li>
            </ul>
            <p className="upload-instructions">
              Supported formats: JPG, PNG, GIF. Maximum file size: 5MB per image
            </p>
          </div>
        )}

        <div className="images-grid">
          {project.files && project.files.length > 0 ? (
            project.files.map((file, index) => (
              <div
                key={index}
                className="image-item"
                onClick={() => setSelectedImage(file)}
              >
                <img src={file.url} alt={`Project image ${index + 1}`} />
                <button
                  className="delete-image-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFile(file.url);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="no-images-message">
              <i className="fas fa-images"></i>
              <p>
                No images uploaded yet. Click the button above to add images to
                your project.
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <ImageViewer
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );

  // Update the Documents tab section
  const renderDocumentsTab = () => (
    <div className="project-details-content">
      <div className="pjd-detail-group">
        <div className="documents-header">
          <h3>Project Documents</h3>
          <div className="upload-section">
            <input
              type="file"
              ref={documentInputRef}
              accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
              multiple
              style={{ display: "none" }}
              onChange={handleDocumentSelect}
            />
            <button
              className="pjd-upload-button"
              onClick={() => documentInputRef.current?.click()}
              disabled={uploadingDocs}
            >
              <i className="fas fa-file-upload"></i> Upload Documents
            </button>
            {uploadingDocs && (
              <div className="upload-progress-container">
                <div className="upload-progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadProgressDocs}%` }}
                  ></div>
                </div>
                <p className="upload-status">
                  Uploading... {uploadProgressDocs}%
                </p>
              </div>
            )}
          </div>
        </div>

        {(!project.docs || project.docs.length === 0) && (
          <div className="tab-description">
            <p>
              Manage all project-related documents and files. This section
              allows you to:
            </p>
            <ul>
              <li>Upload and store important project documents</li>
              <li>Download shared files and resources</li>
              <li>Track document versions and updates</li>
              <li>Organize files by type and purpose</li>
            </ul>
            <p className="upload-instructions">
              Supported formats: PDF, DOC, DOCX, TXT, XLS, XLSX. Maximum file
              size: 10MB
            </p>
          </div>
        )}

        <div className="documents-grid">
          {project.docs && project.docs.length > 0 ? (
            project.docs.map((doc, index) => (
              <div key={index} className="document-item">
                <div className="document-icon">
                  <i className={`fas ${getDocumentIcon(doc.type)}`}></i>
                </div>
                <div
                  className="document-info"
                  onClick={() => {
                    if (doc.type === "application/pdf") {
                      setSelectedDocument(doc);
                    } else {
                      window.open(doc.url, "_blank");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <span className="document-name">{doc.name}</span>
                  <span className="document-date">
                    {new Date(
                      doc.uploadedAt._seconds || doc.uploadedAt
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="document-actions">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-download"
                  >
                    <i className="fas fa-download"></i>
                  </a>
                  <button
                    className="document-delete"
                    onClick={() => handleDeleteDocument(doc.url)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-documents-message">
              <i className="fas fa-file-alt"></i>
              <p>
                No documents uploaded yet. Click the button above to add
                documents to your project.
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedDocument && (
        <div
          className="document-viewer-overlay"
          onClick={() => setSelectedDocument(null)}
        >
          <div
            className="document-viewer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-viewer"
              onClick={() => setSelectedDocument(null)}
            >
              <i className="fas fa-times"></i>
            </button>
            <iframe
              src={`${selectedDocument.url}#toolbar=0`}
              title="Document Viewer"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </div>
  );

  // Add helper function for document icons
  const getDocumentIcon = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return "fa-file-pdf";
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "fa-file-word";
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "fa-file-excel";
      default:
        return "fa-file-alt";
    }
  };
  console.log("my project", project);
  const handleImageUpload = () => {
    document.getElementById("fileInput").click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCurrentImage(e.target.result);
      reader.readAsDataURL(file);
    }
    // setCurrentImage(file);
    // try {
    //    const response = await fetch(
    //     `${import.meta.env.VITE_API_URL}/api/projects/${project.id}`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         Authorization: token,
    //       },
    //       body: formData,
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Failed to upload files");
    //   }

    //   const result = await response.json();
    // } catch (error) {

    // }
  };
  return (
    <div className="project-details-modal-overlay">
      <div className="pjd-project-details-modal">
        <div className="pjd-project-details-header">
          <h2>Project Details</h2>
          <div className="header-actions">
            <button className="pjd-close-button" onClick={onClose}>
              ×
            </button>
          </div>
        </div>
        <div className="pjd-tabs">
          <div
            className={
              currentTab === "Details" ? "pjd-tab currentTab" : "pjd-tab"
            }
            onClick={() => {
              setCurrentTab("Details");
            }}
          >
            Details
          </div>
          <div
            className={
              currentTab === "Images" ? "pjd-tab currentTab" : "pjd-tab"
            }
            onClick={() => {
              setCurrentTab("Images");
            }}
          >
            Images
          </div>
          <div
            className={
              currentTab === "Documents" ? "pjd-tab currentTab" : "pjd-tab"
            }
            onClick={() => {
              setCurrentTab("Documents");
            }}
          >
            Documents
          </div>
        </div>
        {currentTab === "Details" && (
          <div className="project-details-content">
            <div className="pjd-detail-group pdc-image-details">
              <div className="pdc-detail-section-one">
                <div className="pdc-image-container">
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt="Portfolio"
                      className="pdc-portfolio-image"
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}

                  {/* Camera Icon Button */}
                  <div className="pdc-camera-upload">
                    <div className="camera-icon" onClick={handleImageUpload}>
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                      <CiCamera size={20} color="black" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pdc-detail-section-two">
                <h3>Basic Information</h3>

                <div className="pdc-detail-sub-groups"></div>
                <div className="pdc-detail-item">
                  <span className="pdc-detail-label">Title:</span>
                  <span className="pdc-detail-value">{project.title}</span>
                </div>
                <div className="pdc-detail-item">
                  <span className="pdc-detail-label">Status:</span>
                  <span
                    className={`pdc-detail-value status pdc-${project.status}`}
                  >
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </span>
                </div>
                <div className="pdc-detail-item">
                  <span className="pdc-detail-label">Budget:</span>
                  <span className="pdc-detail-value">R{project.budget}</span>
                </div>
                <div className="pdc-detail-item">
                  <span className="pdc-detail-label">Category:</span>
                  <span className="pdc-detail-value">{project.category}</span>
                </div>
                <div className="pdc-detail-item">
                  <span className="pdc-detail-label">Deadline:</span>
                  <span className="pdc-detail-value">
                    {project.deadline} days
                  </span>
                </div>
              </div>
            </div>

            <div className="pjd-detail-group">
              <h3>Participants</h3>
              {project && (
                <div className="pdc-detail-item">
                  <span className="pdc-detail-label">Client:</span>
                  <span className="pdc-detail-value">
                    {project.clientEmail || "N/A"}
                  </span>
                </div>
              )}
              {project && (
                <div className="pdc-detail-item">
                  <span className="pdc-detail-label">Freelancer:</span>
                  <span className="pdc-detail-value">
                    {project.freelancerEmail || "N/A"}
                  </span>
                </div>
              )}
            </div>

            <div className="pjd-detail-group">
              <h3>Description</h3>
              <p className="project-description">{project.description}</p>
            </div>

            <div className="pjd-detail-group">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                {project.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            {/* <TermsModal
            show={showTermsModal}
            onHide={() => setShowTermsModal(false)}
            onAccept={setAcceptedTerms}
            accepted={acceptedTerms}
          /> */}
          </div>
        )}
        {currentTab === "Images" && renderImagesTab()}
        {currentTab === "Documents" && renderDocumentsTab()}
      </div>
    </div>
  );
};

export default ProjectDetails;
