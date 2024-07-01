import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Row, Col, Radio } from "antd";
import "../Customer.css";

const UpdateCustomerModel = ({
  visible,
  onCreate,
  onCancel,
  loading,
  customer,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && customer) {
      // If in edit mode, set initial values based on the provided customer data
      form.setFieldsValue({
        Name: customer.Name,
        Address: customer.Address,
        Phone: customer.Phone,
        Gender: customer.Gender,
      });
    } else {
      // Reset form fields if not in edit mode
      form.resetFields();
    }
  }, [form, visible, customer]);

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
              // If in edit mode, include customer ID in the values
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
            <Col span={8}>
              <p>Full Name:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="Name"
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
                name="Address"
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
                name="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input the phone number of the customer!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please input a valid 10-digit phone number!",
                  },
                ]}
              >
                <Input placeholder="Input the phone number..." />
              </Form.Item>
            </Col>
            <Col span={8}>Gender</Col>
            <Col span={16}>
              <Form.Item
                name="Gender"
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
