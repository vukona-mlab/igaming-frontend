

import { useState, useEffect } from "react";
import axios from "axios";
import "./PaymentPlan.css";
import { FaDollarSign } from "react-icons/fa";

const PaymentPlan = ({ projectId }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [deliveryDays, setDeliveryDays] = useState("3 Days");
  const [projectName, setProjectName] = useState("Loading...");

  // State for toggling applied features
  const [freeLogoDesign, setFreeLogoDesign] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [freeAd, setFreeAd] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("https://your-backend-url.com/api/plans");
        setPlans(response.data);
        setSelectedPlan(response.data[1]?.price || "R1500"); // Default selection
      } catch (error) {
        console.error("Error fetching plans:", error);
        setPlans([
          { name: "Ultimate", price: "R2000", details: "All Features + Exclusive Perks" },
          { name: "Premium", price: "R1500", details: "Free Logo Design + 15% Discount + Free Advertisement" },
          { name: "Standard", price: "R1000", details: "Includes Basic Features + Some Premium Perks" },
          { name: "Basic", price: "R500", details: "Essential Features Only" }
        ]);
        setSelectedPlan("R1500");
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (!projectId) return;

    const fetchProjectName = async () => {
      try {
        const response = await axios.get(`https://your-backend-url.com/api/projects/${projectId}`);
        setProjectName(response.data.name || "Unknown Project");
      } catch (error) {
        console.error("Error fetching project name:", error);
        setProjectName("Unknown Project");
      }
    };

    fetchProjectName();
  }, [projectId]);

  useEffect(() => {
    // Set default feature values based on the selected plan
    if (selectedPlan === "R2000") {
      setFreeLogoDesign(true);
      setDiscount(true);
      setFreeAd(true);
    } else if (selectedPlan === "R1500") {
      setFreeLogoDesign(true);
      setDiscount(true);
      setFreeAd(true);
    } else {
      setFreeLogoDesign(false);
      setDiscount(false);
      setFreeAd(false);
    }
  }, [selectedPlan]);

  const toggleFeature = (featureSetter) => {
    featureSetter((prev) => !prev);
  };

  const currentPlan = plans.find(plan => plan.price === selectedPlan) || plans[1];

  const handlePayment = async () => {
    try {
      const paymentData = {
        plan: currentPlan.name,
        price: currentPlan.price,
        deliveryDays,
      };
      const response = await axios.post("https://your-backend-url.com/api/payments", paymentData);
      alert(`Payment Successful! Transaction ID: ${response.data.transactionId}`);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-card">
      <h2 className="pricing-title">Pricing Plan</h2>

      <div className="plan-selector">
        {plans.map(plan => (
          <button
            key={plan.price}
            onClick={() => setSelectedPlan(plan.price)}
            className={`plan-button ${selectedPlan === plan.price ? "active" : ""}`}
          >
            {plan.price}
          </button>
        ))}
      </div>

      <p className="plan-text">{currentPlan?.name}</p>
      <p className="plan-details">{currentPlan?.details}</p>

      <div className="delivery-section">
        <label className="delivery-label">Delivery Days</label>
        <select className="delivery-dropdown" value={deliveryDays} onChange={e => setDeliveryDays(e.target.value)}>
          <option>3 Days</option>
          <option>5 Days</option>
          <option>7 Days</option>
          <option>14 Days</option>
        </select>
      </div>

      <div className="feature-list">
        <p>
          <strong>Free Logo Design</strong>
          <span 
            className="clickable-feature"
            onClick={() => toggleFeature(setFreeLogoDesign)}
            style={{ cursor: "pointer", color: freeLogoDesign ? "green" : "red" }}
          >
            {freeLogoDesign ? "Applied" : "Not Applied"}
          </span>
        </p>
        <p>
          <strong>15% Discount</strong>
          <span 
            className="clickable-feature"
            onClick={() => toggleFeature(setDiscount)}
            style={{ cursor: "pointer", color: discount ? "green" : "red" }}
          >
            {discount ? "Applied" : "Not Applied"}
          </span>
        </p>
        <p>
          <strong>Free Advertisement</strong>
          <span 
            className="clickable-feature"
            onClick={() => toggleFeature(setFreeAd)}
            style={{ cursor: "pointer", color: freeAd ? "green" : "red" }}
          >
            {freeAd ? "Applied" : "Not Applied"}
          </span>
        </p>
      </div>

      <div className="pricing-details">
        <p><strong>Project Name:</strong> <span>{projectName}</span></p>
        <p><strong>Final Price:</strong> <span className="final-price">{selectedPlan}</span> <FaDollarSign /></p>
      </div>

      <div className="buttons-container">
        <button className="cancel-button">Cancel</button>
        <button className="pay-button" onClick={handlePayment}>Pay {selectedPlan}</button>
      </div>
    </div>
  );
};

