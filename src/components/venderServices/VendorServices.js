import React from 'react';
import './VendorServices.css';
import { Card, Steps, Button } from 'antd';

const VendorServices = () => {
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
          <p className="info_text">Do you want to submit the details?</p>
          <div className="saveButtonn">
            <Button type="primary" className="submit_btn" htmlType="submit">
              Submit
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default VendorServices;
