import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";
import { Button, Card, Flex, Typography } from "antd";
import TypePriceTable from "./TypePriceTable";

const { Title, Text } = Typography;

const Home = () => {
  const auth = useSelector(selectAuth);

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Card>
        <Title level={2}>Welcome, {auth?.name}</Title>
        <Flex justify="space-between">
          <div>
            <Text>Email: {auth?.email}</Text>
            <br />
            <Text>Name: {auth?.name}</Text>
            <br />

            <Text>Phone: {auth?.phone}</Text>
            <br />
          </div>
          <Button type="primary" style={{ marginRight: "10px" }}>
            Update Password
          </Button>
        </Flex>
        {/* Add more user information here based on your auth slice */}
      </Card>

      {/* <div style={{ marginTop: "20px" }}>
        <TypePriceTable />
      </div> */}

      {/* <div style={{ marginTop: "20px" }}>
        <Button type="primary" style={{ marginRight: "10px" }}>
          Make Order 1
        </Button>
        <Button type="primary">View Product</Button>
      </div> */}
    </div>
  );
};

export default Home;
