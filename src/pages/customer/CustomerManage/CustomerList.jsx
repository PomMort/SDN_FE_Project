import { Dropdown, Menu, Popconfirm, Space, Table } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { RiUserFill } from "@remixicon/react";
import { useNavigate } from 'react-router-dom';
import { useDeleteCustomerMutation } from "../../../services/customerAPI";
import { notification } from "antd";

export default function CustomerList({ customerData, loading, handleEdit, refetch }) {
  const [deleteCustomer] = useDeleteCustomerMutation();
  const navigate = useNavigate();

  const handleRemoveCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId).unwrap();
      notification.success({
        message: "Customer removed successfully!",
      });
      refetch();
    } catch (error) {
      notification.error({
        message: "Failed to remove customer",
        description: error.message,
      });
    }
  };

  const processedData = customerData?.map((customer, index) => ({
    ...customer,
    no: index + 1,
  }));

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="detail"
        className="submenu-usertable"
        onClick={() => navigate(`/view-customer-detail/${record.id}`)}
      >
        <span>View Detail</span>
      </Menu.Item>

      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => handleEdit(record)}
      >
        <span>Edit Customer</span>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: <div style={{ textAlign: "center" }}>Gender</div>,
      dataIndex: "gender", 
      key: "gender",
      render: (gender) => (
        <div style={{ textAlign: "center" }}>
          <i 
            className="ri-user-fill" 
            style={{ color: gender === true ? "#4f6c95" : "#cc5e58" }}
          >
            <RiUserFill />
          </i>
        </div>
      ),
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
      <Table
        dataSource={processedData}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
