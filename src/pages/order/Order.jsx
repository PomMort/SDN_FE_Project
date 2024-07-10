import React, { useState, useMemo } from "react";
import "./Order.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreateProduct from "../../components/ButtonFilter/ButtonCreate";
import OrderList from "./OrderManage/OrderList";
import OrderModal from "./OrderManage/OrderModal";
import { useGetAllOrdersQuery } from "../../services/orderAPI";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: orderData,
    error: orderError,
    isLoading: isOrderLoading,
  } = useGetAllOrdersQuery();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const handleMakeOrderClick = () => {
  //   setIsCreateModalVisible(true);
  // };
  const handleMakeOrderClick = () => {
    navigate("/order/sell");
  };

  const handleCancel = () => {
    setIsCreateModalVisible(false);
  };

  const filteredOrderData = useMemo(() => {
    if (!orderData) return [];
    return orderData.filter((order) =>
      order._id.toString().includes(searchQuery)
    );
  }, [orderData, searchQuery]);

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
            placeholder="Search by Order ID"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="action-right">
          <div onClick={handleMakeOrderClick}>
            <ButtonCreateProduct contentBtn={"Make Order"} />
          </div>
        </div>
      </div>
      <div className="Customer-list">
        <OrderList orderData={filteredOrderData} loading={isOrderLoading} />
      </div>
      <OrderModal visible={isCreateModalVisible} onCancel={handleCancel} />
    </div>
  );
}
