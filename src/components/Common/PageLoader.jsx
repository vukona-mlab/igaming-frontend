import React from 'react'

function PageLoader({ text = 'Loading, Please Wait..!' }) {
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
}

export default PageLoader