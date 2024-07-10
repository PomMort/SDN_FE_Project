import React from "react";
import { Flex, Table } from "antd";

export default function OrderTable({ order }) {
  const products = order.orderDetails.products;
  const data = products.map((item, index) => {
    return {
      key: index,
      no: index + 1,
      product_name: item.productId.name,
      product_id: item.productId._id,
      product_image: item.productId.image,
      quantity: item.quantity,
      price: item.productId.price,
      category: item.productId.categoryId.name,
      totalPrice: item.quantity * item.productId.price,
    };
  });

  const subtotal = data.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountTotal = (order?.discount?.percent * subtotal) / 100 || 0;

  let total = subtotal - discountTotal;
  if (total < 0) {
    total = 0;
  }

  const columns = [
    {
      title: "No.",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.product_image}
            alt={record.product_name}
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span>{record.product_name}</span>
        </div>
      ),
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VNĐ`,
    },

    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VNĐ`,
    },
  ];

  return (
    <div style={{ marginTop: 10 }}>
      <h3 style={{ fontWeight: 400 }}>Product</h3>
      <hr />
      <Table columns={columns} dataSource={data} pagination={false} />
      <br />
      <div className="border-total-detail">
        <Flex align="center" justify="space-between">
          <div>Sub total:</div>
          <div>{subtotal.toLocaleString()} VNĐ</div>
        </Flex>
        <Flex align="center" justify="space-between">
          <div>Discount: </div>
          {order.discount ? (
            <>
              <div>{order.discount.percent} %</div>
            </>
          ) : (
            <>
              <div>0 VNĐ</div>
            </>
          )}
        </Flex>
        <Flex style={{ color: "red" }} align="center" justify="space-between">
          <div>Total:</div>
          <div>{total.toLocaleString()} VNĐ</div>
        </Flex>
      </div>
    </div>
  );
}
