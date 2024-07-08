import { Space, Table, Tag, Button, Popover, ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';
import { TfiMoreAlt } from "react-icons/tfi";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { convertTimeStampToDateString } from '../../../utils/utils';
import UpdatePromotionModal from './UpdatePromotionModal';
import { useGetPromotionByIdQuery } from '../../../services/promotionAPI';
import axios from 'axios';
import { PROMOTION_API } from '../../../config';

export default function PromotionList({ promotionData = [], handleEditPromotion }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promotionSelected, setPromotionSelected] = useState(null);
    const [open, setOpen] = useState(Array(promotionData.length).fill(false));
    const [mode, setMode] = useState('');

    const handlePopoverVisibleChange = (index, visible) => {
        setOpen({ ...open, [index]: visible });
    };

    useEffect(() => {
        if (promotionSelected && mode === 'delete') {
            axios.get(PROMOTION_API + `/api/v1/promotions/${promotionSelected}`).then(res => {
                const formatData = {
                    ...res.data,
                    PromotionStatuses: "Deleted"
                }
                // console.log(formatData);
                handleEditPromotion(formatData, mode);
            })
        }
    }, [promotionSelected, mode])

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            width: '1%',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Promotion Code',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Start date',
            dataIndex: 'startdate',
            key: 'startdate',
        }, {
            title: 'End date',
            dataIndex: 'enddate',
            key: 'enddate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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
                                <div>
                                    <EyeOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text">
                                        <p>View Promotion Detail</p>
                                    </Button>
                                </div>
                                <div>
                                    <DeleteOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => {
                                        setPromotionSelected(record.id);
                                        setMode('delete')
                                    }}>
                                        <p>Delete Promotion</p>
                                    </Button>
                                </div>
                                <div>
                                    <EditOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => {
                                        setIsModalOpen(true);
                                        handlePopoverVisibleChange(index, false);
                                        setPromotionSelected(record.id);
                                        setMode('update');
                                    }}>
                                        <p>Edit Promotion</p>
                                    </Button>
                                </div>
                            </div>
                        }
                        trigger="click"
                        open={open[index]}
                        placement="bottomRight"
                        onOpenChange={(visible) => handlePopoverVisibleChange(index, visible)}
                    >
                        <Button type="text"><TfiMoreAlt /></Button>
                    </Popover>
                </ConfigProvider>
            ),
        },
    ];

    const data = promotionData.map((item, index) => ({
        key: index + 1,
        id: item?.id,
        name: item?.PromotionCode,
        discount: item?.DiscountPercentage ? item?.DiscountPercentage : item?.FixedDiscountAmount,
        startdate: convertTimeStampToDateString(item?.StartDate),
        enddate: convertTimeStampToDateString(item?.EndDate),
        status: item?.PromotionStatuses,
    }));

    return (
        <>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            <UpdatePromotionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} promotionSelected={promotionSelected} setPromotionSelected={setPromotionSelected} handleEditPromotion={handleEditPromotion} />
        </>
    );
}
