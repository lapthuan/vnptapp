import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { GrSystem } from "react-icons/gr";
import { CiCreditCard2 } from "react-icons/ci";
import { MdDevicesOther, MdSettingsInputAntenna } from "react-icons/md";
import { FaUsb, FaTv } from 'react-icons/fa';
import { AiOutlineWifi, AiOutlineApartment } from 'react-icons/ai'
import { BsModem } from "react-icons/bs";
import { GiBookshelf } from "react-icons/gi";
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
const { Header, Sider, Content } = Layout;
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();



    return (
        <>


            <Layout style={{ height: "120vh" }} >
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
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
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Button type='primary'><Link to={'/'}>Control</Link></Button>

                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 400,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Design ©{new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>
        </>

    );
};
export default App;