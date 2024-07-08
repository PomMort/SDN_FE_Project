import { Space, Table, Tag, Button, Popover, ConfigProvider } from 'antd'
import React from 'react'
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined, UserAddOutlined } from '@ant-design/icons';


// import '../product/ProductManagement/ProductList.css'

export default function CustomerPolicyList({ productData = [] }) {

    const handlePopoverVisibleChange = (index, visible) => {
        setOpen({ ...open, [index]: visible }); // Cập nhật trạng thái của Popover
    }

    // console.log(productData)


    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            width: '1%',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'PhoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
                <ConfigProvider
                    theme={{
                        components: {
                            Popover: {
                                zIndexPopup: '2000'
                            },
                            Table: {
                                cellPaddingInline: '200px'
                            }
                        },
                    }}
                >
                    <Popover
                        content={
                            <div className="pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <div>
                                    <EyeOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" >
                                        <p className="">View Customer Detail</p></Button>
                                </div>

                                <div>
                                    <DeleteOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text">
                                        <p className="">Delete Customer</p></Button>
                                </div>

                                <div>
                                    <EditOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" >
                                        <p className="">Edit Customer</p></Button>
                                </div>
                                {/* <div>
                                    <UserAddOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" >
                                        <p className="">Create Promotion for customer</p></Button>
                                </div> */}
                            </div>
                        }
                        trigger="click"
                        open={open[index]}
                        placement="bottomRight"
                        onOpenChange={(visible) => handlePopoverVisibleChange(index, visible)} // Xử lý sự kiện khi Popover thay đổi trạng thái
                    >
                        <Button type="text"><TfiMoreAlt /></Button>

                    </Popover>

                </ConfigProvider>
            ),
        },
    ];
    // Ensure productData is an array
    // const data = productData.map((item, index) => ({
    //     key: index + 1,
    //     category: item?.Category
    // }));
    const data = [
        {
            key: '1',
            customerName: 'John Brown',
            email: 'hiuhaha789@gmail.com',
            phoneNumber: '0123456789',
            address: 'Vinhome GrandPark',
        },
        {
            key: '2',
            customerName: 'Huy',
            email: 'hiuhaha789@gmail.com',
            phoneNumber: '0123456789',
            address: 'Vinhome GrandPark',
        },
        {
            key: '3',
            customerName: 'Kha',
            email: 'hiuhaha789@gmail.com',
            phoneNumber: '0123456789',
            address: 'Vinhome GrandPark',
        },
    ];

    const [open, setOpen] = useState(Array(productData.length).fill(false));
    return (
        <div>

            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />

        </div>
    )
}
