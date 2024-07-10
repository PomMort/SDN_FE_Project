import React, { useState } from "react";
import { Table, Button, message, Input, Modal } from "antd";

const { Search } = Input;

const ProductSpace = ({ products, onAddToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const onSearch = (value) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Product"
          style={{ width: 50, cursor: "pointer" }}
          onClick={() => {
            setSelectedProduct(image);
            setModalVisible(true);
          }}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
        placeholder="Search by product name"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Product Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedProduct && (
          <img src={selectedProduct} alt="Product" style={{ width: "100%" }} />
        )}
      </Modal>
    </div>
  );
};

export default ProductSpace;
