import React from "react";

import '../promotion/Promotion.css';

import { Input, notification, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PromotionList from "../promotion/PromotionManagement/PromotionList";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
// import CreateProductModal from './ProductManagement/CreateProductModal';
import CreatePomotionModal from "./PromotionManagement/CreatePromotionModal";
import { useEditPromotionMutation, useGetPromotionsQuery } from '../../services/promotionAPI';
import { useAddPromotionsMutation } from "../../services/promotionAPI";


export default function Promotion() {
  const { data: promotionData, refetch, isFetching } = useGetPromotionsQuery();
  const [addPromotionMutation, { isLoading: isLoadingAdd }] = useAddPromotionsMutation();
  const [editPromotionMutation, { isLoading: isLoadingEdit }] = useEditPromotionMutation();


  const handleCreatePomotion = async (values) => {
    // console.log(values);
    try {
      await addPromotionMutation(values).unwrap();
      notification.success({
        message: "Create promotion successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Create promotion failed !!!",
      });
    }
  }
  const handleEditPromotion = async (values, mode = 'update') => {
    try {
      await editPromotionMutation(values).unwrap();
      notification.success({
        message: `${mode === 'delete' ? 'Delete' : 'Update'} promotion successfully !!!`,
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: `${mode === 'delete' ? 'Delete' : 'Update'} promotion failed !!!`,

      });
    }
  };


  return (
    <div className="container">
      <h1>Promotion Page</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name or barcode"
            prefix={<SearchOutlined />}
          // value={searchInput}
          // onChange={handleSearchInputChange}
          />
          <ButtonFilter contentBtn={"Filter"} />
        </div>
        <div className="edit-header-button">
          <div className="action-right">
            <div>
              <CreatePomotionModal
                onCreate={handleCreatePomotion}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* <PromotionList productData={filteredProducts} /> */}
        <PromotionList promotionData={promotionData} handleEditPromotion={handleEditPromotion} />

      </div>
    </div>
  );
}
