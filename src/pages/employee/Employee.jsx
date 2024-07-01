import React, { useEffect, useState } from "react";
import "./Employee.css";
import { Button, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreate from "../../components/ButtonFilter/ButtonCreate";
import CreateEmployeeModal from "./EmployeeManage/CreateEmployeeModal";
import {
  useAddEmployeeMutation,
  useChangeEmployeeStatusToActiveMutation,
  useChangeEmployeeStatusToDeletedMutation,
  useChangeEmployeeStatusToInactiveMutation,
  useRemoveEmployeeMutation,
  useGetAllEmployeeQuery,
  useUpdateEmployeeMutation,
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
  const [activeEmployee, { isLoading: isLoadingActive }] =
    useChangeEmployeeStatusToActiveMutation();
  const [inactiveEmployee, { isLoading: isLoadingInactivee }] =
    useChangeEmployeeStatusToInactiveMutation();
  const [deletedEmployee, { isLoading: isLoadingDeleted }] =
    useChangeEmployeeStatusToDeletedMutation();

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

  const filteredEmployees = employeesData?.filter(
    (employee) =>
      employee.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Phone.includes(searchQuery)
  );

  const handleCreateEmployee = async (values) => {
    console.log(values);
    try {
      await addEmployee(values).unwrap();
      message.success("Employee created successfully");
      setIsCreateModalVisible(false);
      refetch();
    } catch (error) {
      message.error("Failed to create employee");
    }
  };

  const handleUpdateEmployee = async (values) => {
    console.log(values);

    try {
      await updateEmployee({
        id: selectedEmployee.EmployeeId,
        ...values,
      }).unwrap();
      message.success("Employee updated successfully");
      setIsUpdateModalVisible(false);
      refetch();
    } catch (error) {
      message.error("Failed to update employee");
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
  const handleActiveEmployee = async (value) => {
    try {
      await activeEmployee(value).unwrap(); // Call the deleteEmployee mutation with the selected employee's ID
      message.success("Employee active successfully");
      refetch();
    } catch (error) {
      message.error("Failed to active employee");
    }
  };
  const handleInactiveEmployee = async (value) => {
    try {
      await inactiveEmployee(value).unwrap(); // Call the deleteEmployee mutation with the selected employee's ID
      message.success("Employee inactive successfully");
      refetch();
    } catch (error) {
      message.error("Failed to inactive employee");
    }
  };
  const handleDeletedEmployee = async (value) => {
    try {
      await deletedEmployee(value).unwrap(); // Call the deleteEmployee mutation with the selected employee's ID
      message.success("Employee deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to deleted employee");
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
          handleActiveEmployee={handleActiveEmployee}
          handleInactiveEmployee={handleInactiveEmployee}
          handleDeletedEmployee={handleDeletedEmployee}
        />
      </div>
      <CreateEmployeeModal
        visible={isCreateModalVisible}
        onCreate={handleCreateEmployee}
        onCancel={() => setIsCreateModalVisible(false)}
        loading={isLoadingAdd}
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
