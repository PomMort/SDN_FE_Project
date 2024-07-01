import React, { useState } from 'react';
import {
    Modal, Button, Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect
} from 'antd';
import ButtonCreateProduct from '../../../components/ButtonFilter/ButtonCreateProduct';

export default function CreateProductModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ButtonCreateProduct contentBtn={"Add Product"} onClick={showModal} />
            <Modal
                title="Create Product"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        label="Product Name"
                        name="ProductName"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Barcode"
                        name="Barcode"
                        
                        
                    >
                        <Input
                            style={{ width: '100%' }}
                            disabled={true}
                            placeholder="Ko dc nhap"
                        />
                    </Form.Item>

                    <Form.Item
                        label="TextArea"
                        name="TextArea"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Mentions"
                        name="Mentions"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Mentions />
                    </Form.Item>

                    <Form.Item
                        label="Select"
                        name="Select"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select />
                    </Form.Item>

                    <Form.Item
                        label="Cascader"
                        name="Cascader"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Cascader />
                    </Form.Item>

                    <Form.Item
                        label="TreeSelect"
                        name="TreeSelect"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <TreeSelect />
                    </Form.Item>

                    <Form.Item
                        label="RangePicker"
                        name="RangePicker"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <RangePicker />
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
