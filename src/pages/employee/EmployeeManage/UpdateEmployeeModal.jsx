import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Row, Col } from "antd";
import "../Employee.css";

const { Option } = Select;

const UpdateEmployeeModal = ({
  visible,
  onUpdate,
  onCancel,
  loading,
  employee,
}) => {
  const [form] = Form.useForm();
  const [userType, setUserType] = useState(employee?.RoleId);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        _id: employee?._id,
        phone: employee?.phone,
        status: employee?.status,
      });
    }
  }, [form, visible, employee]);

  return (
    <div className="update-employee-page">
      <Modal
        open={visible}
        title="Update Employee"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (values.DoB) {
                values.DoB = Math.floor(values.DoB.valueOf() / 1000);
              }
              onUpdate(values);
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
            <Form.Item
              style={{ display: "none" }}
              name="_id"
              rules={[
                {
                  required: true,
                  message: "Please input the name of the user!",
                },
              ]}
            >
              <Input placeholder="Input the full name..." />
            </Form.Item>

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
                    pattern: /^[0-9]{10}$/,
                    message: "Please input a valid 10-digit phone number!",
                  },
                ]}
              >
                <Input placeholder="Input the phone number..." />
              </Form.Item>
            </Col>

            <Col span={8}>
              <p>Status:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please select the status of the user!",
                  },
                ]}
              >
                <Select placeholder="Select status">
                  <Option value={true}>Active</Option>
                  <Option value={false}>Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateEmployeeModal;
