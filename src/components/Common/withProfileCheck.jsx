/* eslint-disable react/prop-types */
// withProfileCheck.js
import React, { useEffect } from 'react';
import { useProfileCompletionContext } from './ProfileCompletionContext';
import BACKEND_URL from '../../config/backend-config';

// Black bouncing balls loader component
const LoadingSpinner = ({ text = 'Loading, Please Wait..!' }) => {
  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { 
              transform: scale(0.8);
              opacity: 0.5; 
            }
            40% { 
              transform: scale(1.2);
              opacity: 1; 
            }
          }
          .bounce-ball {
            width: 16px;
            height: 16px;
            background-color: #000000;
            border-radius: 50%;
            margin: 0 4px;
            animation: bounce 1.4s ease-in-out infinite both;
          }
          .bounce-ball-1 { animation-delay: -0.32s; }
          .bounce-ball-2 { animation-delay: -0.16s; }
          .bounce-ball-3 { animation-delay: 0s; }
        `}
      </style>
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white">
        <div className="text-center">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <div className="bounce-ball bounce-ball-1"></div>
            <div className="bounce-ball bounce-ball-2"></div>
            <div className="bounce-ball bounce-ball-3"></div>
          </div>
          <h5 className="text-dark fw-semibold mb-2">{text}</h5>
          <p className="text-muted small mb-0">Stay Encouraged.</p>
        </div>
      </div>
    </>
  );
};

// Error state component
const ErrorState = ({ error }) => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm border-0" style={{ maxWidth: '400px' }}>
        <div className="card-body text-center p-5">
          <div className="text-danger mb-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h4 className="text-dark fw-bold mb-3">Something went wrong</h4>
          <p className="text-muted mb-4">
            We encountered an issue while checking your profile status.
          </p>
          <div className="bg-light rounded p-3 mb-4">
            <small className="text-muted font-monospace">{error}</small>
          </div>
          <button 
            className="btn btn-dark btn-sm px-4"
            onClick={() => window.location.reload()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="me-2">
              <polyline points="23,4 23,10 17,10" stroke="currentColor" strokeWidth="2" fill="none"/>
              <polyline points="1,20 1,14 7,14" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4L18.36,18.36A9,9,0,0,0,3.51,15" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

// Blocked/Profile Incomplete state
const BlockedState = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm border-0" style={{ maxWidth: '500px' }}>
        <div className="card-body text-center p-5">
          <div className="text-warning mb-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-dark fw-bold mb-3">Profile Incomplete</h3>
          <p className="text-muted mb-4">
            To access this feature, you need to complete your profile first. 
            This helps us provide you with the best possible experience.
          </p>
          
          <div className="bg-light rounded p-4 mb-4">
            <h6 className="fw-semibold mb-3 text-dark">What you'll need to add:</h6>
            <div className="row g-2 text-start">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted me-2">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <small className="text-muted">Personal info</small>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted me-2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <small className="text-muted">Profile picture</small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button 
              className="btn btn-dark px-4"
              onClick={() => window.location.href = '/profile'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="me-2">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Complete Profile
            </button>
            <button 
              className="btn btn-outline-secondary px-4"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const withProfileCheck = (WrappedComponent, options = {}) => {
  return function WithProfileCheckWrapper(props) {
    const {
      checkProfileCompletion,
      isProfileComplete,
      loading,
      userProfile,
      error,
      blocked
    } = useProfileCompletionContext();
    console.log('checking profile eligibility');
    console.log({ userProfile });
    console.log({ blocked});
    
    
    // You'll need to define your BACKEND_URL - could be from env or config

    useEffect(() => {
      // Check if we have auth data in localStorage
      const token = localStorage.getItem('token');
      const uid = localStorage.getItem('uid');
      
      if (token && uid) {
        checkProfileCompletion(BACKEND_URL);
      } else {
        console.warn('Missing authentication data in localStorage');
      }
    }, [checkProfileCompletion, BACKEND_URL]);

    // Show loading state
    if (loading) {
      return options.loadingComponent || (
        <LoadingSpinner text={options.loadingText || 'Please Wait...'} />
      );
    }

    // Show error state
    if (error) {
      return options.errorComponent || (
        <ErrorState error={error} />
      );
    }

    // Optionally block rendering if profile is incomplete
    if (options.strictMode && isProfileComplete === false) {
      return options.blockedComponent || (
        <BlockedState />
      );
    }

    // Pass userProfile and profile completion status to wrapped component
    return (
      <WrappedComponent 
        {...props} 
        userProfile={userProfile}
        isProfileComplete={isProfileComplete}
      />
    );
  };
};

export default withProfileCheck;