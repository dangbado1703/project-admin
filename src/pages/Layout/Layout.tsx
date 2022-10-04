import { LogoutOutlined } from "@ant-design/icons";
import { Button, Card, Layout } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuItems from "../../contants/Menu";

const { Sider, Content } = Layout;
const LayoutMain = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
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
            className="delete"
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
        <Content style={{ margin: "24px 0 0 230px" }}>
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
