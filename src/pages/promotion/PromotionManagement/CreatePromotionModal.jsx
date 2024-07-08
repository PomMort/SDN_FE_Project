import React, { useState } from 'react';
import {
    Modal, Button,
    DatePicker,
    Form,
    Input,
    Calendar,
    Popover,
    theme,
    Select,
    notification,
} from 'antd';
import ButtonCreatePromotion from '../../../components/ButtonFilter/ButtonCreatePromotion';
import { Option } from 'antd/es/mentions';
import { convertDateStringToTimeStamp } from '../../../utils/utils';

export default function CreatePromotionModal({ onCreate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [discountUnit, setDiscountUnit] = useState("2");
    const [datePicker, setDatePicker] = useState([]);
    const [datePickerDayjs, setDatePickerDayjs] = useState([]);
    const [form] = Form.useForm();

    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

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
    };
    const handleValidateDiscount = (_, value) => {
        if (!value) {
            return Promise.reject(new Error("Please input!"));
        }

        else if (value < 0) {
            return Promise.reject(new Error("Please input a non-negative number!"));
        }
        else if (discountUnit === "2" && value >= 100) {
            return Promise.reject(new Error("Please input a disscount less than 100% !"));
        } else if (/[^0-9.,]/.test(value)) {
            return Promise.reject(new Error("Please input a number"));
        }
        return Promise.resolve();
    }

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();


            const formatData = {
                ...values,
                DiscountPercentage: discountUnit === "2" ? values.Discount : 0,
                FixedDiscountAmount: discountUnit === "1" ? values.Discount : 0,
                StartDate: convertDateStringToTimeStamp(datePicker[0]),
                EndDate: convertDateStringToTimeStamp(datePicker[1]),
                PromotionStatuses: "Active"
            }
            console.log(formatData);
            await onCreate(formatData); // Thêm sản phẩm vào danh sách
            form.resetFields(); // Reset form sau khi tạo thành công
            setLoading(false);
            setDatePicker([]);
            setDatePickerDayjs([]);
            setIsModalOpen(false); // Đóng modal sau khi tạo thành công
        } catch (error) {
            console.log("Validation Failed:", error);
            setLoading(false);
        }
    };


    return (
        <>
            <ButtonCreatePromotion contentBtn={"Add Promotion"} onClick={showModal} />
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
                        Create a new Promotion
                    </div>
                }
                okText="Create"
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
                        label="Code"
                        name="PromotionCode"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="Discount"
                        rules={[

                            { validator: handleValidateDiscount }

                        ]}
                    >
                        <Input
                            placeholder="Input the discount" addonAfter={
                                <Form.Item
                                    name="DiscountUnit"
                                    noStyle
                                >
                                    <Select
                                        defaultValue={discountUnit}
                                        style={{ width: 80 }}
                                        onChange={(value) => {
                                            setDiscountUnit(value);
                                        }}
                                    >
                                        <Option value="1">VND</Option>
                                        <Option value="2">%</Option>
                                    </Select>

                                </Form.Item>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <RangePicker value={datePickerDayjs} format={"DD-MM-YYYY"} onChange={(date, dateString) => {
                            setDatePicker(dateString);
                            setDatePickerDayjs(date);
                            

                        }} />
                    </Form.Item>


                    {/* <Form.Item
                        wrapperCol={{ offset: 6, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
                </Form>
            </Modal>
        </>
    );
}
