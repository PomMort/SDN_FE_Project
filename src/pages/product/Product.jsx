import React from 'react';
import '../product/Product.css';
// import { useGetAllUserQuery } from "../../services/userAPI";
import ProductList from "./ProductManagement/ProductList";
import {  Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import ButtonCreate from "../../components/ButtonFilter/ButtonCreate";
import ButtonViewCategory from "../../components/ButtonFilter/ButtonViewCategory";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import CreateProductModal from './ProductManagement/CreateProductModal';

export default function Product() {
  // const { data: products, isLoading, refetch } = useGetAllUserQuery();

  // Handle loading state
  // if (isLoading) {
  //   return <div>
  //     <Spin size="large" style={{ position: 'fixed', top: '45%', left: '55%', transform: 'translate(-50%, -50%)' }} />
  //   </div>;
  // }

  return (
    <div className="container">
      <h1>Product Page</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name or phone number"
            prefix={<SearchOutlined />}
          />
          <ButtonFilter contentBtn={"Filter"} />
        </div>
        <div className="edit-header-button">
          <div className="action-right">
            <div className=''>
              <CreateProductModal />
            </div>
          </div>
          <div className="">
            <ButtonViewCategory contentBtn={"View Category"} />
          </div>
        </div>
      </div>

      <div>
        <ProductList  />
        {/* <ProductList products={products} /> */}

      </div>
    </div>
  );
}
