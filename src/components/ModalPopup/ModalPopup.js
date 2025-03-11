import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
import './ModalPopup.css';

const ModalPopup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bankDetails, vendorDetails } = location.state || {};

  const handleOk = () => {
    navigate("/vendor-services"); // Navigate to the next page
  };

  const handleCancel = () => {
    navigate("/bank-details"); // Navigate back to the form
  };

  // Function to render keys and values in a horizontal format
  const renderHorizontalData = (data) => {
    const keys = Object.keys(data || {});
    const values = Object.values(data || {});

    return (
      <div className="horizontal-data">
        <div className="keys-row">
          {keys.map((key) => (
            <div key={key} className="key-item">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </div>
          ))}
        </div>
        <div className="values-row">
          {values.map((value, index) => (
            <div key={index} className="value-item">
              {value || "N/A"}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Modal
      title="Success"
      visible={true} // Always show the modal when this component is rendered
      onOk={handleOk}
      onCancel={handleCancel}
      width={800} // Make the modal wider
      className="custom-modal" // Add a custom class for styling
      footer={[
        <Button key="back" onClick={handleCancel} className="modal-button">
          Back
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk} className="modal-button">
          Next
        </Button>,
      ]}
    >
      <div className="modal-content">
        <p className="success-message">Bank details and Vendor details submitted successfully!</p>

        <div className="details-section">
          <h3 className="section-title">Vendor Details:</h3>
          <div className="details-container">
            {renderHorizontalData(vendorDetails)}
          </div>
        </div>

        {/* <div className="details-section">
          <h3 className="section-title">Bank Details:</h3>
          <div className="details-container">
            {renderHorizontalData(bankDetails)}
          </div>
        </div> */}
      </div>
    </Modal>
  );
};

export default ModalPopup;