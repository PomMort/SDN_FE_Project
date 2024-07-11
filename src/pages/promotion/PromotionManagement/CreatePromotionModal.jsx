import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, DatePicker, InputNumber } from "antd";

const { RangePicker } = DatePicker;

const CreatePromotionModal = ({
  visible,
  onCreate,
  onCancel,
  loading,
  promotionData,
}) => {
  const [form] = Form.useForm();
  const [existingPromotionCodes, setExistingPromotionCodes] = useState([]);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [form, visible]);

  useEffect(() => {
    // Update existing promotion codes when promotion data changes
    if (promotionData) {
      const codes = promotionData.map((promo) => promo.code);
      setExistingPromotionCodes(codes);
    }
  }, [promotionData]);

  const validatePromotionCode = (_, value) => {
    if (existingPromotionCodes.includes(value)) {
      return Promise.reject(new Error("This promotion code is already used!"));
    }
    return Promise.resolve();
  };

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        const [startDate, endDate] = values.dates;
        const promotionData = {
          ...values,
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        };
        delete promotionData.dates;
        onCreate(promotionData);
        form.resetFields(); // Reset fields after successful creation
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div className="create-promotion-page">
      <Modal
        visible={visible}
        title="Create a new promotion"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={handleCreate}
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
              <p>Name:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the name of the promotion!",
                  },
                ]}
              >
                <Input placeholder="Input the promotion name..." />
              </Form.Item>
            </Col>

            <Col span={8}>
              <p>Code:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input the code of the promotion!",
                  },
                  {
                    validator: validatePromotionCode,
                  },
                ]}
              >
                <Input placeholder="Input the promotion code..." />
              </Form.Item>
            </Col>

            <Col span={8}>
              <p>Discount Percent:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="percent"
                rules={[
                  {
                    required: true,
                    message: "Please input the discount percent!",
                  },
                  {
                    type: "number",
                    min: 1,
                    max: 100,
                    message: "Percent must be between 1 and 100!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Input the discount percent..."
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <p>Dates:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="dates"
                rules={[
                  {
                    required: true,
                    message: "Please select the start and end dates!",
                  },
                ]}
              >
                <RangePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePromotionModal;
