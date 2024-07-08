import { Button, Dropdown, Menu, Popconfirm, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

export default function OrderList({ orderData, loading }) {
  const navigate = useNavigate();
  const dataWithNo = orderData?.map((order, index) => ({
    ...order,
    no: index + 1,
  }));

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="detail"
        className="submenu-usertable"
        onClick={() => navigate(`/employee/${record.EmployeeId}`)}
      >
        <span>View Detail</span>
      </Menu.Item>
      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => onEditEmployee(record)}
      >
        <span>Edit Employee</span>
      </Menu.Item>
      <Menu.Item key="remove">
        <Popconfirm
          title="Are you sure you want to remove this user?"
          onConfirm={() => handleRemoveEmployee(record.EmployeeId)}
          okText="Yes"
          cancelText="No"
        >
          <p className="submenu-usertable-dropdown-delete">
            <span>Remove employee</span>
          </p>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 55,
    },
    {
      title: <div style={{ textAlign: "start" }}>Order Id</div>,
      dataIndex: "OrderId",
      key: "orderId",
    },
    {
      title: <div style={{ textAlign: "start" }}>Employee Id</div>,
      dataIndex: "EmployeeId",
      key: "EmployeeId",
    },
    {
      title: <div style={{ textAlign: "start" }}>Date</div>,
      dataIndex: "OrderDate",
      key: "date",
      render: (OrderDate) => dayjs(OrderDate).format("DD/MM/YYYY"),
    },
    {
      title: <div style={{ textAlign: "center" }}>Type</div>,
      dataIndex: "Type",
      key: "type",
      render: (Type) => (
        <div style={{ textAlign: "center" }}>
          <Tag color={Type === 0 ? "gold" : Type === 1 ? "green" : "warning"}>
            {Type === 0 ? "Buy Back" : Type === 1 ? "Selling" : "NaN"}
          </Tag>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      key: "status",
      dataIndex: "OrderStatus",
    },
    {
      width: 55,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={actionsMenu(record)} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreHorizIcon style={{ color: "#333333" }} />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginTop: 10 }}>
        <Table
          columns={columns}
          dataSource={dataWithNo}
          rowKey="id"
          pagination={{ pageSize: 4 }}
          loading={loading}
        />
      </div>
    </div>
  );
}
