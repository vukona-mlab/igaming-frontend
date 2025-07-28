import React, { useEffect, useState } from "react";
import "./ProjectUpload.css";
import BACKEND_URL from "../../../config/backend-config";
import { CiCamera } from "react-icons/ci"; // Import the camera icon

export default function ProjectUpload({
  onClose,
  projectData,
  showProjectUploadAlert,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    clientId: "",
    requirements: "",
    category: "Game Development",
    link: "",
    inPlatform: false,
  });
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");

  const categories = [
    "Game Development",
    "Creative & Design",
    "Audio & Music",
    "Content & Marketing",
    "Quality Assurance",
    "Compliance & Legal",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const uid = localStorage.getItem("uid");

      // return
      const response = await fetch(`${BACKEND_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...formData,
          freelancerId: uid,
          budget: formData.budget.toString(), // Use the total budget including plan amount
          requirements: formData.requirements
            .split(",")
            .map((req) => req.trim()),
          deadline: parseInt(formData.deadline),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const imageData = new FormData();
        images.forEach((file) => {
          imageData.append("picture", file);
        });

        const res = await fetch(
          `${BACKEND_URL}/api/projects/${data.project.id}/picture`,
          {
            method: "PUT",
            headers: {
              Authorization: token,
            },
            body: imageData,
          }
        );
        const d = await res.json();
        console.log({ d });

        if (!res.ok) {
          throw new Error("Failed to upload files");
        }
        showProjectUploadAlert();
        onClose();
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  const handleImageUpload = () => {
    document.getElementById("fileInput").click();
  };
  const handleImageChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setCurrentImage(e.target.result);
        reader.readAsDataURL(file);
      }
      // setCurrentImage(file);
      const currImage = Array.from(event.target.files);
      setImages(currImage);
      const result = await response.json();
    } catch (error) {}
  };
  return (
    <div className="pu-project-modal-overlay">
      <div className="pu-project-modal">
        <div className="project-modal-header">
          <h2>Project Upload</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="pu-project-modal-content">
          <form onSubmit={handleSubmit} className="pu-project-form-container">
            <div className="pu-pdc-detail-section-one">
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
            <div className="pu-pdc-detail-section-two">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 777 Spinning Game Development"
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe your project in detail. Include key features, objectives, and any specific requirements."
                />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Deadline (days):</label>
                <input
                  type="number"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Number of days to complete the project"
                />
              </div>
              <div className="form-group">
                <label>Requirements (comma-separated):</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="e.g., Responsive design, SEO optimization, Mobile-friendly, Cross-browser compatibility"
                  required
                />
              </div>

              <div className="form-group">
                <label>Link:</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Link to live project"
                />
              </div>

              <div className="button-group">
                <button type="button" className="decline-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="accept-btn">
                  Create Project
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
