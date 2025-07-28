import React, { createContext, useContext, useState, useCallback } from 'react';

const ProfileCompletionContext = createContext();

export const ProfileCompletionProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [requirements, setRequirements] = useState([]);

  const openModal = useCallback((fields = [], reqs = []) => {
    setMissingFields(fields);
    setRequirements(reqs);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <ProfileCompletionContext.Provider value={{ isModalOpen, openModal, closeModal, missingFields, requirements }}>
      {children}
    </ProfileCompletionContext.Provider>
  );
};

export const useProfileCompletionContext = () => useContext(ProfileCompletionContext);
