import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InformationCustomer from "./InformationCustomer";
import "../Order.css";
import OrderTable from "./OrderTable";
import { Button, Spin } from "antd";
import { useGetOrderDetailQuery } from "../../../services/orderAPI";

export default function OrderDetail() {
  const { id } = useParams();
  const { data: order } = useGetOrderDetailQuery(id);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (order) {
      setIsLoading(false);
    }
  }, [order]);

  if (isLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }
  console.log(order);

  const handleBackOrder = () => {
    navigate("/order");
  };

  return (
    <div className="order-manage-page">
      <div className="header">
        <h1 className="title">Order Detail</h1>
        <hr />
      </div>
      <div className="information">
        <InformationCustomer order={order} />
      </div>
      <div className="order-space">
        <OrderTable order={order} />
      </div>

      <div className="d-flex-center" style={{ marginTop: 20 }}>
        <div>
          <Button type="primary" size="large" onClick={handleBackOrder}>
            Back
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
