import { useMemo } from "react";
import {
  UserOutlined,
  HomeOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UsergroupDeleteOutlined,
  PercentageOutlined,
} from "@ant-design/icons";

const useSider = () => {
  const siderList = useMemo(() => {
    return [
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

      {
        label: "Employee",
        icon: <UserOutlined />,
        href: "employee",
      },

      {
        label: "Promotion",
        icon: <PercentageOutlined />,
        href: "promotion",
      },

      // {
      //   label: "Setting",
      //   icon: <FieldTimeOutlined />,
      //   href: "Setting",
      // },
    ];
  }, []);
  return siderList;
};

export default useSider;
