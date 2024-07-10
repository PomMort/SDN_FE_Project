import React, { useState, useEffect } from "react";
import { Button, Input, message } from "antd";
import CustomerInformation from "./CustomerInformation";
import ProductSpace from "./ProductSpace";
import CartSpace from "./CartSpace";
import CheckoutPage from "./CheckoutPage"; // New component
import "./Sell.css";
import { useGetAllCustomersQuery } from "../../../services/customerAPI";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../slices/auth.slice";
import { useGetProductsQuery } from "../../../services/productAPI";
import {
  useGetPromotionByIdQuery,
  useLazyGetPromotionByCodeQuery,
} from "../../../services/promotionAPI";

const { Search } = Input; // Destructure Search from Input for clarity

export default function Sell() {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const [step, setStep] = useState(1); // 1 for Sell, 2 for Checkout
  const [promotionCode, setPromotionCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const {
    data: customerData,
    refetch: refetchCustomers,
    isFetching: isFetchingCustomers,
  } = useGetAllCustomersQuery();
  const {
    data: productData,
    refetch: refetchProducts,
    isFetching: isFetchingProducts,
  } = useGetProductsQuery();

  const [useCode, { data: promotionData }] = useLazyGetPromotionByCodeQuery();

  const auth = useSelector(selectAuth);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const onSearch = (value) => {
    if (!value) {
      message.warning("Please enter a customer phone number.");
      return;
    }

    console.log("Searching customer by phone:", value);
    console.log(customerData);
    const customer = customerData?.data.find((cust) => cust.phone === value);
    if (customer) {
      setCustomerInfo(customer);
      message.success("Customer found!");
    } else {
      message.error("Customer not found.");
    }
  };

  const handleApplyPromotion = async () => {
    if (!promotionCode) {
      message.warning("Please enter a promotion code.");
      return;
    }

    try {
      const result = await useCode(promotionCode).unwrap();
      if (result) {
        setDiscount(result.percent);
        message.success("Promotion applied successfully!");
      } else {
        setDiscount(0);
        message.error("Invalid or expired promotion code.");
      }
    } catch (error) {
      setDiscount(0);
      message.error("Error applying promotion code.");
    }
  };

  const handleCheckout = () => {
    setStep(2); // Move to checkout step
  };

  const handleBack = () => {
    setStep(1); // Move to sell step
  };

  const handleCreateCustomer = () => {
    console.log("Add customer ");
  };

  const handleSubmit = async () => {
    if (!customerInfo._id) {
      message.warning("Please select or create a customer.");
      return;
    }

    const payload = {
      customerId: customerInfo._id, // Ensure customerInfo._id is valid
      discount, // Add your discount logic here
      status: 1,
      products: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    console.log(payload);
    try {
      const response = await fetch("/your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Sale successfully submitted!");
        // Reset cart and customer info if needed
        setCart([]);
        setCustomerInfo({});
        setStep(1);
      } else {
        message.error("Failed to submit sale.");
      }
    } catch (error) {
      console.error("Error submitting sale:", error);
      message.error("An error occurred while submitting the sale.");
    }
  };

  useEffect(() => {
    // Fetch customers and products on component mount or whenever needed
    refetchCustomers();
    refetchProducts();
  }, [refetchCustomers, refetchProducts]);

  return (
    <div className="sell-page">
      {step === 1 && (
        <>
          <div className="header">
            <h1 className="title">Make Sold</h1>
          </div>
          <div className="body">
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
                <Button onClick={handleCreateCustomer}>Create Customer</Button>
              </div>
              <div className="action-left">
                <Input
                  style={{ borderRadius: 20, width: 300 }}
                  placeholder="Enter promotion code..."
                  value={promotionCode}
                  onChange={(e) => setPromotionCode(e.target.value)}
                />
                <Button onClick={handleApplyPromotion}>Apply Promotion</Button>
              </div>
            </div>
            <div className="customer-information">
              <CustomerInformation customerInfo={customerInfo} />
            </div>
            <div className="product-space">
              {productData ? (
                <ProductSpace
                  products={productData}
                  onAddToCart={handleAddToCart}
                />
              ) : (
                <div>Loading products...</div>
              )}
            </div>
            <div className="cart-information">
              <CartSpace cart={cart} setCart={setCart} discount={discount} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleCheckout} type="primary">
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <CheckoutPage
            customerInfo={customerInfo}
            cart={cart}
            setCart={setCart}
            discount={discount}
          />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleBack} type="primary">
              Back Add to Cart
            </Button>
            <Button onClick={handleSubmit} type="primary">
              Make Sell
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
