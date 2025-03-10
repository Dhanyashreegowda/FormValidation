import React, { useState } from "react";
import "./BankDetails.css";
import { Card, Steps, Form, Input, Button, Row, Col, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBankDetails } from "../../redux/formSlice";



const BankDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch stored vendor details from Redux
  const vendorDetails = useSelector((state) => state.form.vendorDetails);
  const bankDetails = useSelector((state) => state.form.bankDetails);

  const onFinish = (values) => {
    console.log("Success:", values);
    if(values){
      localStorage.setItem("formData", JSON.stringify(values));
      }

      dispatch(setBankDetails(values));
    setIsModalVisible(true); // Show the modal
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    setIsModalVisible(false); // Hide the modal
    navigate("/vendor-services"); // Navigate to the next page
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Hide the modal
  };

  // Function to display all stored data dynamically
  const renderData = (data) => {
    return Object.entries(data || {}).map(([key, value]) => (
      <p key={key}>
        <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {value || "N/A"}
      </p>
    ));
  };

  return (
    <div className="container">
      <Card className="first_card">
        <div className="top_part">
          <h2 className="main_head">Bank Details</h2>
          <Steps
            className="step_size"
            progressDot
            current={1}
            items={[
              { title: "Vendor Details" },
              { title: "Bank Details" },
              { title: "Vendor Services" },
            ]}
          />
        </div>

        <Form
          name="bank-details-form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Card className="second_card">
            <h4 className="heading">Bank Details</h4>

            <Row gutter={[16, 16]}>
              <Col lg={8} md={12} sm={24} xs={24}>
                <Form.Item
                  label="Account Number"
                  name="accountNumber"
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        if (!value) return Promise.reject("Account Number is required");
                        if (!/^\d+$/.test(value))
                          return Promise.reject("Account Number must contain only numbers");
                        if (value.length < 10 || value.length > 16)
                          return Promise.reject("Must be between 10 and 16 digits");
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="Enter Account Number" maxLength={16} />
                </Form.Item>
              </Col>

              <Col lg={8} md={12} sm={24} xs={24}>
                <Form.Item
                  label="Re-Enter Account Number"
                  name="reEnterAccountNumber"
                  dependencies={["accountNumber"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value) return Promise.reject("Required");
                        if (!/^\d+$/.test(value))
                          return Promise.reject("Must contain only numbers");
                        if (value.length < 10 || value.length > 16)
                          return Promise.reject("Must be between 10 and 16 digits");
                        if (value !== getFieldValue("accountNumber"))
                          return Promise.reject("Numbers do not match");
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input placeholder="Re-Enter Account Number" maxLength={16} />
                </Form.Item>
              </Col>

              <Col lg={8} md={12} sm={24} xs={24}>
                <Form.Item
                  label="IFSC Code"
                  name="ifscCode"
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        if (!value) return Promise.reject("Required");
                        if (value.length !== 11)
                          return Promise.reject("Must be exactly 11 characters");
                        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value))
                          return Promise.reject("Invalid format (e.g., SBIN0001234)");
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="Enter IFSC Code" maxLength={11} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <div className="saveButton">
            <Button type="primary" htmlType="submit"> Submit </Button>
          </div>
        </Form>
      </Card>

      {/* Modal for successful submission */}
      <Modal
        title="Success"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bank details and Vendor details submitted successfully!</p>

        <h3>Vendor Details:</h3>
        {renderData(vendorDetails)}

        <h3>Bank Details:</h3>
        {renderData(bankDetails)}
      </Modal>
    </div>
  );
};

export default BankDetails;

