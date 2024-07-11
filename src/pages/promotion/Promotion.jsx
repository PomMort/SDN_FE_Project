import React, { useState } from "react";
import "../promotion/Promotion.css";
import { Input, notification, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PromotionList from "../promotion/PromotionManagement/PromotionList";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import {
  useGetPromotionsQuery,
  useUpdatePromotionMutation,
  useUpdateStatusMutation,
  useAddPromotionsMutation,
} from "../../services/promotionAPI";
import CreatePromotionModal from "./PromotionManagement/CreatePromotionModal";

export default function Promotion() {
  const { data: promotionData, refetch, isFetching } = useGetPromotionsQuery();
  const [addPromotion, { isLoading: isAdding }] = useAddPromotionsMutation();
  const [updatePromotion, { isLoading: isUpdating }] =
    useUpdatePromotionMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreatePromotion = async (values) => {
    try {
      await addPromotion(values).unwrap();
      notification.success({ message: "Promotion created successfully!" });
      setModalVisible(false);
      refetch();
    } catch (error) {
      console.error("Failed to create promotion:", error);
      notification.error({ message: error.data.description });
    }
  };

  const handleStatusChange = async (promotionId, status) => {
    try {
      await updateStatus({ id: promotionId, status }).unwrap();
      notification.success({
        message: "Promotion status updated successfully!",
      });
      refetch();
    } catch (error) {
      console.error("Failed to update promotion status:", error);
      notification.error({ message: error.data.description });
    }
  };

  const handleEditPromotion = async (promotionId, values) => {
    try {
      await updatePromotion({ id: promotionId, ...values }).unwrap();
      notification.success({ message: "Promotion updated successfully!" });
      refetch();
    } catch (error) {
      console.error("Failed to update promotion:", error);
      notification.error({ message: error.data.description });
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
          />
        </div>
        <div className="edit-header-button">
          <div className="action-right">
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Create Promotion
            </Button>
          </div>
        </div>
      </div>

      <div>
        <PromotionList
          promotionData={promotionData}
          handleEditPromotion={handleEditPromotion}
          handleStatusChange={handleStatusChange}
        />
      </div>

      <CreatePromotionModal
        visible={modalVisible}
        onCreate={handleCreatePromotion}
        onCancel={() => setModalVisible(false)}
        loading={isAdding}
        promotionData={promotionData}
      />
    </div>
  );
}
