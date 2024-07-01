import React, { useEffect, useState } from "react";
import "./Counter.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreateProduct from "../../components/ButtonFilter/ButtonCreate";
import CounterList from "./CounterManage/CounterList";
import { useGetAllCountersQuery } from "../../services/counterAPI";

export default function Counter() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { data: counterData, refetch, isFetching } = useGetAllCountersQuery();

  useEffect(() => {
    if (!isFetching && counterData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isFetching, counterData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCounter = counterData?.filter((customer) =>
    customer.Location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleCreate = async (values) => {
  //   setLoading(true);
  //   try {
  //     await createCustomer(values).unwrap();
  //     refetch();
  //     setIsCreateModalVisible(false);
  //   } catch (error) {
  //     console.error("Failed to create customer:", error);
  //   }
  //   setLoading(false);
  // };

  // const handleUpdate = async (values) => {
  //   setLoading(true);
  //   try {
  //     await updateCustomer(values).unwrap();
  //     refetch();
  //     setIsUpdateModalVisible(false);
  //   } catch (error) {
  //     console.error("Failed to update customer:", error);
  //   }
  //   setLoading(false);
  // };

  // const handleEdit = (customer) => {
  //   console.log(customer);
  //   setSelectedCustomer(customer);
  //   setIsUpdateModalVisible(true);
  // };

  return (
    <div className="counter-manage-page">
      <div className="header">
        <h1 className="title">Counter Management</h1>
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
            <ButtonCreateProduct contentBtn={"Create Counter"} />
          </div>
        </div>
      </div>
      <div className="Customer-list">
        <CounterList
          counterData={filteredCounter}
          loading={loading}
          // handleEdit={handleEdit}
        />
      </div>
      {/* <CreateCustomerModal
        visible={isCreateModalVisible}
        onCreate={handleCreate}
        onCancel={() => setIsCreateModalVisible(false)}
        loading={loading}
      />
      <UpdateCustomerModel
        visible={isUpdateModalVisible}
        onCreate={handleUpdate}
        onCancel={() => setIsUpdateModalVisible(false)}
        loading={loading}
        customer={selectedCustomer}
      /> */}
    </div>
  );
}
