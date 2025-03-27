import React, { useState, useEffect } from "react";
import "./PriceCard.css";

const PriceCard = ({
  type,
  price,
  features,
  bgColor,
  handleAddFeature,
  handleUpdateFeature,
  onClose,
}) => {
  const [text, setText] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [arr, setArr] = useState([]);

  const [filteredArr] = features.filter((obj) => obj.type === type);
  let updatedArr = filteredArr.features.map((text, i) => {
    return { id: i, text, edit: false };
  });
  useEffect(() => {
    setArr(updatedArr);
  }, []);
  const handleEdit = (id) => {
    let arr = [...updatedArr];
    let elem = arr.find((a) => a.id === id);
    elem.edit = true;

    setArr(arr);
  };
  const handleEditChange = (e, id) => {
    setArr(
      arr.map((obj) => {
        if (obj.id === id) {
          return { ...obj, text: e.target.value };
        }
        return obj;
      })
    );
  };
  const update = (id, index, text) => {
    handleUpdateFeature({
      type: type,
      index,
      feature: text,
    });
    let arr = [...updatedArr];
    let elem = arr.find((a) => a.id === id);
    elem.text = text;
    elem.edit = false;

    setArr(arr);
  };
  const add = (text) => {
    handleAddFeature({ type: type, feature: text });
    let arr = [...updatedArr];
    if (text !== "") {
      arr.push({ id: arr.length, text, edit: false });
      setArr(arr);
    }
  };
  return (
    <div className="pc-pricing-card">
      <button className="pc-close-button" onClick={onClose}>
        ×
      </button>
      <div className="plan-type" style={{ background: bgColor }}>
        {type}
      </div>
      <div className="price">{price}</div>
      <div className="pc-features">
        {arr &&
          arr.length > 0 &&
          arr.map((feature, index) => (
            <div key={index} className="pc-feature-item">
              {feature.edit ? (
                <input
                  value={feature.text}
                  onChange={(e) => handleEditChange(e, feature.id)}
                />
              ) : (
                <div className="pc-check-text">
                  <span className="checkmark">
                    <img src="/images/checkmark-circle-02.png" />
                  </span>
                  <span>{feature.text}</span>
                </div>
              )}

              <span
                onClick={() =>
                  feature.edit
                    ? update(feature.id, index, feature.text)
                    : handleEdit(feature.id)
                }
              >
                {feature.edit ? (
                  <div>✓</div>
                ) : (
                  <img
                    src="/images/basil_edit-outline.png"
                    className="pc-edit-img"
                  />
                )}
              </span>
            </div>
          ))}
      </div>
      <div className="price-feature-input">
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="pc-text-area"
        ></textarea>
      </div>
      <button className="pc-add-button" onClick={() => add(text)}>
        Add Benefit
      </button>
    </div>
  );
};

export default PriceCard;
