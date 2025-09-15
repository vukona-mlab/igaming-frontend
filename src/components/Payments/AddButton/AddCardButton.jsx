import React from 'react';

const AddCardButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      style={{
        backgroundColor: 'black', 
        color: 'white', 
        padding: '10px 20px', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer',
        fontSize: '16px',
        display:'flex',
      }}
    >
      <span style={{
        fontFamily: 'Poppins', 
        fontWeight: '600', 
        fontSize: '15px', 
        lineHeight: '100%', 
        letterSpacing: '0px', 
        verticalAlign: 'middle',
        margin: '0px',
        padding: '0px',

      }}>
        Add Card
      </span>
    </button>
  );
}

export default AddCardButton;
