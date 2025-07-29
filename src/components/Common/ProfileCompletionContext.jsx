import React, { createContext, useContext, useState, useCallback } from 'react';

const ProfileCompletionContext = createContext();

export const ProfileCompletionProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Proactive check (on app load or navigation)
  const checkProfileCompletion = useCallback(async (uid, token, BACKEND_URL) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/users/${uid}`, {
        method: "GET",
        headers: { Authorization: token },
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);
        // Use the same required fields as your backend
        const requiredFields = ['name', 'email', 'profilePicture', 'bio'];
        // Check which fields are missing (matching backend logic)
        const missing = requiredFields.filter(field => {
          const value = data.user[field];
          return !value || (typeof value === 'string' && value.trim() === '');
        });
        setMissingFields(missing);
        // Show modal if there are missing required fields
        const shouldShowModal = missing.length > 0;
        setIsModalOpen(shouldShowModal);
        return {
          profileComplete: missing.length === 0,
          missingFields: missing,
          shouldShowModal
        };
      } else {
        setIsModalOpen(false);
        return { profileComplete: false, missingFields: [], shouldShowModal: false };
      }
    } catch (error) {
      setIsModalOpen(false);
      return { profileComplete: false, missingFields: [], shouldShowModal: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Reactive check (on API error)
  const handleApiError = useCallback((error, errorData) => {
    if (errorData?.code === 'PROFILE_INCOMPLETE') {
      setMissingFields(errorData.missingFields || []);
      setIsModalOpen(true);
      return true; // Indicates this was a profile completion error
    }
    return false; // Not a profile completion error
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const value = {
    isModalOpen,
    missingFields,
    userProfile,
    loading,
    checkProfileCompletion,
    handleApiError,
    openModal,
    closeModal
  };

  return (
    <ProfileCompletionContext.Provider value={value}>
      {children}
    </ProfileCompletionContext.Provider>
  );
};

export const useProfileCompletionContext = () => {
  const context = useContext(ProfileCompletionContext);
  if (!context) {
    throw new Error('useProfileCompletionContext must be used within a ProfileCompletionProvider');
  }
  return context;
};
