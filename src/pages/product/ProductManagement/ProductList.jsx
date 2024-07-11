import {  Table, Button, Popover, ConfigProvider } from 'antd';
import React from 'react';
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
// import '../product/ProductManagement/ProductList.css'
import { Link } from 'react-router-dom';
import UpdateProductModal from './UpdateProductModal';

export default function ProductList({ productData = [], handldeDeleteProduct, handleEditProduct, }) { // Destructure props and set default value
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productSelected, setProductSelected] = useState(null);

    const handlePopoverVisibleChange = (index, visible) => {
        setOpen({ ...open, [index]: visible }); // Update Popover state
    }



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
                                <Link to=
                                    {{
                                        pathname: `/view-product-detail/${record?.id}`
                                    }}
                                >
                                    <div>
                                        <EyeOutlined style={{ paddingRight: '8px' }} />
                                        <Button type="text" >
                                            <p className="">View Product Detail</p></Button>
                                    </div>

                                </Link>
                                <div>
                                    <DeleteOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => handldeDeleteProduct(record?.id)}>
                                        <p className="">Delete Product</p></Button>
                                </div>

                                <div>
                                    <EditOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => {
                                        setIsModalOpen(true);
                                        handlePopoverVisibleChange(index, false);
                                        setProductSelected(record.id);
                                    }}>
                                        <p className="">Edit Product</p></Button>
                                </div>
                            </div>
                        }
                        trigger="click"
                        open={open[index]}
                        placement="bottomRight"
                        onOpenChange={(visible) => handlePopoverVisibleChange(index, visible)} // Handle Popover state change
                    >
                        <Button type="text"><TfiMoreAlt /></Button>

                    </Popover>

                </ConfigProvider>
            ),
        },
    ];

    // Ensure productData is an array
    const data = productData.map((item, index) => ({
        key: index + 1,
        id: item?.id,
        name: item?.name,
        // code: item?.Barcode,
        // category: item?.Category,
        // weight: item?.Weight,
        price: item?.price,
        // counter: item?.CounterId,
    }));
    const [open, setOpen] = useState(Array(productData.length).fill(false));

    return (
        <>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            <UpdateProductModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} productSelected={productSelected} setProductSelected={setProductSelected} handleEditProduct={handleEditProduct} />
        </>
    )
}
