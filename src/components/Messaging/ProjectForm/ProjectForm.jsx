import React, { useState, useEffect } from 'react';
import './ProjectForm.css';
import DocumentIcon from '../../../assets/document-icon.svg'; // You'll need to add this icon
import PlanOptions from './PlanOptions/PlanOptions';
import Info from "./ProjectDescription/ProjectDescription"
import DocumentSection from './DocumentSection/DocumentSection';

const ProjectForm = ({ freelancerId }) => {
    const [selectedPlan, setSelectedPlan] = useState('standard');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [freelancerPackages, setFreelancerPackages] = useState([]);

    useEffect(() => {
        const fetchFreelancerPackages = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/users/${freelancerId}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setFreelancerPackages(data.user.packages || []);
                }
            } catch (error) {
                console.error("Error fetching freelancer packages:", error);
            }
        };

        if (freelancerId) {
            fetchFreelancerPackages();
        }
    }, [freelancerId]);

    return (
        <>
            <div className="project-form-container">
                <div className="sla-section">
                    <Info/>

                    <DocumentSection 
                        documentName="777SpiningGameRequirements.PDF"
                        documentIcon={DocumentIcon}
                    />

                    <div className="price-section">
                        <div className="price-row">
                            <span>Price</span>
                            <span>R30 000</span>
                        </div>
                        <div className="price-row">
                            <span>Checkout price</span>
                            <span>R30 999</span>
                        </div>
                    </div>

                    <div className="button-group">
                        <button className="decline-btn">Decline SLA</button>
                        <button className="accept-btn">Accept SLA</button>
                    </div>

                    <p className="disclaimer">By accepting the SLA, you are confirming that every information on SLA is correct and valid.</p>
                </div>

                <PlanOptions 
                    selectedPlan={selectedPlan}
                    onPlanChange={setSelectedPlan}
                    planPrices={freelancerPackages}
                />
            </div>

            
        </>
    );
};

export default ProjectForm;
