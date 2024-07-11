import React, { useState } from 'react';
import '../product/Product.css';
import ProductList from "./ProductManagement/ProductList";
import { Input, notification, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonViewCategory from "../../components/ButtonFilter/ButtonViewCategory";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import CreateProductModal from './ProductManagement/CreateProductModal';
import { useNavigate } from 'react-router-dom';
import { useEditProductMutation, useGetProductsQuery } from '../../services/productAPI';
import { useAddProductMutation } from '../../services/productAPI';
import { useDeleteProductMutation } from '../../services/productAPI';

export default function Product() {
  const { data: productData, refetch, isFetching } = useGetProductsQuery();
  const [searchInput, setSearchInput] = useState('');
  const [addProductMutation, { isLoading: isLoadingAdd }] = useAddProductMutation();
  const [deleteProduct, { isLoading: isLoadingRemove }] = useDeleteProductMutation();
  const [editProductMutation, { isLoading: isLoadingEdit }] = useEditProductMutation();
  const navigate = useNavigate();

  const handleViewCategory = () => {
    navigate("/category", { state: { productData } }); // Chuyển hướng và truyền productData qua state
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  // console.log(productsData);

  // Apply map and then filter on productData
  const filteredProducts = productData
    ?.map(product => ({
      ...product,
      // Name: product?.Name.toLowerCase(),
      // Barcode: product?.Barcode.toLowerCase()
    }))

    ?.filter(product =>
      product?.name.toLowerCase().includes(searchInput.toLowerCase())
    );

  const handleAddProduct = async (values) => {
    // console.log(values);
    try {
      await addProductMutation(values).unwrap();
      notification.success({
        message: "Create product successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Create product failed !!!",
      });
    }
  }
  const handldeDeleteProduct = async (id) => {
    // console.log(id);
    try {
      await deleteProduct(id).unwrap();
      notification.success({
        message: "Delete product successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Delete product failed !!!",
      });
    }
  }
  const handleEditProduct = async (values) => {
    try {
      await editProductMutation(values).unwrap();
      notification.success({
        message: "Update product successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Update product failed !!!",
      });
    }
  };

  if (isFetching) {
    return (
      <div>
        <Spin size="large" style={{ position: 'fixed', top: '45%', left: '55%', transform: 'translate(-50%, -50%)' }} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Product Page</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name or barcode"
            prefix={<SearchOutlined />}
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <ButtonFilter contentBtn={"Filter"} />
        </div>
        <div className="edit-header-button">
          <div className="action-right">
            <div>
              <CreateProductModal
                onCreate={handleAddProduct}
                loading={isLoadingAdd}
              />
            </div>
          </div>
          <div>
            <ButtonViewCategory
              contentBtn={"View Category"}
              onClick={handleViewCategory}
            />
          </div>
        </div>
      </div>

      <div>
        <ProductList
          productData={filteredProducts}
          handldeDeleteProduct={handldeDeleteProduct}
          handleEditProduct={handleEditProduct}
          refetch={refetch}
        />
      </div>

    </div>
  );
}
