/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../components/layout/MainLayout";
import GuestGuard from "./GuestGuard";
import AuthGuard from "./AuthGuard";

const Login = Loadable({ loader: () => import("../pages/login/Login") });

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

const Category = Loadable({
  loader: () => import("../pages/category/Category"),
});
const OrderDetail = Loadable({
  loader: () => import("../pages/order/OrderManage/OrderDetail"),
});
const Sell = Loadable({
  loader: () => import("../pages/order/Sell/Sell"),
});

const ViewProductDetail = Loadable({
  loader: () => import("../pages/product/ProductManagement/ViewProductDetail"),
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestGuard />,

    children: [
      {
        path: "login",
        element: Login,
      },
    ],
  },
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
            path: "customer",
            element: Customer,
          },
          {
            path: "order",
            element: Order,
          },
          {
            path: "order-detail/:id",
            element: OrderDetail,
          },
          {
            path: "product",
            element: Product,
          },
          {
            path: "view-product-detail/:productId",
            element: ViewProductDetail,
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
          {
            path: "order/sell",
            element: Sell,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <div>404 Page not found</div>,
  },
]);
