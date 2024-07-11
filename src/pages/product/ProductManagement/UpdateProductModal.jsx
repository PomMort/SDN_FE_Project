import { Button, Form, Input, message, Modal, Select, Upload } from 'antd';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';
import { useGetProductsByIdQuery } from '../../../services/productAPI';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useGetCategoriesQuery } from '../../../services/categoryAPI';
import { UploadOutlined } from '@ant-design/icons';
import { storage } from "../../../config/FirebaseConfig/config";

export default function UpdateProductModal({ onCancel, onCreate, setIsModalOpen, isModalOpen, productSelected, setProductSelected, handleEditProduct }) {

  const { data: categoryData } = useGetCategoriesQuery();
  const [fileList, setFileList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {
    data: productData,
    error: productError
  } = useGetProductsByIdQuery(productSelected);


  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        quantity: productData.quantity,
        description: productData.description,
        name: productData.name,
        categoryId: productData.categoryId?._id,
        price: productData.price,

      });
    }
  }, [productData, form]);
  const handleCancelModal = () => {
    setIsModalOpen(false);
    setProductSelected(null);
    if (onCancel) onCancel();
  };

  const handleOk = async () => {
    setLoading(true);
    let values = await form.validateFields();
    let imageUrl = null;
    if (fileList[0]) {
      imageUrl = await handleUpload(fileList[0]);
    }


    const formatData = { ...productData, ...values, image: imageUrl ? imageUrl : productData.image }
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
  const handleValidatePrice = (_, value) => {
    if (value < 0) {
      return Promise.reject(new Error("Please input a non-negative number!"));
    }
    if (!value) {
      return Promise.reject(new Error("Please input price of product!"));
    }
    if (value === '@' || /[^0-9.,]/.test(value)) {
      return Promise.reject(new Error("Please input a valid price!"));
    }

    return Promise.resolve();
  };
  //image
  const handleUpload = async (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
        },
        (error) => {
          // Handle unsuccessful uploads
          message.error(error.message);
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );

    });
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    onRemove: () => {
      setFileList([]);
    }
  };

  // const uploadRules = [
  //   {
  //     required: true,
  //     message: 'Please upload an image!'
  //   }
  // ];
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
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'Please select type!' }]}
        >
          <Select>
            {
              categoryData?.map(category =>
                <Option key={category?.id} value={category?._id}>{category?.name}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ validator: handleValidateQuantity }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            { validator: handleValidatePrice },
          ]}
        >
          <Input
            placeholder="Input the price..."
            addonAfter="VND"
          />
        </Form.Item>


        <Form.Item
          label="Description"
          name="description"
          rules={[{
            required: true, message: "Please input description"
          }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* <Form.Item
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
                    </Form.Item> */}

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <p style={{ marginLeft: '20px' }}>Upload Img:</p>
          <Upload {...uploadProps} fileList={fileList} onChange={() => {
            // console.log(fileList);
          }} style={{ marginLeft: '20%' }}>
            <Button icon={<UploadOutlined />} >Click to Upload</Button>
          </Upload>
        </div>



        <img style={{ marginLeft: '25%', width: '40%' }} src={productData?.image} />

      </Form>
    </Modal>
  )
}
