import React, { useEffect } from 'react';
import useProfileCompletion from './useProfileCompletion';

function checkProfileCompletion(profile, requirements) {
  const missing = [];
  if (requirements.includes('name') && !profile?.name) missing.push('name');
  if (requirements.includes('email') && !profile?.email) missing.push('email');
  if (requirements.includes('profilePicture')) {
    // Accept string or non-empty array for profilePicture
    if (
      !profile?.profilePicture ||
      (Array.isArray(profile.profilePicture) && profile.profilePicture.length === 0) ||
      (typeof profile.profilePicture === 'string' && profile.profilePicture.trim() === '')
    ) {
      missing.push('profilePicture');
    }
  }
  return missing;
}

const withProfileCheck = (Component, PROFILE_REQUIREMENTS) => {
  return function WrappedComponent(props) {
    const { openModal, closeModal, isModalOpen } = useProfileCompletion();
    const profile = props.userProfile || {};
    const missingFields = checkProfileCompletion(profile, PROFILE_REQUIREMENTS);

    useEffect(() => {
      if (missingFields.length > 0) {
        openModal(missingFields, PROFILE_REQUIREMENTS);
      } else if (isModalOpen) {
        closeModal();
      }
      // Only open modal if missing fields and on a protected page
      // After profile is complete, never open again
    }, [missingFields.length, openModal, closeModal, isModalOpen, PROFILE_REQUIREMENTS]);

    return <Component {...props} profileIncomplete={missingFields.length > 0} />;
  };
};

export default withProfileCheck;
