import React from 'react';
import './PlanOptions.css';
import checkIcon from '../../../../assets/check.svg'

const PlanOptions = ({ selectedPlan, onPlanChange }) => {
    const plans = [
        { id: 'basic', name: 'Basic plan', price: 'R499' },
        { id: 'standard', name: 'Standard plan', price: 'R999' },
        { id: 'premium', name: 'Premium plan', price: 'R1, 499' },
        { id: 'ultimate', name: 'Ultimate plan', price: 'R1, 999' }
    ];

    const benefits = [
        '20 days faster',
        'Free Logo',
        'Free design'
    ];

    return (
        <div className="pricing-section">
            <h2>Pricing & Packages</h2>
            
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
                                <span className="price">{plan.price}</span>
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
        </div>
    );
};

export default PlanOptions;