export default PaymentPlan;



/*
import { useState, useEffect } from "react";
import axios from "axios";
import "./PaymentPlan.css";
import { FaDollarSign } from "react-icons/fa";

const PaymentPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [deliveryDays, setDeliveryDays] = useState("3 Days");

  // State for toggling applied features
  const [freeLogoDesign, setFreeLogoDesign] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [freeAd, setFreeAd] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("https://your-backend-url.com/api/plans");
        setPlans(response.data);
        setSelectedPlan(response.data[1]?.price || "R1500"); // Default selection
      } catch (error) {
        console.error("Error fetching plans:", error);
        setPlans([
          { name: "Ultimate", price: "R2000", details: "All Features + Exclusive Perks" },
          { name: "Premium", price: "R1500", details: "Free Logo Design + 15% Discount + Free Advertisement" },
          { name: "Standard", price: "R1000", details: "Includes Basic Features + Some Premium Perks" },
          { name: "Basic", price: "R500", details: "Essential Features Only" }
        ]);
        setSelectedPlan("R1500");
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    // Set default feature values based on the selected plan
    if (selectedPlan === "R2000") {
      setFreeLogoDesign(true);
      setDiscount(true);
      setFreeAd(true);
    } else if (selectedPlan === "R1500") {
      setFreeLogoDesign(true);
      setDiscount(true);
      setFreeAd(true);
    } else if (selectedPlan === "R1000") {
      setFreeLogoDesign(false);
      setDiscount(false);
      setFreeAd(false);
    } else {
      setFreeLogoDesign(false);
      setDiscount(false);
      setFreeAd(false);
    }
  }, [selectedPlan]);

  const toggleFeature = (featureSetter) => {
    featureSetter((prev) => !prev);
  };

  const currentPlan = plans.find(plan => plan.price === selectedPlan) || plans[1];

  const handlePayment = async () => {
    try {
      const paymentData = {
        plan: currentPlan.name,
        price: currentPlan.price,
        deliveryDays,
      };
      const response = await axios.post("https://your-backend-url.com/api/payments", paymentData);
      alert(`Payment Successful! Transaction ID: ${response.data.transactionId}`);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-card">
      <h2 className="pricing-title">Pricing Plan</h2>

      <div className="plan-selector">
        {plans.map(plan => (
          <button
            key={plan.price}
            onClick={() => setSelectedPlan(plan.price)}
            className={`plan-button ${selectedPlan === plan.price ? "active" : ""}`}
          >
            {plan.price}
          </button>
        ))}
      </div>

      <p className="plan-text">{currentPlan?.name}</p>
      <p className="plan-details">{currentPlan?.details}</p>

      <div className="delivery-section">
        <label className="delivery-label">Delivery Days</label>
        <select className="delivery-dropdown" value={deliveryDays} onChange={e => setDeliveryDays(e.target.value)}>
          <option>3 Days</option>
          <option>5 Days</option>
          <option>7 Days</option>
          <option>14 Days</option>
        </select>
      </div>

      <div className="feature-list">
        <p>
          <strong>Free Logo Design</strong>
          <span 
            className="clickable-feature"
            onClick={() => toggleFeature(setFreeLogoDesign)}
            style={{ cursor: "pointer", color: freeLogoDesign ? "green" : "red" }}
          >
            {freeLogoDesign ? "Applied" : "Not Applied"}
          </span>
        </p>
        <p>
          <strong>15% Discount</strong>
          <span 
            className="clickable-feature"
            onClick={() => toggleFeature(setDiscount)}
            style={{ cursor: "pointer", color: discount ? "green" : "red" }}
          >
            {discount ? "Applied" : "Not Applied"}
          </span>
        </p>
        <p>
          <strong>Free Advertisement</strong>
          <span 
            className="clickable-feature"
            onClick={() => toggleFeature(setFreeAd)}
            style={{ cursor: "pointer", color: freeAd ? "green" : "red" }}
          >
            {freeAd ? "Applied" : "Not Applied"}
          </span>
        </p>
      </div>

      <div className="pricing-details">
        <p><strong>Project Name:</strong> <span>Aviator</span></p>
        <p><strong>Final Price:</strong> <span className="final-price">{selectedPlan}</span> <FaDollarSign /></p>
      </div>

      <div className="buttons-container">
        <button className="cancel-button">Cancel</button>
        <button className="pay-button" onClick={handlePayment}>Pay {selectedPlan}</button>
      </div>
    </div>
  );
};

export default PaymentPlan;
*/