import React, { useEffect } from 'react';
import { useProfileCompletionContext } from './ProfileCompletionContext';

// HOC to enforce profile completion on protected pages
const withProfileCheck = (WrappedComponent) => {
  return function WithProfileCheckWrapper(props) {
    const {
      checkProfileCompletion,
      isProfileComplete,
      loading,
      userProfile,
      openModal
    } = useProfileCompletionContext();

    useEffect(() => {
      // Proactively check profile completion on mount
      checkProfileCompletion();
    }, []);

    // If still loading, don't render the protected component
    if (loading) return null;

    // If profile is incomplete, modal will be shown by context/modal
    // Optionally, you can block rendering the protected component here if you want strict enforcement
    // But if you want the modal to handle enforcement, just render the component
    return <WrappedComponent {...props} userProfile={userProfile} />;
  };
};

export default withProfileCheck;
