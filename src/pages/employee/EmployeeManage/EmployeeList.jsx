import { Space, Table, Tag, Dropdown, Menu, Popconfirm } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { RiUserFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

export default function EmployeeList({
  employeesData,
  onEditEmployee,
  handleRemoveEmployee,
  handleInactiveEmployee,
  handleActiveEmployee,
  handleDeletedEmployee,
  loading,
}) {
  const navigate = useNavigate();
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

      {record.Status === 0 ? (
        <>
          <Menu.Item key="inactive" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to inactive this user?"
              onConfirm={() => handleInactiveEmployee(record.EmployeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Inactive</span>
            </Popconfirm>
          </Menu.Item>
          <Menu.Item key="deleted" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDeletedEmployee(record.EmployeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Deleted</span>
            </Popconfirm>
          </Menu.Item>
        </>
      ) : record.Status === 1 ? (
        <>
          <Menu.Item key="active" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to activate this user?"
              onConfirm={() => handleActiveEmployee(record.EmployeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Active</span>
            </Popconfirm>
          </Menu.Item>
          <Menu.Item key="deleted" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDeletedEmployee(record.EmployeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Deleted</span>
            </Popconfirm>
          </Menu.Item>
        </>
      ) : record.Status === 3 ? (
        <>
          <Menu.Item key="active" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to activate this user?"
              onConfirm={() => handleActiveEmployee(record.EmployeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Active</span>
            </Popconfirm>
          </Menu.Item>
          <Menu.Item key="inactive" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to inactive this user?"
              onConfirm={() => handleInactiveEmployee(record.EmployeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Inactive</span>
            </Popconfirm>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="active" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to activate this user?"
              onConfirm={() => handleActiveEmployee(record.EmployeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Active</span>
            </Popconfirm>
          </Menu.Item>
          <Menu.Item key="inactive" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to inactive this user?"
              onConfirm={() => handleInactiveEmployee(record.EmployeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Inactive</span>
            </Popconfirm>
          </Menu.Item>
          <Menu.Item key="deleted" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDeletedEmployee(record.EmployeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Deleted</span>
            </Popconfirm>
          </Menu.Item>
        </>
      )}

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

  const dataWithNo = employeesData?.map((item, index) => ({
    ...item,
    no: index + 1,
  }));
  console.log(dataWithNo);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 55,
    },
    {
      title: <div style={{ textAlign: "start" }}>Name</div>,
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: <div style={{ textAlign: "start" }}>Email</div>,
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
    },
    {
      title: "Counter",
      dataIndex: "CounterId",
      key: "CounterId",
      render: (CounterId) => (CounterId ? `${CounterId}` : "No Counter"),
    },
    {
      title: <div style={{ textAlign: "center" }}>Gender</div>,
      dataIndex: "Gender",
      key: "Gender",
      render: (Gender) =>
        Gender === 0 ? (
          <div style={{ textAlign: "center" }}>
            <i className="ri-user-fill" style={{ color: "#4f6c95" }}>
              <RiUserFill />
            </i>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <i className="ri-user-fill" style={{ color: "#cc5e58" }}>
              <RiUserFill />
            </i>
          </div>
        ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Role</div>,
      dataIndex: "RoleId",
      key: "RoleId",
      render: (RoleId) => (
        <div style={{ textAlign: "center" }}>
          <Tag
            color={
              RoleId === 1
                ? "green"
                : RoleId === 2
                ? "gold"
                : RoleId === 3
                ? "geekblue"
                : "warning"
            }
          >
            {RoleId === 1
              ? "Admin"
              : RoleId === 2
              ? "Manager"
              : RoleId === 3
              ? "Staff"
              : "NaN"}
          </Tag>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      key: "Status",
      dataIndex: "Status",
      render: (Status) => (
        <div style={{ textAlign: "center" }}>
          <Tag
            color={
              Status === 0
                ? "green-inverse"
                : Status === 1
                ? "orange-inverse"
                : Status === 2
                ? "#333333"
                : Status === 3
                ? "volcano-inverse"
                : "#000000"
            }
          >
            {Status === 0
              ? "Active"
              : Status === 1
              ? "Inactive"
              : Status === 2
              ? "Unassign"
              : Status === 3
              ? "Deleted"
              : "NaN"}
          </Tag>
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
    <Table
      columns={columns}
      dataSource={dataWithNo}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      loading={loading}
    />
  );
}
