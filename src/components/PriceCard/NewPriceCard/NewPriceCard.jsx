import React, { useRef, useState } from 'react'
import Checkmark from "../../../assets/checkmark-circle.png"
import EditIcon from "../../../assets/basil_edit-outline.png"
import CloseIcon from "../../../assets/fa_close.png"
import styles from "./NewPriceCard.module.css"
export default function NewPriceCard({ type, benefits, price, handleFormSubmit, showModal, setShowModal, setNewBenefitList }) {
    console.log({ type, benefits, price });
    const [newPrice, setNewPrice] = useState(price)
    const benefitRef = useRef()
    // const priceRef = useRef()
    const addbenefit = () => {
        // console.log(benefitRef.current.value);  
        setNewBenefitList(benefit => [...benefit, benefitRef.current.value])
    }
    const handleSave = () => {
        // return
        handleFormSubmit(benefits, newPrice, type)
        handleClose()
    }
    const handleClose = () => {
        setNewPrice(0)
        setShowModal(false)
    }
    if (!showModal) return null
    return (
        <div className={styles.overlay}>
            <div className={styles.priceForm}>
                <img src={CloseIcon} alt='Icon to close the popup modal' className={styles.closeIcon} onClick={() => { handleClose() }} />
                <span className={`${styles.packageType} ${type === 'Basic' ? styles.basicPackage : type === 'Standard' ? styles.standardPackage : type === 'Premium' ? styles.premiumPackage : styles.ultimatePackage}`}>{type}</span>
                <div className={styles.priceCont}>
                    <span className={styles.priceSpan}>R</span>
                    <input defaultValue={price} type='text' placeholder={'Price'} className={styles.textInput} onChange={ev => setNewPrice(ev.target.value)} />
                </div>
                <hr />
                <div className={styles.benefitListCont}>
                    {
                        benefits && benefits.length > 0 && benefits.map(benefit => (
                            <div className={styles.benefitCont} key={benefit}>
                                <div className={styles.leftContent}>
                                    <img src={Checkmark} alt='checkmark-circle' className={styles.icon}></img>
                                    <span>{benefit}</span>
                                </div>
                                <img src={EditIcon} alt='edit-icon' className={styles.icon}></img>
                            </div>
                        ))
                    }


                </div>
                <textarea ref={benefitRef} className={styles.textarea} placeholder='Please insert benefit' />
                <input className={styles.button} type='button' value={"Save Benefit"} onClick={addbenefit} />
                {/* <br/> */}
                <hr />
                <input className={`${styles.button} ${styles.saveButton}`} type='button' value={"Save Edits"} onClick={handleSave} />
            </div>
        </div>
    )
}
