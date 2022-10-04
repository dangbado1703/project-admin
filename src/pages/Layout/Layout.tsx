import { Card, Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import MenuItems from "../../contants/Menu";

const { Sider, Content } = Layout;
const LayoutMain = () => {
  // const [collapsed, setCollapsed] = useState(false);
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
