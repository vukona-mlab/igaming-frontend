import React, { useState } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import "./categoryPrefarances.css"; // Ensure this path is correct

<<<<<<< HEAD
const CategoryPreferences = ({ onSubmit, isUpdate }) => {
=======
const CategoryPreferences = ({ onSubmit, isUpdate, cancel, categoriesArr }) => {
>>>>>>> latest-dev
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
<<<<<<< HEAD

=======
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass formData to parent component
  };
>>>>>>> latest-dev
  return (
    <Container>
      <Form>
        <Row className="mb-4">
          {/* First Column */}
<<<<<<< HEAD
          <Col xs={12} md={6} className="mb-3">
=======
          <Col xs={12} md={4} className="mb-3">
>>>>>>> latest-dev
            <h5 className="category-header">Category Preferences</h5>
            {["graphicDesign", "uiUxDesign", "animation", "imageEditing"].map(
              (category) => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  label={category.replace(/([A-Z])/g, " $1")}
                  name={category}
                  className="custom-checkbox"
                  checked={formData.categories[category]}
                  onChange={handleCheckboxChange}
                  disabled={!isUpdate}
                />
              )
            )}
          </Col>

          {/* Second Column */}
          <Col xs={12} md={4} className="mb-3 mt-5">
            {[
              "gameArt",
              "characterModeling",
              "gameDesigners",
              "typography",
            ].map((category) => (
              <Form.Check
                key={category}
                type="checkbox"
                label={category.replace(/([A-Z])/g, " $1")}
                name={category}
                className="custom-checkbox"
                checked={formData.categories[category]}
                onChange={handleCheckboxChange}
                disabled={!isUpdate}
              />
            ))}
          </Col>
        </Row>
<<<<<<< HEAD
=======
        <Row className="justify-content-end mt-4">
          <Col xs={12} className="text-right">
            {isUpdate && (
              <Button className="cancel-button me-4" onClick={cancel}>
                Cancel
              </Button>
            )}
            {isUpdate && (
              <Button variant="dark" className="update-button" type="submit">
                Update
              </Button>
            )}
          </Col>
        </Row>
>>>>>>> latest-dev
      </Form>
    </Container>
  );
};

export default CategoryPreferences;
