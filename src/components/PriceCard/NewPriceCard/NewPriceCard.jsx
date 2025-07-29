import React, { useEffect, useRef, useState } from "react";
import Checkmark from "../../../assets/checkmark-circle.png";
import EditIcon from "../../../assets/basil_edit-outline.png";
import CloseIcon from "../../../assets/fa_close.png";
import styles from "./NewPriceCard.module.css";
import { RxCross2 } from "react-icons/rx";
export default function NewPriceCard({
  type,
  benefits,
  price,
  handleFormSubmit,
  showModal,
  setShowModal,
  setNewBenefitList,
}) {
  const [newPrice, setNewPrice] = useState(price);
  const [arr, setArr] = useState([]);
  const [text, setText] = useState("");
  let updatedArr = benefits.map((text, i) => {
    return { id: i, text, edit: false };
  });
  useEffect(() => {
    setNewPrice(price);
  }, [price]);

  useEffect(() => {
    setArr(updatedArr);
  }, [benefits]);

  const handleEdit = (id) => {
    let arr = [...updatedArr];
    let elem = arr.find((a) => a.id === id);
    elem.edit = true;

    setArr(arr);
  };

  const handleEditChange = (e, id) => {
    const newText = e.target.value;
    const updatedArr = arr.map((obj) =>
      obj.id === id ? { ...obj, text: newText } : obj
    );
    setArr(updatedArr);
  };

  const benefitRef = useRef();
  // const priceRef = useRef()
  const addbenefit = () => {
    // console.log(benefitRef.current.value);
    if (benefitRef.current.value !== "") {
      setNewBenefitList((benefit) => [...benefit, benefitRef.current.value]);
    }
  };
  //            benefits: arr.length > 0 ? arr.filter((b) => b !== benefit) : [],
  const deleteBenefit = (benefit) => {
    // console.log(benefitRef.current.value);
    const newBenefits = benefits.filter((b) => b !== benefit);
    setNewBenefitList(newBenefits);
  };
  const updateBenefit = (id, index, text) => {
    let newBenefits = [...benefits];

    if (newBenefits.length > 0) {
      newBenefits[index] = text;
    }
    setNewBenefitList(newBenefits);

    let elem = arr.find((a) => a.id === id);
    elem.text = text;
    elem.edit = false;

    setArr(arr);
  };
  const handleSave = () => {
    // return

    handleFormSubmit(benefits, newPrice, type);
    handleClose();
  };
  const handleClose = () => {
    setNewPrice(0);
    setShowModal(false);
  };
  if (!showModal) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.priceForm}>
        <img
          src={CloseIcon}
          alt="Icon to close the popup modal"
          className={styles.closeIcon}
          onClick={() => {
            handleClose();
          }}
        />
        <span
          className={`${styles.packageType} ${
            type === "Basic"
              ? styles.basicPackage
              : type === "Standard"
              ? styles.standardPackage
              : type === "Premium"
              ? styles.premiumPackage
              : styles.ultimatePackage
          }`}
        >
          {type}
        </span>
        <div className={styles.priceCont}>
          <span className={styles.priceSpan}>R</span>
          <input
            defaultValue={price}
            type="text"
            placeholder={"Price"}
            className={styles.textInput}
            onChange={(ev) => setNewPrice(ev.target.value)}
          />
        </div>
        <hr />
        <div className={styles.benefitListCont}>
          {arr &&
            arr.length > 0 &&
            arr.map((benefit, index) => (
              <div className={styles.benefitCont} key={index}>
                <div className={styles.leftContent}>
                  <img
                    src={Checkmark}
                    alt="checkmark-circle"
                    className={styles.icon}
                  ></img>
                  {benefit.edit ? (
                    <input
                      type="text"
                      value={benefit.text}
                      onChange={(e) => handleEditChange(e, benefit.id)}
                    />
                  ) : (
                    <div className="pc-check-text">
                      <span>{benefit.text}</span>
                    </div>
                  )}
                </div>
                <div className={styles.btns}>
                  <button
                    className={styles.del}
                    onClick={() => deleteBenefit(benefit.text)}
                  >
                    <RxCross2 color="gray" size={20} />
                  </button>
                  <span
                    onClick={() =>
                      benefit.edit
                        ? updateBenefit(benefit.id, index, benefit.text)
                        : handleEdit(benefit.id)
                    }
                  >
                    {benefit.edit ? (
                      <div>✓</div>
                    ) : (
                      <img
                        src={EditIcon}
                        alt="edit-icon"
                        className={styles.icon}
                      ></img>
                    )}
                  </span>
                </div>
              </div>
            ))}
        </div>
        <textarea
          ref={benefitRef}
          className={styles.textarea}
          placeholder="Please insert benefit"
        />
        <input
          className={styles.button}
          type="button"
          value={"Save Benefit"}
          onClick={addbenefit}
        />
        {/* <br/> */}
        <hr />
        <input
          className={`${styles.button} ${styles.saveButton}`}
          type="button"
          value={"Save Edits"}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}
