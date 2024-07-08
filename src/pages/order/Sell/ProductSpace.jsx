import React, { useState } from "react";
import { Table, Button, message, Input } from "antd";

const { Search } = Input;

const products = [
  {
    id: 1,
    name: "Product 1",
    imageUrl: "https://via.placeholder.com/150",
    price: 100,
    description: "This is product 1",
    barcode: "1234567890123",
  },
  {
    id: 2,
    name: "Product 2",
    imageUrl: "https://via.placeholder.com/150",
    price: 150,
    description: "This is product 2",
    barcode: "1234567890124",
  },
  {
    id: 3,
    name: "Product 3",
    imageUrl: "https://via.placeholder.com/150",
    price: 200,
    description: "This is product 3",
    barcode: "1234567890125",
  },
  // Add more products as needed
];

export default function ProductSpace({ onAddToCart }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const onSearch = (value) => {
    const filtered = products.filter((product) =>
      product.barcode.includes(value)
    );
    setFilteredProducts(filtered);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) => <img src={text} alt="Product" style={{ width: 50 }} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => onAddToCart(record)}>
          Add to Cart
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>
      <Search
        placeholder="Search by barcode"
        enterButton="Search"
        size="small"
        onSearch={onSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
