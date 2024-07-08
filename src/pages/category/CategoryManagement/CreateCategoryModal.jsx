import React, { useState } from 'react';
// import { UploadFile } from 'antd';
import {
    Modal, Button,
    DatePicker,
    Form,
    Input,

} from 'antd';
import ButtonCreateCategory from '../../../components/ButtonFilter/ButtonCreateCategory';


export default function CreateCategoryModal(onCancel) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);



    const { RangePicker } = DatePicker;
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
        if (onCancel) onCancel();
    };



    return (
        <>
            <ButtonCreateCategory contentBtn={"Add Category"} onClick={showModal} />
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
                        Create a new Category
                    </div>
                }
                okText="Create"
                cancelText="Cancel"
                okButtonProps={{ loading }}
                onCancel={handleCancelModal}
            // onOk={handleOk}

            >
                <Form
                    {...formItemLayout}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        label="Category Name"
                        name="CategoryName"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 6, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
