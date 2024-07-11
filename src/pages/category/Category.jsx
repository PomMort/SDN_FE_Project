import { RollbackOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, notification, Spin } from "antd";
import { useState } from "react";
import CreateCategoryModal from "../category/CategoryManagement/CreateCategoryModal";
import CategoryList from "../category/CategoryManagement/CategoryList";
import '../category/Category.css'
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/categoryAPI";
import { useAddCategoryMutation } from "../../services/categoryAPI";
import { useDeleteCategoryMutation } from "../../services/categoryAPI";
import { useEditCategoryMutation } from "../../services/categoryAPI";
export default function Category() {

  const [categorySearchInput, setCategorySearchInput] = useState(''); // State mới để lưu trữ tìm kiếm theo category

  const { data: categoryData, refetch, isFetching } = useGetCategoriesQuery();
  const [addCategoryMutation, { isLoading: isLoadingAdd }] = useAddCategoryMutation();
  const [deleteCategory, { isLoading: isLoadingDelete }] = useDeleteCategoryMutation();
  const [editCategoryMutation, { isLoading: isLoadingEdit }] = useEditCategoryMutation();
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/product');
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
      category?.name.toLowerCase().includes(categorySearchInput.toLowerCase()) // Lọc theo category
    );


  // AddCategory
  const handleAddCategory = async (values) => {
    // console.log(values); 
    try {
      await addCategoryMutation(values).unwrap();
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

  //DeleteCategory
  const handleDeleteCategory = async (id) => {
    // console.log(id);
    try {
      await deleteCategory(id).unwrap();
      notification.success({
        message: "Deactive category successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Deactive category failed !!!",
      });
    }
  }
  // UpdateCategory
  const handleEditCategory = async (values) => {
    try {
      await editCategoryMutation(values).unwrap();
      notification.success({
        message: "Update category successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Update category failed !!!",
      });
    }
  }

  // Handle loading state
  if (isFetching) {
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
                onCreate={handleAddCategory}
                loading={isLoadingAdd}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <CategoryList
          categoryData={filteredProducts}
          handleDeleteCategory={handleDeleteCategory}
          handleEditCategory={handleEditCategory}
        />
      </div>
    </div>
  );
}
