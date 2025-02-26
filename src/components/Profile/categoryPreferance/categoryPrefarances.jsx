import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./categoryPrefarances.css"; // Ensure this path is correct

const CategoryPreferences = ({
  onSubmit,
  isUpdate,
  cancel,
  categoriesArr,
  extraAmountObj,
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
      threeDays:
        extraAmountObj &&
        extraAmountObj.threeDays &&
        extraAmountObj.threeDays !== ""
          ? extraAmountObj.threeDays
          : "",
      fiveDays:
        extraAmountObj &&
        extraAmountObj.fiveDays &&
        extraAmountObj.fiveDays !== ""
          ? extraAmountObj.fiveDays
          : "",
      sevenDays:
        extraAmountObj &&
        extraAmountObj.sevenDays &&
        extraAmountObj.sevenDays !== ""
          ? extraAmountObj.sevenDays
          : "",
      fourteenDays:
        extraAmountObj &&
        extraAmountObj.fourteenDays &&
        extraAmountObj.fourteenDays !== ""
          ? extraAmountObj.fourteenDays
          : "",
    },
    speedUp: {
      threeDays:
        extraAmountObj &&
        extraAmountObj.threeDays &&
        extraAmountObj.threeDays !== ""
          ? true
          : false,
      fiveDays:
        extraAmountObj &&
        extraAmountObj.fiveDays &&
        extraAmountObj.fiveDays !== ""
          ? true
          : false,
      sevenDays:
        extraAmountObj &&
        extraAmountObj.sevenDays &&
        extraAmountObj.sevenDays !== ""
          ? true
          : false,
      fourteenDays:
        extraAmountObj &&
        extraAmountObj.fourteenDays &&
        extraAmountObj.fourteenDays !== ""
          ? true
          : false,
    },
  });
  console.log(
    "testt",
    extraAmountObj.threeDays,
    extraAmountObj && extraAmountObj.threeDays !== ""
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
          <Col xs={12} md={4} className="mb-3">
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

          {/* Third Column */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="category-header">
              How much do extra amount speed up projects
            </h5>
            {[
              { name: "threeDays", label: "3 Days" },
              { name: "fiveDays", label: "5 Days" },
              { name: "sevenDays", label: "7 Days" },
              { name: "fourteenDays", label: "14 Days" },
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
                <Col xs={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    name={speed.name}
                    value={formData.prices[speed.name]}
                    onChange={handlePriceChange}
                    className="custom-input"
                    disabled={!formData.speedUp[speed.name] || !isUpdate} // Disable input if checkbox is not selected
                  />
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
