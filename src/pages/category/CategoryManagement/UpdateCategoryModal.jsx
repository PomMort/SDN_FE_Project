import { Form, Input, message, Modal, Select } from 'antd';

import { useEffect, useState } from 'react';
import { useGetCategoryByIdQuery } from '../../../services/categoryAPI'; 


export default function UpdateCategoryModal({ onCancel, onCreate, setIsModalOpen, isModalOpen, categorySelected, setCategorySelected, handleEditCategory }) {



  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {
    data: categoryData,
    error: categoryError
  } = useGetCategoryByIdQuery(categorySelected);
// console.log(categorySelected);
  useEffect(() => {
    if (categoryData) {
      form.setFieldsValue({
        
        name: categoryData.name,
        

      });
    }
  }, [categoryData, form]);
  const handleCancelModal = () => {
    setIsModalOpen(false);
    setCategorySelected(null);
    if (onCancel) onCancel();
  };

  const handleOk = async () => {
    setLoading(true);
    let values = await form.validateFields();

    const formatData = { ...categoryData, ...values, }
    // console.log(formatData);

    handleEditCategory(formatData)
  }

  
  




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
          Update a Category
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
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
