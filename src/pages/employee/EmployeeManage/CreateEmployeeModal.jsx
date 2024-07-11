import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col, Radio } from "antd";
import "../Employee.css";

const CreateEmployeeModal = ({
  visible,
  onCreate,
  onCancel,
  loading,
  employeesData,
}) => {
  const [form] = Form.useForm();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setUserType(null);
    }
  }, [form, visible]);

  const validateEmail = async (_, value) => {
    if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return Promise.reject(new Error("Invalid email format"));
    }
    if (employeesData.some((employee) => employee.email === value)) {
      return Promise.reject(new Error("Email already exists"));
    }
    return Promise.resolve();
  };

  const validatePhone = async (_, value) => {
    if (!/^(0\d{9})$/.test(value)) {
      return Promise.reject(
        new Error("Phone number must be 10 digits starting with 0")
      );
    }
    if (employeesData.some((employee) => employee.phone === value)) {
      return Promise.reject(new Error("Phone number already exists"));
    }
    return Promise.resolve();
  };

  return (
    <div className="create-employee-page">
      <Modal
        open={visible}
        title="Create a new employee"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (values.dob) {
                values.dob = Math.floor(values.dob.valueOf() / 1000);
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
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the name of the user!",
                  },
                ]}
              >
                <Input placeholder="Input the full name..." />
              </Form.Item>
            </Col>

            <Col span={8}>
              <p>Email:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input the email of the user!",
                  },
                  { validator: validateEmail },
                ]}
              >
                <Input placeholder="Input the email..." />
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
                    message: "Please input the phone number of the user!",
                  },
                  { validator: validatePhone },
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
                  <Radio value={true}> Male </Radio>
                  <Radio value={false}> Female </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateEmployeeModal;
