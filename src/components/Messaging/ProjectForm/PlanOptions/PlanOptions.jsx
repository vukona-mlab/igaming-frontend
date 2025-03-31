import React from 'react';
import './PlanOptions.css';
import checkIcon from '../../../../assets/check.svg'

const PlanOptions = ({ selectedPlan, onPlanChange, planPrices }) => {
    const hasPackages = planPrices && 
        typeof planPrices === 'object' && 
        'basic' in planPrices && 
        'standard' in planPrices && 
        'premium' in planPrices && 
        'ultimate' in planPrices;

    const plans = hasPackages ? [
        { id: 'basic', name: 'Basic plan', price: planPrices.basic },
        { id: 'standard', name: 'Standard plan', price: planPrices.standard },
        { id: 'premium', name: 'Premium plan', price: planPrices.premium },
        { id: 'ultimate', name: 'Ultimate plan', price: planPrices.ultimate }
    ] : [];

    const benefits = [
        '20 days faster',
        'Free Logo',
        'Free design'
    ];

    return (
        <div className="pricing-section">
            <h2>Pricing & Packages</h2>
            
            {hasPackages ? (
                <>
                    <div className="package-options">
                        {plans.map((plan) => (
                            <div 
                                key={plan.id} 
                                className={`package-card ${selectedPlan === plan.id ? 'selected' : ''}`}
                            >
                                <div className="radio-group">
                                    <input 
                                        type="radio" 
                                        id={plan.id} 
                                        name="plan"
                                        checked={selectedPlan === plan.id}
                                        onChange={() => onPlanChange(plan.id)}
                                    />
                                    
                                    <div className="label-price-group">
                                        <label htmlFor={plan.id}>{plan.name}</label>
                                        <span className="price">R{plan.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="benefits-section">
                        <h3>Benefits</h3>
                        <ul>
                            {benefits.map((benefit, index) => (
                                <li key={index}>
                                    <img src={checkIcon} alt="check" /> {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <div className="no-packages">
                    <p>No packages available</p>
                    <p className="sub-text">Please contact the freelancer for pricing details</p>
                </div>
            )}
        </div>
    );
};

export default PlanOptions;
