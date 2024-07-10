import React, { useState } from "react";
import { Table, Button, message } from "antd";

export default function CartSpace({ cart, setCart }) {
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    message.success("Item removed from cart");
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + delta } : item
    );
    setCart(updatedCart);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" style={{ width: 50 }} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text} VNĐ`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => handleQuantityChange(record._id, -1)}
            disabled={record.quantity <= 1}
          >
            -
          </Button>
          <span style={{ margin: "0 10px" }}>{record.quantity}</span>
          <Button onClick={() => handleQuantityChange(record._id, 1)}>+</Button>
        </div>
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (text, record) => `${record.price * record.quantity} VNĐ`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="danger" onClick={() => handleRemove(record._id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>
      <Table
        columns={columns}
        dataSource={cart}
        rowKey="productId"
        summary={(pageData) => {
          let totalAmount = 0;
          pageData.forEach(({ price, quantity }) => {
            totalAmount += price * quantity;
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={4}>Total</Table.Summary.Cell>
              <Table.Summary.Cell>{`${totalAmount} VNĐ`}</Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
}
