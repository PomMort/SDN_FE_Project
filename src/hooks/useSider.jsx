import { useMemo } from "react";
import {
  UserOutlined,
  HomeOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UsergroupDeleteOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectAuth } from "../slices/auth.slice";

const useSider = () => {
  const auth = useSelector(selectAuth);
  const isAdmin = auth?.isAdmin;

  const siderList = useMemo(() => {
    const baseItems = [
      {
        label: "Home",
        icon: <HomeOutlined />,
        href: "",
      },
      {
        label: "Product",
        icon: <ShoppingOutlined />,
        href: "product",
      },
      {
        label: "Order",
        icon: <ShoppingCartOutlined />,
        href: "order",
      },
      {
        label: "Customer",
        icon: <UsergroupDeleteOutlined />,
        href: "customer",
      },
    ];

    if (isAdmin) {
      // Add Employee item only if isAdmin is true
      baseItems.push(
        {
          label: "Employee",
          icon: <UserOutlined />,
          href: "employee",
        },
        {
          label: "Promotion",
          icon: <PercentageOutlined />,
          href: "promotion",
        }
      );
    }

    return baseItems;
  }, [isAdmin]);

  return siderList;
};

export default useSider;
