import { Space, Table, Tag, Button, Popover, ConfigProvider } from 'antd'
import React from 'react'
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import UpdateCategoryModal from './UpdateCategoryModal';


// import '../product/ProductManagement/ProductList.css'

export default function CategoryList({ categoryData = [], handleDeleteCategory, handleEditCategory }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categorySelected, setCategorySelected] = useState(null);
    const handlePopoverVisibleChange = (index, visible) => {
        setOpen({ ...open, [index]: visible }); // Cập nhật trạng thái của Popover
        // console.log(categoryData);
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
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
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
                                {/* <div>
                                    <EyeOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" >
                                        <p className="">View Category Detail</p></Button>
                                </div> */}

                                <div>
                                    <DeleteOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => handleDeleteCategory(record?.id)}>
                                        <p className="">Delete Category</p></Button>
                                </div>

                                <div>
                                    <EditOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => {
                                        setIsModalOpen(true);
                                        handlePopoverVisibleChange(index, false);
                                        setCategorySelected(record.id);
                                    }}>
                                        <p className="">Edit Category</p></Button>
                                </div>
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
    // Ensure categoryData is an array
    const data = categoryData.map((item, index) => ({
        key: index + 1,
        id: item?._id,
        category: item?.name,
    }));
    const [open, setOpen] = useState(Array(categoryData.length).fill(false));
    return (
        <div>

            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            <UpdateCategoryModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                handleEditCategory={handleEditCategory}
            />
        </div>
    )
}
