/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../components/layout/MainLayout";
import AuthGuard from "./AuthGuard";

const Login = Loadable({ loader: () => import("../pages/login/Login") });
const ForgetPassword = Loadable({
  loader: () => import("../pages/login/ForgetPassword"),
});
const LoginFirstTime = Loadable({
  loader: () => import("../pages/login/LoginFirstTime"),
});

const Counter = Loadable({
  loader: () => import("../pages/counter/Counter"),
});

const Customer = Loadable({
  loader: () => import("../pages/customer/Customer"),
});
const Order = Loadable({ loader: () => import("../pages/order/Order") });
const Product = Loadable({ loader: () => import("../pages/product/Product") });
const Promotion = Loadable({
  loader: () => import("../pages/promotion/Promotion"),
});
const Employee = Loadable({
  loader: () => import("../pages/employee/Employee"),
});
const EmployeeDetail = Loadable({
  loader: () => import("../pages/employee/EmployeeDetail/EmployeeDetail"),
});
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const Dashboard = Loadable({
  loader: () => import("../pages/dashboard/Dashboard"),
});
const Category = Loadable({
  loader: () => import("../pages/category/Category"),
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,

    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            // path: "",
            element: Home,
          },
          {
            path: "dashboard",
            element: Dashboard,
          },

          {
            path: "counter",
            element: Counter,
          },
          {
            path: "customer",
            element: Customer,
          },
          {
            path: "order",
            element: Order,
          },
          {
            path: "product",
            element: Product,
          },
          {
            path: "promotion",
            element: Promotion,
          },
          {
            path: "employee",
            element: Employee,
          },
          {
            path: "employee/:id",
            element: EmployeeDetail,
          },
          {
            path: "category",
            element: Category,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: Login,
  },
  {
    path: "forget-password",
    element: ForgetPassword,
  },
  {
    path: "login-first-time",
    element: LoginFirstTime,
  },
  {
    path: "*",
    element: <div>404 Page not found</div>,
  },
]);
