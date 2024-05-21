import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import {
  MdDevicesOther,
  MdSettingsInputAntenna,
  MdFlashOn,
  MdTimeline,
  MdSettingsEthernet,
} from "react-icons/md";
import { FaTv } from "react-icons/fa";
import { AiOutlineWifi, AiOutlineApartment } from "react-icons/ai";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import logo from "../../assets/images/logo.png";
import { FaNetworkWired } from "react-icons/fa";

const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ height: "120vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="brand-admin">
            <img src={logo} alt="" />
            <span>VNPT ADMIN</span>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<MdDevicesOther />}>
              <Link to="../admin/thietbi">Thiết bị</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<MdSettingsInputAntenna />}>
              <Link to="../admin/ip">Ip</Link>
            </Menu.Item>

            <Menu.Item key="7" icon={<AiOutlineWifi />}>
              <Link to="../admin/vlan-net">Vlan Net</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<FaTv />}>
              <Link to="../admin/vlan-mytv">Vlan Mytv</Link>
            </Menu.Item>

            <Menu.Item key="10" icon={<AiOutlineApartment />}>
              <Link to="../admin/vlan-ims">Vlan IMS</Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<MdTimeline />}>
              <Link to={"/gpon"}>GPON</Link>
            </Menu.Item>
            <Menu.Item key="12" icon={<MdSettingsEthernet />}>
              <Link to={"/bras"}>BRAS</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 400,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Design ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default App;
