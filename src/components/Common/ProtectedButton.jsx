import React from 'react';
import useProfileCompletion from './useProfileCompletion';

const ProtectedButton = ({ children, ...props }) => {
  const { isModalOpen, openModal, missingFields, requirements } = useProfileCompletion();
  const disabled = missingFields && missingFields.length > 0;

  const handleClick = (e) => {
    if (disabled) {
      openModal(missingFields, requirements);
      e.preventDefault();
      return;
    }
    if (props.onClick) props.onClick(e);
  };

  return (
    <button {...props} disabled={disabled} onClick={handleClick}>
      {children}
    </button>
  );
};

export default ProtectedButton;
