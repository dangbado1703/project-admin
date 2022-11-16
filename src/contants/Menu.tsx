import {
  HomeOutlined,
  DollarCircleOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { path } from "../router/path";
type MenuItem = Required<MenuProps>["items"][number];
const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
) => {
  return { key, icon, children, label, type } as MenuItem;
};
const items: MenuItem[] = [
  getItem("Trang chủ", path.home, <HomeOutlined />),
  getItem("Đơn hàng", path.order, <DollarCircleOutlined />),
  getItem("Nhân viên", path.staff, <UsergroupAddOutlined />),
  getItem("Khách hàng", path.client, <UserOutlined />),
  getItem("Sản phẩm", path.product, <ShoppingOutlined />),
  getItem("Khuyến mại", path.voucher, <ShoppingOutlined />),
];
const MenuItems = () => {
  const [currentKey, setCurrentKey] = useState(path.home);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleSelect = (data: any) => {
    setCurrentKey(data.key);
    navigate(data.key);
  };
  useEffect(() => {
    setCurrentKey(pathname);
  }, [pathname]);
  return (
    <Menu
      theme="dark"
      items={items}
      mode="inline"
      selectedKeys={[currentKey]}
      defaultOpenKeys={[path.home]}
      onClick={handleSelect}
    />
  );
};

export default MenuItems;
