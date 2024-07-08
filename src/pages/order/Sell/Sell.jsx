import React, { useState } from "react";
import { Button, Input } from "antd";
import Search from "antd/es/input/Search";
import CustomerInformation from "./CustomerInformation";
import ProductSpace from "./ProductSpace";
import CartSpace from "./CartSpace";
import CheckoutPage from "./CheckoutPage"; // New component
import "./Sell.css";

export default function Sell() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1); // 1 for Sell, 2 for Checkout

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const onSearch = (value) =>
    console.log("Searching customer by phone:", value);

  const handleCheckout = () => {
    setStep(2); // Move to checkout step
  };
  const handleCreateCustomer = () => {
    console.log("Add customer ");
  };

  return (
    <>
      <div className="sell-page">
        <div className="header">
          <h1 className="title">Make Sold</h1>
        </div>
        <div className="body">
          {step === 1 && (
            <>
              <div className="action">
                <div className="action-left">
                  <Search
                    style={{ borderRadius: 20, width: 300 }}
                    placeholder="Search by customer phone..."
                    onSearch={onSearch}
                    enterButton
                  />
                </div>
                <div className="action-left">
                  <Button onClick={handleCreateCustomer}>
                    Create Customer
                  </Button>
                </div>
              </div>
              <div className="customer-information">
                <CustomerInformation />
              </div>
              <div className="product-space">
                <ProductSpace onAddToCart={handleAddToCart} />
              </div>
              <div className="cart-information">
                <CartSpace cart={cart} setCart={setCart} />
              </div>
              <div className="checkout-button">
                <Button onClick={handleCheckout} type="primary">
                  Checkout
                </Button>
              </div>
            </>
          )}
          {step === 2 && <CheckoutPage customerInfo={{}} products={cart} />}
        </div>
      </div>
    </>
  );
}
