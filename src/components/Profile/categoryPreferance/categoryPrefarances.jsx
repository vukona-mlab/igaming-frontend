import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./categoryPrefarances.css"; // Ensure this path is correct
import editIcon from "../../../assets/edit.svg";

const CategoryPreferences = ({
  onSubmit,
  isUpdate,
  cancel,
  categoriesArr,
  packagesObj,
}) => {
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
    prices: {
      basic:
        packagesObj && packagesObj.basic && packagesObj.basic !== ""
          ? packagesObj.basic
          : "",
      standard:
        packagesObj && packagesObj.standard && packagesObj.standard !== ""
          ? packagesObj.standard
          : "",
      premium:
        packagesObj && packagesObj.premium && packagesObj.premium !== ""
          ? packagesObj.premium
          : "",
      ultimate:
        packagesObj && packagesObj.ultimate && packagesObj.ultimate !== ""
          ? packagesObj.ultimate
          : "",
    },
    speedUp: {
      basic:
        packagesObj && packagesObj.basic && packagesObj.basic !== ""
          ? true
          : false,
      standard:
        packagesObj && packagesObj.standard && packagesObj.standard !== ""
          ? true
          : false,
      premium:
        packagesObj && packagesObj.premium && packagesObj.premium !== ""
          ? true
          : false,
      ultimate:
        packagesObj && packagesObj.ultimate && packagesObj.ultimate !== ""
          ? true
          : false,
    },
  });
  console.log(
    "testt",
    packagesObj.basic,
    packagesObj && packagesObj.basic !== ""
  );
  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [name]: checked,
      },
      speedUp: {
        ...prev.speedUp,
        [name]: checked,
      },
    }));
  };

  // Handle input change
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [name]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass formData to parent component
  };
  console.log(
    categoriesArr,
    categoriesArr && categoriesArr.indexOf("graphicDesign") !== -1
  );
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          {/* First Column */}
          <Col xs={12} md={3} className="mb-3">
            <h5 className="category-header">Categories Preferences</h5>
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

          {/* Middle Column */}
          <Col xs={12} md={3} className="mb-3 mt-5">
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

          {/* Third Column */}
          <Col xs={12} md={5} className="mb-3">
            <h5 className="category-header">Price Plan</h5>

            {[
              { name: "basic", label: "Basic:" },
              { name: "standard", label: "Standard:" },
              { name: "premium", label: "Premium:" },
              { name: "ultimate", label: "Ultimate:" },
            ].map((speed) => (
              <Row className="mb-3" key={speed.name}>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label={speed.label}
                    name={speed.name}
                    className="custom-checkbox"
                    onChange={handleCheckboxChange}
                    disabled={!isUpdate}
                    checked={formData.speedUp[speed.name]}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    name={speed.name}
                    value={
                      formData.prices[speed.name] !== "" && !isUpdate
                        ? `R${formData.prices[speed.name]}`
                        : `${formData.prices[speed.name]}`
                    }
                    onChange={handlePriceChange}
                    className={
                      !isUpdate ? "custom-input-noline" : "custom-input"
                    }
                    disabled={!formData.speedUp[speed.name] || !isUpdate} // Disable input if checkbox is not selected
                  />
                </Col>
                <Col xs={4}>
                  {!isUpdate && (
                    <img src={editIcon} className="cat-edit-icon" />
                  )}
                </Col>
              </Row>
            ))}
          </Col>
        </Row>

        {/* Buttons */}
        {/* <Row className="justify-content-end mt-4">
          <Col xs={12} className="text-right">
            <Button className="cancel-button me-4">Cancel</Button>
            <Button variant="dark" className="update-button" type="submit">
              Update
            </Button>
          </Col>
        </Row> */}
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
      </Form>
    </Container>
  );
};

export default CategoryPreferences;
