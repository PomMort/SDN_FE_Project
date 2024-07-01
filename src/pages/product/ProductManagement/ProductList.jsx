import { Space, Table, Tag, Button, Popover, ConfigProvider } from 'antd'
import React from 'react'
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { LoginSharp } from "@mui/icons-material";
// import '../product/ProductManagement/ProductList.css'

export default function ProductList() {

    const handlePopoverVisibleChange = (index, visible) => {
        setOpen({ ...open, [index]: visible }); // Cập nhật trạng thái của Popover
    }
    // console.log(products)


    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            width: '1%',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Barcode',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        }, {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        }, {
            title: 'Counter',
            dataIndex: 'counter',
            key: 'counter',
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
                        },
                    }}
                >
                    <Popover
                        content={
                            <div className="pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <Button type="text"><p className="">View Detail</p></Button>
                                <Button type="text"><p className="">Delete</p></Button>
                                <Button type="text"><p className="">Update</p></Button>

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
    const data = [
        {
            key: '1',
            name: 'John Brown',
            code: 123456,
            category: 'Dimond',
            weight: '1.1Carat',
            price: '1000VND',
            counter: 'counter 1'
        },
        {
            key: '2',
            name: 'John Brown',
            code: 123456,
            category: 'Dimond',
            weight: '1.1Carat',
            price: '1000VND',
            counter: 'counter 1'
        }, {
            key: '3',
            name: 'John Brown',
            code: 123456,
            category: 'Dimond',
            weight: '1.1Carat',
            price: '1000VND',
            counter: 'counter 1'
        }, {
            key: '4',
            name: 'John Brown',
            code: 123456,
            category: 'Dimond',
            weight: '1.1Carat',
            price: '1000VND',
            counter: 'counter 1'
        },
    ];
    const [open, setOpen] = useState(Array(data.length).fill(false));
    return (
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    )
}
