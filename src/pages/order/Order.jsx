import React, { useEffect, useState } from "react";
import "./Order.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreateProduct from "../../components/ButtonFilter/ButtonCreate";
import OrderList from "./OrderManage/OrderList";

export default function Order() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // const { data: customerData, refetch, isFetching } = useGetAllCustomersQuery();

  // useEffect(() => {
  //   if (!isFetching && customerData) {
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //   }
  // }, [isFetching, customerData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const filteredCustomer = customerData?.filter(
  //   (customer) =>
  //     customer.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     customer.Phone.includes(searchQuery)
  // );

  return (
    <div className="order-manage-page">
      <div className="header">
        <h1 className="title">Order Management</h1>
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
            <ButtonCreateProduct contentBtn={"Make Order"} />
          </div>
        </div>
      </div>
      <div className="Customer-list">
        <OrderList loading={loading} />
      </div>
    </div>
  );
}
