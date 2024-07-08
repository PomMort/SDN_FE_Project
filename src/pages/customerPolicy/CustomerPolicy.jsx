import React from "react";

import '../customerPolicy/CustomerPolicy.css';

import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CustomerPolicyList from "./CustomerManagement/CustomerPolicyList"
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
// import CreateCustomerModal from "./CustomerManagement/CreateCustomerModal"



export default function CustomerPolicy() {


  return (
    <div className="container">
      <h1>Customer Policy</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by Customer Name"
            prefix={<SearchOutlined />}
          // value={searchInput}
          // onChange={handleSearchInputChange}
          />
          <ButtonFilter contentBtn={"Filter"} />
        </div>
        <div className="edit-header-button">
          <div className="action-right">
            <div>
              {/* <CreateCustomerModal /> */}
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* <PromotionList productData={filteredProducts} /> */}
        <CustomerPolicyList />

      </div>
    </div>
  );
}
