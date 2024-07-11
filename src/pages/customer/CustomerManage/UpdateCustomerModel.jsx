import React, { useEffect } from "react";
import { Modal, Form, Input, Row, Col, Radio } from "antd";
import "../Customer.css";

const UpdateCustomerModel = ({
  visible,
  onCreate,
  onCancel,
  loading,
  customer,
  customerData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && customer) {
      form.setFieldsValue({
        customerId: customer.customerId,
        name: customer.name,
        address: customer.address,
        phone: customer.phone,
        customerGender: customer.customerGender,
      });
    } else {
      form.resetFields();
    }
  }, [form, visible, customer]);

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

  return (
    <div className="create-customer-page">
      <Modal
        visible={visible}
        title={customer ? "Edit Customer" : "Create a new customer"}
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (customer) {
                values.id = customer.id;
              }
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Row>
            <div style={{ display: "none" }}>
              <Col span={8}>
                <p>id:</p>
              </Col>
              <Col span={16}>
                <Form.Item name="customerId">
                  <Input placeholder="Input the full name..." />
                </Form.Item>
              </Col>
            </div>

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
                name="customerGender"
                rules={[
                  {
                    required: true,
                    message: "Please choose the gender!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={0}> Male </Radio>
                  <Radio value={1}> Female </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateCustomerModel;