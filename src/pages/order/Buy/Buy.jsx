import Information from "./Information";
import "./Buy.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ProductInformation from "./ProductInformation";

export default function Buy() {
  return (
    <div className="buy-back-page">
      <div className="header">
        <h1>Buy Back</h1>
        <hr />
      </div>
      <div className="body">
        <div className="search-order">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by Order Code"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="information">
          <Information />
        </div>
        <div className="product-information">
          <ProductInformation />
        </div>
      </div>
    </div>
  );
}
