import { LogoutOutlined, MenuFoldOutlined, ShoppingCartOutlined, WechatOutlined, BellOutlined } from "@ant-design/icons";
import { Button, Card, Layout, theme } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuItems from "../../contants/Menu";

const { Sider, Content } = Layout;
const LayoutMain = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        width={225}
        style={{
          position: "fixed",
          height: "100%",
        }}
      >
        <div>
          <MenuItems />
        </div>
        <div style={{ color: "white" }}>
          <Button
            icon={<LogoutOutlined />}
            className="logout"
            style={{
              width: "100%",
              marginLeft: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header className="header" style={{ padding: 0, background: "#fff", marginLeft: "230px" }}>
          <div className="app-header-sticky">
            <div><MenuFoldOutlined className="right-header" /></div>
            <div>
              <ShoppingCartOutlined className="right-header"/>
              <WechatOutlined className="right-header" />
              <BellOutlined className="right-header" />
            </div>
          </div>
        </Header>
        <Content style={{ margin: "60px 0 0 230px" }}>
          <div style={{ background: "#fff" }}>
            <Card size="small">
              <Outlet />
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutMain;
