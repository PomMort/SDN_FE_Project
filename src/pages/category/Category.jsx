import { RollbackOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Spin } from "antd";
import React, { useState } from "react";
import CreateCategoryModal from "../category/CategoryManagement/CreateCategoryModal";
import CategoryList from "../category/CategoryManagement/CategoryList";
import '../category/Category.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/categoryAPI";

export default function Category() {
  const [searchInput, setSearchInput] = useState('');
  const [categorySearchInput, setCategorySearchInput] = useState(''); // State mới để lưu trữ tìm kiếm theo category
  const { data: categoryData, refetch, isFetching } = useGetCategoriesQuery();

  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/product');
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCategorySearchInputChange = (e) => { // Hàm xử lý thay đổi tìm kiếm theo category
    setCategorySearchInput(e.target.value);
  };

  // Apply map and then filter on categoryData
  const filteredProducts = categoryData
    ?.map(category => ({
      ...category,
    }))
    ?.filter(category =>
      category?.CategoryName.toLowerCase().includes(categorySearchInput.toLowerCase()) // Lọc theo category
    );

  // Handle loading state
  if (!categoryData) {
    return (
      <div>
        <Spin size="large" style={{ position: 'fixed', top: '45%', left: '55%', transform: 'translate(-50%, -50%)' }} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Category Page</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by category"
            prefix={<SearchOutlined />}
            value={categorySearchInput}
            onChange={handleCategorySearchInputChange}
          />
        </div>
        <div className="edit-header-button">
          <div>
            <Button type="primary" onClick={handleBack} icon={<RollbackOutlined />} >
              Back to Product page
            </Button>
          </div>

          <div className="action-right">
            <div className=''>
              <CreateCategoryModal

              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <CategoryList categoryData={filteredProducts} /> {/* Truyền filteredProducts thay vì categoryData */}
      </div>
    </div>
  );
}
