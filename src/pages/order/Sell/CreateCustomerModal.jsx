import React, { useState } from "react";
import { Modal, Form, Input, Button, Radio, message } from "antd";
import { useAddCustomerMutation } from "../../../services/orderAPI";

export default function CreateCustomerModal({ visible, onClose, onCreate }) {
  const [form] = Form.useForm();
  const [addCustomer, { isLoading }] = useAddCustomerMutation();

  const handleSubmit = async (values) => {
    try {
      const response = await addCustomer(values).unwrap();
      message.success("Customer created successfully!");
      form.resetFields();
      onCreate(response); // Pass the newly created customer to the parent component
      onClose();
    } catch (error) {
      console.error("Failed to create customer:", error);
      message.error(error.data.description);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create Customer"
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter the customer's name" },
          ]}
        >
          <Input placeholder="Enter customer's name" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            { required: true, message: "Please enter the customer's address" },
          ]}
        >
          <Input placeholder="Enter customer's address" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please enter the customer's phone number",
            },
            { pattern: /^\d+$/, message: "Please enter a valid phone number" },
          ]}
        >
          <Input placeholder="Enter customer's phone number" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            { required: true, message: "Please select the customer's gender" },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Male</Radio>
            <Radio value={false}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
