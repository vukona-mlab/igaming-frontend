// validation.js

// Name validation (only letters)
export const validateName = (name) => {
    if (!name.match(/^[A-Za-z]+$/)) {
      return "Name should only contain letters";
    }
    return "";
  };
  
  // Surname validation (only letters)
  export const validateSurname = (surname) => {
    if (!surname.match(/^[A-Za-z]+$/)) {
      return "Surname should only contain letters";
    }
    return "";
  };
  
  // Email validation (basic format check)
  export const validateEmail = (email) => {
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
      return "Invalid email format";
    }
    return "";
  };
  
 // Phone validation: Must be either a 10-digit number or start with +27 followed by 9 digits
export const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+27[0-9]{9}|[0-9]{10})$/;
  
    if (!phone.match(phoneRegex)) {
      return "Phone number must be 10 digits or start with +27 followed by 9 digits";
    }
    
    return "";
  };
  
  
  // Password validation (min 6 chars, at least one number, one uppercase letter, and one special character)
  export const validatePassword = (password) => {
    if (!password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/)) {
      return "Password must be at least 6 characters, with a number, one uppercase letter, and a special character";
    }
    return "";
  };
  
  // Date of Birth validation (DD/MM/YYYY format)
  export const validateDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth.match(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)) {
      return "Date of birth must be in the format DD/MM/YYYY";
    }
    return "";
  };
  