import { Breadcrumb, Layout, Menu, theme } from 'antd';
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