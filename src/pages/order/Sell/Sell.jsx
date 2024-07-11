import React, { useState, useEffect } from "react";
import { Button, Input, message } from "antd";
import CustomerInformation from "./CustomerInformation";
import ProductSpace from "./ProductSpace";
import CartSpace from "./CartSpace";
import CheckoutPage from "./CheckoutPage";
import CreateCustomerModal from "./CreateCustomerModal"; // Import the modal
import "./Sell.css";
import { useGetAllCustomersQuery } from "../../../services/customerAPI";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../slices/auth.slice";
import { useGetProductsQuery } from "../../../services/productAPI";
import { useLazyGetPromotionByCodeQuery } from "../../../services/promotionAPI";
import { useAddOrderMutation } from "../../../services/orderAPI";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export default function Sell() {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const [step, setStep] = useState(1);
  const [promotionCode, setPromotionCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountId, setDiscountId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();
  const { data: customerData, refetch: refetchCustomers } =
    useGetAllCustomersQuery();
  const { data: productData, refetch: refetchProducts } = useGetProductsQuery();

  const [useCode] = useLazyGetPromotionByCodeQuery();
  const [addOrder] = useAddOrderMutation();

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
        setDiscountId(result._id);
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
    if (!customerInfo._id) {
      message.warning("Please select or create a customer.");
      return;
    }

    if (cart.length === 0) {
      message.warning("Your cart is empty. Please add products to your cart.");
      return;
    }

    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCreateCustomer = () => {
    setIsModalVisible(true); // Show the modal
  };

  const handleSubmit = async () => {
    if (!customerInfo._id) {
      message.warning("Please select or create a customer.");
      return;
    }

    const payload = {
      customerId: customerInfo._id,
      discount: discountId,
      status: 1,
      products: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    try {
      const response = await addOrder(payload);
      console.log(response);
      if (response.data) {
        message.success("Sale successfully!");
        setCart([]);
        setCustomerInfo({});
        setStep(1);
        navigate("/order");
      } else {
        message.error(response.error.data.message);
      }
    } catch (error) {
      console.log(error);
      console.error("Error submitting sale:", error);
      message.error("An error occurred while submitting the sale.");
    }
  };

  const handleCustomerCreate = (newCustomer) => {
    console.log(newCustomer);
    setCustomerInfo(newCustomer);
    refetchCustomers();
  };

  useEffect(() => {
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
            promotionCode={promotionCode}
            setPromotionCode={setPromotionCode}
            discount={discount}
            handleApplyPromotion={handleApplyPromotion}
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
      <CreateCustomerModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreate={handleCustomerCreate}
      />
    </div>
  );
}
