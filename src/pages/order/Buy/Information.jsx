import { Badge, Descriptions } from "antd";
import React from "react";

export default function Information() {
  const items = [
    {
      key: "1",
      label: "Billing Date",
      children: "06/06/2024",
    },
    {
      key: "2",
      label: "Customer Name",
      children: "Tien Loc",
    },
    {
      key: "3",
      label: "Type",
      children: "Selling",
    },
    {
      key: "5",
      label: "Customer Phone",
      children: "0987654321",
    },
    {
      key: "4",
      label: "Make by",
      children: "Doraemon",
    },
    {
      key: "6",
      label: "Status",
      children: <Badge status="processing" text="Sold" />,
    },
    {
      key: "7",
      label: "Total Amount",
      children: "$100.00",
    },
    {
      key: "8",
      label: "Discount",
      children: "$10.00",
    },
    {
      key: "9",
      label: "Amount Due",
      children: "$90.00",
    },
  ];

  return (
    <div>
      <br />
      <div className="description">
        <Descriptions bordered items={items} />
      </div>
    </div>
  );
}
