import React, { useEffect, useState } from "react"; // Import React if not already imported

// Import the image file
import "./Login.css";
import { Alert, Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth, setToken } from "../../slices/auth.slice";
import { useLoginMutation } from "../../services/authAPI";
import { jwtDecode } from "jwt-decode"; // import dependency

function Login() {
  const [form] = Form.useForm(); // Sử dụng hook Form của Ant Design
  const [error, setError] = useState(null); // Khai báo state error
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values) => {
    const result = await login({
      email: values.email,
      password: values.password,
    });

    if (result.data.data !== null) {
      const data = result.data.data;
      const token = data.token;
      const auth = jwtDecode(data.token); // decode your token here

      // console.log(auth);

      dispatch(setAuth(auth));
      dispatch(setToken(token));

      notification.success({
        message: "Login successfully",
        description: "Welcome to Luminary !",
      });
    } else if (result.error) {
      notification.error({
        message: "Login Unsuccessfully",
        description: "Invalid email or password!",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="img-background"></div>

      <div className="login-space">
        <h1 className="title"> Luminary</h1>
        <h3 className="sub-title">Hello, Let's Sign In</h3>
        <Form form={form} className="login-form" onFinish={handleSubmit}>
          {/* <Form form={form} className="login-form"> */}
          {error && (
            <>
              <Alert message={error} type="error" showIcon />
              <br />
            </>
          )}
          {/* Hiển thị thông báo lỗi */}
          <p>Email Address</p>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                // pattern: /^[\w-]+(\.[\w-]+)*@(gmail\.com|fpt\.edu\.vn)$/,
                message: "Please input valid Email!",
              },
            ]}
          >
            <Input
              type=""
              placeholder="your@email.com"
              className="form-input"
            />
          </Form.Item>
          <p>Password</p>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="form-input"
            />
          </Form.Item>
          {/* <div className="forget-pass ">
            <p>
              <Link to={"/forget-password"}>Forget Password</Link>
            </p>
          </div> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="submit-btn"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
