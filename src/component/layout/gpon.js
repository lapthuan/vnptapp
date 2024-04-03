import { Button, Layout, Space, theme } from 'antd';
import { Outlet, Link } from "react-router-dom";


const { Header, Content, Footer } = Layout;

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: "#252a33",
                    justifyContent: 'space-between'
                }}

            >
                <div className="logo" >GPON TOOL</div>
                <Space >
                    <Button style={{ marginRight: "10px" }} ><Link to={'/bras'}>BRAS</Link></Button>
                    <Button type='primary' ><Link to={'/admin'}>Admin</Link></Button>
                </Space>

            </Header>
            <Content style={{ padding: '10px' }}>

                <div
                    style={{
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                    className='layout-card'
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Design ©{new Date().getFullYear()}
            </Footer>
        </Layout>

    );
}

export default App;