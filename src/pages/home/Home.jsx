import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";
import { Button, Card, Typography } from "antd";
import TypePriceTable from "./TypePriceTable";

const { Title, Text } = Typography;

const Home = () => {
  const auth = useSelector(selectAuth);

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Card>
        <Title level={2}>Welcome, {auth?.EmployeeName}</Title>
        <Text>Email: {auth?.Email}</Text>
        {/* Add more user information here based on your auth slice */}
      </Card>

      <div style={{ marginTop: "20px" }}>
        <TypePriceTable />
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button type="primary" style={{ marginRight: "10px" }}>
          Make Order 1
        </Button>
        <Button type="primary">View Product</Button>
        {/* Add more buttons as needed for making orders */}
      </div>
    </div>
  );
};

export default Home;
