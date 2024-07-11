import {
  Space,
  Table,
  Tag,
  Button,
  Popover,
  ConfigProvider,
  Switch,
} from "antd";
import React, { useState } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { convertTimeStampToDateString } from "../../../utils/utils";
import UpdatePromotionModal from "./UpdatePromotionModal";
import { ApprovalOutlined } from "@mui/icons-material";

export default function PromotionList({
  promotionData,
  handleEditPromotion,
  handleStatusChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotionSelected, setPromotionSelected] = useState(null);

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: "1%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Promotion Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Promotion Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      align: "end",
      key: "discount",
      render: (discount) => <>{discount} %</>,
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      align: "center",
      key: "start_date",
    },
    {
      title: "End date",
      dataIndex: "end_date",
      align: "center",
      key: "end_date",
    },
    {
      title: "Status",
      align: "center",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === true ? "green-inverse" : "volcano-inverse"}>
          {status === true ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <ConfigProvider
          theme={{
            components: {
              Popover: {
                zIndexPopup: "2000",
              },
            },
          }}
        >
          <Popover
            content={
              <div
                className="pop-up"
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                {/* <div>
                  <DeleteOutlined style={{ paddingRight: "8px" }} />
                  <Button
                    type="text"
                    onClick={() => {
                      setPromotionSelected(record.id);
                      // Implement delete functionality here
                    }}
                  >
                    <p>Delete Promotion</p>
                  </Button>
                </div> */}
                {/* <div>
                  <EditOutlined style={{ paddingRight: "8px" }} />
                  <Button
                    type="text"
                    onClick={() => {
                      setIsModalOpen(true);
                      setPromotionSelected(record.id);
                    }}
                  >
                    <p>Edit Promotion</p>
                  </Button>
                </div> */}
                <div>
                  <ApprovalOutlined style={{ paddingRight: "8px" }} />

                  <Button
                    type="text"
                    onClick={() => handleStatusChange(record.id, true)}
                    disabled={record.status === true}
                  >
                    <p>Activate Promotion</p>
                  </Button>
                </div>
                <div>
                  <DeleteOutlined style={{ paddingRight: "8px" }} />

                  <Button
                    type="text"
                    onClick={() => handleStatusChange(record.id, false)}
                    disabled={record.status === false}
                  >
                    <p>Deactivate Promotion</p>
                  </Button>
                </div>
              </div>
            }
            trigger="click"
            placement="bottomRight"
          >
            <Button type="text">
              <TfiMoreAlt />
            </Button>
          </Popover>
        </ConfigProvider>
      ),
    },
  ];

  const data = promotionData?.map((item, index) => ({
    key: index + 1,
    id: item?._id,
    name: item?.name,
    code: item?.code,
    discount: item?.percent,
    start_date: convertTimeStampToDateString(item?.StartDate),
    end_date: convertTimeStampToDateString(item?.EndDate),
    status: item?.status,
  }));

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <UpdatePromotionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        promotionSelected={promotionSelected}
        setPromotionSelected={setPromotionSelected}
        handleEditPromotion={handleEditPromotion}
      />
    </>
  );
}
