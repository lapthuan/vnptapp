import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../component/layout/index'
import Admin from '../component/layout/admin'
import BrasLayout from '../component/layout/bras'
import ThietBi from '../page/admin/device'


const Bras = lazy(() => import('../page/bras'));
const Home = lazy(() => import('../page/home'));
const Ip = lazy(() => import('../page/admin/ip'));
const VlanNet = lazy(() => import('../page/admin/vlannet'));
const VlanMyTV = lazy(() => import('../page/admin/vlanmytv'));
const VlanIms = lazy(() => import('../page/admin/vlanims'));

const App = () => (
    <Router>
        <Suspense fallback={<Spin
            fullscreen={'true'}
            style={{ backgroundColor: 'white' }}
            indicator={
                <LoadingOutlined
                    style={{
                        fontSize: 24,

                    }}
                    spin
                />
            }
        />}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/gpon" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/bras" element={<BrasLayout />}>
                    <Route index element={<Bras />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<ThietBi />} />
                    <Route path='thietbi' element={<ThietBi />} />
                    <Route path='ip' element={<Ip />} />
                    <Route path='vlan-net' element={<VlanNet />} />
                    <Route path='vlan-mytv' element={<VlanMyTV />} />
                    <Route path='vlan-ims' element={<VlanIms />} />
                </Route>
            </Routes>
        </Suspense>
    </Router>
);

export default App