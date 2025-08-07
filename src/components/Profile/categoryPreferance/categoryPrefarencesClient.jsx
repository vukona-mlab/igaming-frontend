import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./categoryPrefarances.css"; // Ensure this path is correct

const CategoryPreferences = ({ onSubmit, isUpdate, cancel, categoriesArr }) => {
  const [formData, setFormData] = useState({
    categories: {
      graphicDesign:
        categoriesArr && categoriesArr.indexOf("graphicDesign") !== -1
          ? true
          : false,
      uiUxDesign:
        categoriesArr && categoriesArr.indexOf("uiUxDesign") !== -1
          ? true
          : false,
      animation:
        categoriesArr && categoriesArr.indexOf("animation") !== -1
          ? true
          : false,
      imageEditing:
        categoriesArr && categoriesArr.indexOf("imageEditing") !== -1
          ? true
          : false,
      gameArt:
        categoriesArr && categoriesArr.indexOf("gameArt") !== -1 ? true : false,
      characterModeling:
        categoriesArr && categoriesArr.indexOf("characterModeling") !== -1
          ? true
          : false,
      gameDesigners:
        categoriesArr && categoriesArr.indexOf("gameDesigners") !== -1
          ? true
          : false,
      typography:
        categoriesArr && categoriesArr.indexOf("typography") !== -1
          ? true
          : false,
    },
  });

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [name]: checked,
      },
    }));
  };
  // Handle form submission
  const handleSubmit = () => {
    //  e.preventDefault();

    onSubmit(formData); // Pass formData to parent component
  };
return (
 <Container>
   <Form>
     <Row className="mb-4 align-items-start">
       {/* First Column */}
       <Col xs={12} md={3} className="mb-3">
         <h5 className="category-header mb-3">Category Preferences</h5>
         <div className="checkbox-group">
           {["graphicDesign", "uiUxDesign", "animation", "imageEditing"].map(
             (category) => (
               <div key={category} className="checkbox-item">
                 <Form.Check
                   type="checkbox"
                   label={category.replace(/([A-Z])/g, " $1")}
                   name={category}
                   className="custom-checkbox"
                   checked={formData.categories[category]}
                   onChange={handleCheckboxChange}
                   disabled={!isUpdate}
                 />
               </div>
             )
           )}
         </div>
       </Col>

       {/* Second Column */}
       <Col xs={12} md={3} className="mb-3">
         <h5 className="category-header mb-3 invisible">Hidden Header</h5>
         <div className="checkbox-group">
           {[
             "gameArt",
             "characterModeling",
             "gameDesigners",
             "typography",
           ].map((category) => (
             <div key={category} className="checkbox-item">
               <Form.Check
                 type="checkbox"
                 label={category.replace(/([A-Z])/g, " $1")}
                 name={category}
                 className="custom-checkbox"
                 checked={formData.categories[category]}
                 onChange={handleCheckboxChange}
                 disabled={!isUpdate}
               />
             </div>
           ))}
         </div>
       </Col>

       {/* Empty Third Column for consistency */}
       <Col xs={12} md={6} className="mb-3">
         {/* This column can be used for future content or left empty */}
       </Col>
     </Row>
   </Form>
   
   {isUpdate && (
     <div className="profile-buttons-container">
       <Button
         variant="secondary"
         onClick={cancel}
         className="cancel-button"
       >
         Cancel
       </Button>
       <Button
         variant="dark"
         onClick={() => handleSubmit()}
         className="update-button"
       >
         Update
       </Button>
     </div>
   )}
 </Container>
);
};

export default CategoryPreferences;
