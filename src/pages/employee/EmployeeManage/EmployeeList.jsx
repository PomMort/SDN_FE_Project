import { Space, Table, Tag, Dropdown, Menu, Popconfirm } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { RiUserFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

export default function EmployeeList({
  employeesData,
  onEditEmployee,
  handleRemoveEmployee,
  handleActiveEmployee,
  loading,
}) {
  const navigate = useNavigate();
  const actionsMenu = (record) => (
    <Menu align="center">
      <Menu.Item
        key="detail"
        className="submenu-usertable"
        onClick={() => navigate(`/employee/${record._id}`)}
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

      {record.status == true ? (
        <>
          <Menu.Item key="inactive" className="submenu-usertable">
            <Popconfirm
              style={{ width: "100%" }}
              title="Are you sure you want to inactive this user?"
              onConfirm={() => handleActiveEmployee(record._id)}
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
              style={{ width: "100%" }}
              title="Are you sure you want to activate this user?"
              onConfirm={() => handleActiveEmployee(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <span>Active</span>
            </Popconfirm>
          </Menu.Item>
        </>
      )}

      <Menu.Item key="remove">
        <Popconfirm
          title="Are you sure you want to remove this user?"
          onConfirm={() => handleRemoveEmployee(record._id)}
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

  // console.log(employeesData);
  const dataWithNo = employeesData?.map((item, index) => ({
    ...item,
    no: index + 1,
  }));
  // console.log(dataWithNo);

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
      title: "Gender",
      dataIndex: "gender",
      align: "center",
      key: "gender",
      render: (gender) =>
        gender === false ? (
          <i className="ri-user-fill" style={{ color: "#4f6c95" }}>
            <RiUserFill />
          </i>
        ) : (
          <i className="ri-user-fill" style={{ color: "#cc5e58" }}>
            <RiUserFill />
          </i>
        ),
    },
    // {
    //   title: "Role",
    //   dataIndex: "roleId",
    //   align: "center",
    //   key: "roleId",
    //   render: (roleId) => (
    //     <Tag
    //       color={
    //         roleId === 1
    //           ? "green"
    //           : roleId === 2
    //           ? "gold"
    //           : roleId === 3
    //           ? "geekblue"
    //           : roleId === 4
    //           ? "cyan"
    //           : "warning"
    //       }
    //     >
    //       {roleId === 1
    //         ? "Super Admin"
    //         : roleId === 2
    //         ? "Admin"
    //         : roleId === 3
    //         ? "Manager"
    //         : roleId === 4
    //         ? "Staff"
    //         : "NaN"}
    //     </Tag>
    //   ),
    // },
    {
      title: "Status",
      align: "center",
      key: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === true ? "green-inverse" : "volcano-inverse"}>
          {status === true ? "Active" : "Inactive"}
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
