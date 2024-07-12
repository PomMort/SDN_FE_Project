import React, { useEffect, useState } from "react";
import "./Employee.css";
import { Button, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreate from "../../components/ButtonFilter/ButtonCreate";
import CreateEmployeeModal from "./EmployeeManage/CreateEmployeeModal";
import {
  useAddEmployeeMutation,
  useRemoveEmployeeMutation,
  useGetAllEmployeeQuery,
  useUpdateEmployeeMutation,
  useChangeEmployeeStatusMutation,
} from "../../services/employeeAPI";
import EmployeeList from "./EmployeeManage/EmployeeList";
import UpdateEmployeeModal from "./EmployeeManage/UpdateEmployeeModal";

export default function Employee() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { data: employeesData, refetch, isFetching } = useGetAllEmployeeQuery();
  const [addEmployee, { isLoading: isLoadingAdd }] = useAddEmployeeMutation();
  const [updateEmployee, { isLoading: isLoadingUpdate }] =
    useUpdateEmployeeMutation();
  const [removeEmployee, { isLoading: isLoadingRemove }] =
    useRemoveEmployeeMutation();
  const [changeStatus, { isLoading: isLoadingActive }] =
    useChangeEmployeeStatusMutation();

  useEffect(() => {
    if (!isFetching && employeesData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isFetching, employeesData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // console.log(employeesData);
  const filteredEmployees = employeesData?.data.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.phone.includes(searchQuery)
  );

  const handleCreateEmployee = async (values) => {
    try {
      const response = await addEmployee(values).unwrap();

      console.log(response);
      if (response.status === "success") {
        message.success("Employee created successfully");
        setIsCreateModalVisible(false);
        refetch();
      } else {
        console.log(response);

        message.error(response.error.description);
      }
    } catch (error) {
      console.log(error);
      message.error(error.data.description);
    }
  };

  const handleUpdateEmployee = async (values) => {
    try {
      const response = await updateEmployee({
        id: selectedEmployee.EmployeeId,
        ...values,
      }).unwrap();

      // Handle success response
      console.log(response); // Inspect the response object
      message.success("Employee updated successfully");
      setIsUpdateModalVisible(false);
      refetch();
    } catch (error) {
      console.error(error.data);
      if (error.data.status === "error") {
        message.error(error.data.description);
      } else {
        message.error("Failed to update employee");
      }
    }
  };

  const handleRemoveEmployee = async (value) => {
    try {
      await removeEmployee(value).unwrap(); // Call the deleteEmployee mutation with the selected employee's ID
      message.success("Employee remove successfully");
      setIsUpdateModalVisible(false);
      refetch();
    } catch (error) {
      message.error("Failed to remove employee");
    }
  };
  const handleChangeStatus = async (value) => {
    try {
      const response = await changeStatus(value).unwrap();
      message.success("Employee active successfully");
      refetch();
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <div className="employee-manage-page">
      <div className="header">
        <h1 className="title">Employee Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name or phone number"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="action-right">
          <div onClick={() => setIsCreateModalVisible(true)}>
            <ButtonCreate contentBtn={"Create User"} />
          </div>
        </div>
      </div>
      <div className="employee-list">
        <EmployeeList
          loading={loading}
          employeesData={filteredEmployees}
          onEditEmployee={(employee) => {
            setSelectedEmployee(employee);
            setIsUpdateModalVisible(true);
          }}
          handleRemoveEmployee={handleRemoveEmployee}
          handleActiveEmployee={handleChangeStatus}
        />
      </div>
      <CreateEmployeeModal
        visible={isCreateModalVisible}
        onCreate={handleCreateEmployee}
        onCancel={() => setIsCreateModalVisible(false)}
        loading={isLoadingAdd}
        employeesData={employeesData?.data}
      />
      <UpdateEmployeeModal
        visible={isUpdateModalVisible}
        onUpdate={handleUpdateEmployee}
        onCancel={() => setIsUpdateModalVisible(false)}
        loading={isLoadingUpdate}
        employee={selectedEmployee}
      />
    </div>
  );
}
