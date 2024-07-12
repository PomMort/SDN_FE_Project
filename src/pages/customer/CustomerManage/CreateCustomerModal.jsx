import React, { useEffect } from "react";
import { Modal, Form, Input, Radio, Row, Col, notification } from "antd";
import "../Customer.css";

const CreateCustomerModal = ({
  visible,
  onCreate,
  onCancel,
  loading,
  customerData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [form, visible]);

  useEffect(() => {
    console.log("Customer Data in Modal:", customerData);
  }, [customerData]);

  const checkPhoneExists = (_, phone) => {
    console.log("Checking phone:", phone);
    if (!phone) {
      return Promise.reject("Please input the phone number of the user!");
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      return Promise.reject("Please input a valid 10-digit phone number!");
    }
    if (Array.isArray(customerData) && customerData.length > 0) {
      const phoneExists = customerData.some(
        (customer) => customer.phone === phone
      );
      if (phoneExists) {
        return Promise.reject("This phone number is already in use!");
      }
    }
    return Promise.resolve();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Submitting values:", values);
      await onCreate(values);

      // onCancel();
    } catch (error) {
      console.error("Validation failed:", error);
      notification.error({
        message: "Failed to create customer",
        description: "Please check the form and try again.",
      });
    }
  };

  return (
    <div className="create-customer-page">
      <Modal
        open={visible}
        title="Create a new customer"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={handleSubmit}
      >
        <Form
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Row>
            <Col span={8}>
              <p>Full Name:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the name of the customer!",
                  },
                ]}
              >
                <Input placeholder="Input the full name..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <p>Address:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input the address of the customer!",
                  },
                ]}
              >
                <Input placeholder="Input the address..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <p>Phone number:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                  {
                    validator: checkPhoneExists,
                  },
                ]}
              >
                <Input placeholder="Input the phone number..." />
              </Form.Item>
            </Col>
            <Col span={8}>Gender</Col>
            <Col span={16}>
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please choose the gender!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={false}> Male </Radio>
                  <Radio value={true}> Female </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateCustomerModal;
