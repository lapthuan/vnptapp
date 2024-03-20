import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Outlet, Link, useNavigate } from "react-router-dom";


const { Header, Content, Footer } = Layout;
const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));
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
                <div className="logo" >App Vnpt</div>
                <Button type='primary' ><Link to={'/admin'}>Admin</Link></Button>
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