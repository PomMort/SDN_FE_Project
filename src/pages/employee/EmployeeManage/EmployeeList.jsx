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

  console.log(employeesData);
  const dataWithNo = employeesData?.map((item, index) => ({
    ...item,
    no: index + 1,
  }));
  console.log(dataWithNo);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      // align: "right",
      key: "no",
      width: 55,
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "left",
      key: "name",
    },
    {
      title: "Email",
      align: "left",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Counter",
      dataIndex: "counterName",
      key: "CounterName",
      render: (counterName) => (counterName ? `${counterName}` : "No Counter"),
    },
    {
      title: "Gender",
      dataIndex: "employeeGender",
      align: "center",
      key: "gender",
      render: (employeeGender) =>
        employeeGender === 0 ? (
          <i className="ri-user-fill" style={{ color: "#4f6c95" }}>
            <RiUserFill />
          </i>
        ) : (
          <i className="ri-user-fill" style={{ color: "#cc5e58" }}>
            <RiUserFill />
          </i>
        ),
    },
    {
      title: "Role",
      dataIndex: "roleId",
      align: "center",
      key: "roleId",
      render: (roleId) => (
        <Tag
          color={
            roleId === 1
              ? "green"
              : roleId === 2
              ? "gold"
              : roleId === 3
              ? "geekblue"
              : roleId === 4
              ? "cyan"
              : "warning"
          }
        >
          {roleId === 1
            ? "Super Admin"
            : roleId === 2
            ? "Admin"
            : roleId === 3
            ? "Manager"
            : roleId === 4
            ? "Staff"
            : "NaN"}
        </Tag>
      ),
    },
    {
      title: "Status",
      align: "center",
      key: "Status",
      dataIndex: "employeeStatus",
      render: (employeeStatus) => (
        <Tag
          color={
            employeeStatus === 0
              ? "green-inverse"
              : employeeStatus === 1
              ? "orange-inverse"
              : employeeStatus === 2
              ? "#333333"
              : employeeStatus === 3
              ? "volcano-inverse"
              : "#000000"
          }
        >
          {employeeStatus === 0
            ? "Active"
            : employeeStatus === 1
            ? "Inactive"
            : employeeStatus === 2
            ? "Unassign"
            : employeeStatus === 3
            ? "Deleted"
            : "NaN"}
        </Tag>
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
