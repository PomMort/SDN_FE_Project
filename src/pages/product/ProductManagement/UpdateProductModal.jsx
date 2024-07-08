import { Form, Input, Modal, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';
import { useGetProductsByIdQuery } from '../../../services/productAPI';

export default function UpdateProductModal({ onCancel, onCreate, setIsModalOpen, isModalOpen, productSelected, setProductSelected, handleEditProduct }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {
    data: productData,
    error: productError
  } = useGetProductsByIdQuery(productSelected);


  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        Quantity: productData.Quantity,
        Description: productData.Description,
        CounterId: productData.CounterId + '',
      });
    }
  }, [productData, form]);

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setProductSelected(null);
    if (onCancel) onCancel();
  };

  const handleOk = async () => {
    let values = await form.validateFields();
    const formatData = { ...productData, ...values }
    // console.log(formatData);

    handleEditProduct(formatData)
  }

  const handleValidateQuantity = (_, value) => {
    if (value < 0) {
      return Promise.reject(new Error("Please input a non-negative number!"));
    }
    if (!value) {
      return Promise.reject(new Error("Please input quantity of product!"));
    }
    if (value === '@' || /[^0-9.,]/.test(value)) {
      return Promise.reject(new Error("Please input a valid quantity!"));
    }

    return Promise.resolve();
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  return (
    <Modal
      open={isModalOpen}
      title={
        <div
          style={{
            fontFamily: 'Playfair Display',
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "initial",
            color: "#333333",
          }}
        >
          Update a Product
        </div>
      }
      okText="Update"
      cancelText="Cancel"
      okButtonProps={{ loading }}
      onCancel={handleCancelModal}
      onOk={handleOk}
    >
      <Form
        {...formItemLayout}
        form={form}
        style={{ maxWidth: 600 }}
      >

        <p style={{ marginBottom: "20px" }}><span>Product Name: </span> <strong>{productData?.Name}</strong></p>

        <Form.Item
          label="Quantity"
          name="Quantity"
          rules={[{ validator: handleValidateQuantity }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="Description"
          rules={[{
            required: true, message: "Please input description"
          }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Counter"
          name="CounterId"
          rules={[
            { required: true, message: "Please select a counter" }
          ]}
        >
          <Select>
            <Option value="1">Counter 1</Option>
            <Option value="2">Counter 2</Option>
            <Option value="3">Counter 3</Option>
            <Option value="4">Counter 4</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
