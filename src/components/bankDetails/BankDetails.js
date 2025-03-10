import React from "react";
import "./BankDetails.css";
import { Card, Steps, Form, Input, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const BankDetails = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/vendor-services");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            <Button type="primary" htmlType="submit">
              Save and Continue
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default BankDetails;
