import React from 'react';
import { Modal } from 'react-bootstrap';
import './TermsModal.css';

const TermsModal = ({ show, onHide, onAccept, accepted }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" className="terms-modal">
      <Modal.Header closeButton>
        <Modal.Title>Terms and Conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="terms-content">
          <div className="terms-scrollable">
            <ol>
              <li>
                <strong>Escrow Service:</strong> This agreement governs the escrow service provided for securing funds during the project transaction.
              </li>
              <li>
                <strong>Payment Terms:</strong>
                <ul>
                  <li>The buyer agrees to deposit the full project amount into escrow.</li>
                  <li>Funds will be released according to the agreed milestone schedule.</li>
                  <li>All payment processing fees are non-refundable.</li>
                </ul>
              </li>
              {/* ... rest of the terms ... */}
            </ol>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="terms-actions">
          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={accepted}
              onChange={(e) => onAccept(e.target.checked)}
            />
            <label htmlFor="acceptTerms">
              I have read and agree to the Terms and Conditions
            </label>
          </div>
          <button className="close-button" onClick={onHide}>
            Close
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsModal; 