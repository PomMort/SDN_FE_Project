import React from "react";
import { Button, Card, Divider, Row, Col, message, Input } from "antd";
import "./Sell.css";

const { Search } = Input;

export default function CheckoutPage({
  customerInfo,
  cart,
  setCart,
  promotionCode,
  setPromotionCode,
  discount,
  handleApplyPromotion,
}) {
  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Handle quantity change
  const handleQuantityChange = (id, delta) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + delta } : item
    );
    setCart(updatedCart);
  };

  // Handle product removal
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    message.success("Item removed from cart");
  };

  // Calculate total after discount
  const totalAfterDiscount = totalPrice - (totalPrice * discount) / 100;

  return (
    <>
      <div className="header">
        <h1 className="title">Checkout</h1>
      </div>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <p className="title-checkout">Products</p>
          {cart.map((product) => (
            <Card key={product._id} style={{ marginBottom: 2 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div style={{ flex: 1 }}>
                  <p>{product.name}</p>
                  <p>{product.price} VNĐ</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    onClick={() => handleQuantityChange(product._id, -1)}
                    disabled={product.quantity <= 1}
                  >
                    -
                  </Button>
                  <span style={{ margin: "0 10px" }}>{product.quantity}</span>
                  <Button onClick={() => handleQuantityChange(product._id, 1)}>
                    +
                  </Button>
                </div>
                <div>
                  <Button type="link" onClick={() => handleRemove(product._id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </Col>
        <Col span={10} offset={2}>
          <div className="cart-information">
            <p className="title-checkout">Customer Information</p>
            <Card>
              <p>Name: {customerInfo.name}</p>
              <p>Phone: {customerInfo.phone}</p>
              <p>Address: {customerInfo.address}</p>
              <br />
              <Search
                style={{ borderRadius: 20, width: "100%" }}
                placeholder="Search promotion code..."
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
                onSearch={handleApplyPromotion}
                enterButton
              />
              <p>Subtotal: {totalPrice} VNĐ</p>
              <p>Discount: {discount}%</p>
              <p>Total: {totalAfterDiscount} VNĐ</p>
            </Card>
          </div>
        </Col>
      </Row>
      <Divider />
    </>
  );
}
