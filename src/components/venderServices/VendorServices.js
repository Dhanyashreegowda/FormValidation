import React from 'react';
import './VendorServices.css';
import { Card, Steps, Button } from 'antd';

const VendorServices = () => {
const storedBankDetails = JSON.parse(localStorage.getItem("formData")) || {};

  
  return (
    <div className="containerr">
      <Card className="first_cardd">
        <div className="top_partt">
          <h2 className="main_head">Vendor Services</h2>
          <Steps
            className="step_size"
            progressDot
            current={2}
            items={[
              { title: 'Vendor Details' },
              { title: 'Bank Details' },
              { title: 'Vendor Services' },
            ]}
          />
        </div>

        <Card className="second_cardd">
          <h2 className="success_text">
            🎉 Congratulations! Vendor Details and Bank Details Completed
          </h2>
                <h3>Stored Bank Details:</h3>
                {Object.entries(storedBankDetails).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {value || "N/A"}
                  </p>
                ))}
            

          
        </Card>
      </Card>
    </div>
  );      
};

export default VendorServices;
