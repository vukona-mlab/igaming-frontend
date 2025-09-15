import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { CiCamera } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi"; // Add this import for the edit icon
import "./PortfolioCard.css";
import BACKEND_URL from "../../../config/backend-config";

const PortfolioCard = ({ jobTitle, image, handleImageChange, isUpdate }) => {
  const [currentImage, setCurrentImage] = useState(image);
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [loading, setLoading] = useState(false); // for save/delete
  const [hasBio, setHasBio] = useState(false);
  const [bioLoading, setBioLoading] = useState(true); // for initial fetch

  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  useEffect(() => {
    // Fetch own bio using the correct endpoint: GET /api/user/bio
    const fetchBio = async () => {
      setBioLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, user not authenticated");
          setBioLoading(false);
          return;
        }
        const response = await fetch(`${BACKEND_URL}/api/user/bio`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Authorization": token || undefined,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBio(data.bio || "");
          setHasBio(data.hasBio);
        } else {
          // Handle both JSON and text responses
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            console.error("Error fetching bio:", errorData.error || 'Request failed');
          } else {
            const errorText = await response.text();
            console.error("Error fetching bio:", errorText || 'Request failed');
            if (response.status === 401) {
              console.error("Authentication failed - invalid or expired token");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching bio:", error);
      } finally {
        setBioLoading(false);
      }
    };
    fetchBio();
  }, []);

  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  };

  const handleEditBio = () => {
    setBioInput(bio);
    setEditMode(true);
  };

  const handleSaveBio = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Please log in to save your bio");
        return;
      }
      
      // Determine if we need to create or update based on hasBio
      const method = hasBio ? "PUT" : "POST";
      
      const response = await fetch(`${BACKEND_URL}/api/user/bio`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || undefined,
        },
        credentials: "include",
        body: JSON.stringify({ bio: bioInput.trim() }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setBio(data.bio);
        setHasBio(true);
        setEditMode(false);
      } else {
        // Handle both JSON and text responses
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Request failed';
        let errorData = null;
        
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          errorMessage = await response.text() || errorMessage;
        }
        
        if (response.status === 401) {
          alert("Authentication failed. Please log in again.");
          return;
        }
        
        // Handle specific backend error cases
        if (errorData && response.status === 400 && errorMessage.includes("Bio already exists")) {
          // Backend says bio exists, so try PUT instead
          const updateResponse = await fetch(`${BACKEND_URL}/api/user/bio`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token || undefined,
            },
            credentials: "include",
            body: JSON.stringify({ bio: bioInput.trim() }),
          });
          
          if (updateResponse.ok) {
            const updateData = await updateResponse.json();
            setBio(updateData.bio);
            setHasBio(true);
            setEditMode(false);
          } else {
            const updateContentType = updateResponse.headers.get('content-type');
            const updateError = updateContentType && updateContentType.includes('application/json')
              ? (await updateResponse.json()).error || "Update failed"
              : await updateResponse.text() || "Update failed";
            alert(updateError);
          }
        } else if (errorData && response.status === 404 && errorMessage.includes("Bio not found")) {
          // Backend says bio doesn't exist, so try POST instead
          const createResponse = await fetch(`${BACKEND_URL}/api/user/bio`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token || undefined,
            },
            credentials: "include",
            body: JSON.stringify({ bio: bioInput.trim() }),
          });
          
          if (createResponse.ok) {
            const createData = await createResponse.json();
            setBio(createData.bio);
            setHasBio(true);
            setEditMode(false);
          } else {
            const createContentType = createResponse.headers.get('content-type');
            const createError = createContentType && createContentType.includes('application/json')
              ? (await createResponse.json()).error || "Create failed"
              : await createResponse.text() || "Create failed";
            alert(createError);
          }
        } else {
          alert(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error saving bio:", error);
      alert("Error saving bio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setBioInput("");
    setEditMode(false);
  };

  return (
    <>
    <Card.Body>
        {bioLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 40 }}>
            <img src="/images/load.gif" alt="Loading" style={{ width: 25, height: 25 }} />
          </div>
        ) : (
          <>
            {/* Bio section with edit functionality */}
            <div className="bio-section">
              {editMode ? (
                <Form.Control
                  as="textarea"
                  value={bioInput}
                  onChange={e => setBioInput(e.target.value)}
                  maxLength={500}
                  placeholder="Enter your bio (max 500 characters)"
                  rows={4}
                  autoFocus
                />
              ) : (
                <div className="d-flex justify-content-between align-items-start">
                  <Card.Text 
                    className={`card-text flex-grow-1 ${!bio ? 'text-muted' : ''}`}
                    style={{ cursor: 'pointer', margin: 0 }} 
                    onClick={handleEditBio}
                  >
                    {bio || "Add Bio...."}
                  </Card.Text>
                  <Button
                    variant="link"
                    className="p-1 ms-2"
                    onClick={handleEditBio}
                    style={{ 
                      lineHeight: 1,
                      color: '#6c757d',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                    title={bio ? "Edit bio" : "Add bio"}
                  >
                    <FiEdit2 size={16} />
                  </Button>
                </div>
              )}

              {editMode && (
                <div className="bio-actions mt-2">
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={handleSaveBio}
                    disabled={loading}
                    className="me-2"
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleCancelEdit}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <small className="text-muted ms-2">
                    {bioInput.length}/500 characters
                  </small>
                </div>
              )}
            </div>
            {/* <input className="text-input mt-2" type="text" value={jobTitle} readOnly /> */}
          </>
        )}
      </Card.Body>
    <Card className="portfolio-card">
      {/* Image Container */}
      <div className="image-container">
        {currentImage ? (
          <img src={currentImage} alt="Portfolio" className="portfolio-image" />
        ) : (
          <div className="no-image">No Image</div>
        )}
        <div className="camera-icon" onClick={handleFileUpload}>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <CiCamera size={25} color="black" />
        </div>
      </div>
      
    </Card>
          </>
  );
};

export default PortfolioCard;