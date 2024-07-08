import React from "react";
import { Table, Button } from "antd";

export default function ProductInformation() {
  // Sample data for the products
  const products = [
    {
      key: "1",
      name: "Product 1",
      description: "Description of Product 1",
      price: "$100.00",
      stock: "In Stock",
    },
    {
      key: "2",
      name: "Product 2",
      description: "Description of Product 2",
      price: "$150.00",
      stock: "Out of Stock",
    },
    {
      key: "3",
      name: "Product 3",
      description: "Description of Product 3",
      price: "$200.00",
      stock: "In Stock",
    },
    // Add more products as needed
  ];

  // Define the columns for the table
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock Status",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <Button type="primary">Make Buy Back</Button>,
    },
  ];

  return (
    <div>
      <br />
      <Table dataSource={products} columns={columns} />
    </div>
  );
}
