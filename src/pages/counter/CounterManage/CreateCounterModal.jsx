import React, { useEffect } from "react";
import { Modal, Form, Input, Row, Col, Switch } from "antd";

const CreateCounterModal = ({
  visible,
  onCreate,
  onCancel,
  loading,
  counterData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [form, visible]);

  return (
    <div className="create-counter-modal">
      <Modal
        visible={visible}
        title="Create a new counter"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              values.isActive = !!values.isActive; // Convert to boolean
              onCreate(values);
              form.resetFields();
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
            isActive: true, // Default isActive to true
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="counterName"
                label="Counter Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the counter name!",
                  },
                ]}
              >
                <Input placeholder="Enter counter name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  {
                    required: true,
                    message: "Please input the location!",
                  },
                ]}
              >
                <Input placeholder="Enter location" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="isActive"
                label="Status"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateCounterModal;
