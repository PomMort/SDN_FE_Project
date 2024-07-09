import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Row, Col, Radio } from "antd";
import "../Employee.css";

const { Option } = Select;

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

  const checkEmailExists = (_, email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return Promise.reject("Please input the email of the user!");
    }
    if (!emailPattern.test(email)) {
      return Promise.reject("Please input a valid email address!");
    }

    const emailExists = employeesData.data.some(
      (employee) => employee.email === email
    );

    if (emailExists) {
      return Promise.reject("This email is already in use!");
    }

    return Promise.resolve();
  };

  const checkPhoneExists = (_, phone) => {
    if (!phone) {
      return Promise.reject("Please input the phone number of the user!");
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      return Promise.reject("Please input a valid 10-digit phone number!");
    }
    const phoneExists = employeesData.data.some(
      (employee) => employee.phone === phone
    );
    if (phoneExists) {
      return Promise.reject("This phone number is already in use!");
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
                  {
                    validator: checkEmailExists,
                  },
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

export default CreateEmployeeModal;
