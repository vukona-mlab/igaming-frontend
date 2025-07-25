import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./categoryPrefarances.css"; // Ensure this path is correct
import PriceCard from "../PriceCard/PriceCard";
const CategoryPreferences = ({
  onSubmit,
  isUpdate,
  cancel,
  categoriesArr,
  packagesObj,
  handleAddFeature,
  handleUpdateFeature,
  handleDeleteFeature,
  features,
  pricePackages,
  showPriceModal,
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
  const [showFeature, setShowFeature] = useState(false);
  const [currFeature, setCurrFeature] = useState("");

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
    }));
  };
  const handleSpeedUpChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
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
  return (
    <Container>
      {showFeature && (
        <div className="feature-details-modal-overlay">
          <PriceCard
            type={currFeature}
            price={formData.prices[currFeature]}
            features={features}
            onClose={() => setShowFeature(false)}
            handleAddFeature={handleAddFeature}
            handleUpdateFeature={handleUpdateFeature}
            handleDeleteFeature={handleDeleteFeature}
          />
        </div>
      )}
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

            {pricePackages.length > 0 &&
              pricePackages.map((pricePackage) => (
                <Row className="mb-3" key={pricePackage.name}>
                  <Col xs={4}>
                    <Form.Check
                      type="checkbox"
                      label={pricePackage.name}
                      name={pricePackage.name.toLowerCase()}
                      className="custom-checkbox"
                      onChange={handleSpeedUpChange}
                      disabled={!isUpdate}
                      checked={
                        formData.speedUp[pricePackage.name.toLowerCase()]
                      }
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Text
                      type="text"
                      placeholder="Enter price"
                      name={pricePackage.name}
                      value={pricePackage.price}
                      onChange={handlePriceChange}
                      className={
                        !isUpdate ? "custom-input-noline" : "custom-input"
                      }
                      disabled={
                        !formData.speedUp[pricePackage.name.toLowerCase()] ||
                        !isUpdate
                      } // Disable input if checkbox is not selected
                    />
                  </Col>
                  <Col xs={4}>
                    {isUpdate &&
                      formData.speedUp[pricePackage.name.toLowerCase()] && (
                        <img
                          src="/images/eyecon.png"
                          className="cat-edit-icon"
                          onClick={() => {
                            showPriceModal(
                              pricePackage.name,
                              pricePackage.price,
                              pricePackage.benefits
                            );
                          }}
                        />
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
      <input
        type="button"
        value={"change"}
        onClick={() => showPriceModal("Basic", 500, [])}
      />
    </Container>
  );
};

export default CategoryPreferences;
