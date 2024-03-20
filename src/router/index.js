import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../component/layout/index'
import Admin from '../component/layout/admin'

const ThietBi = lazy(() => import('../page/admin/thietbi'));
const Home = lazy(() => import('../page/home'));
const SystemID = lazy(() => import('../page/admin/systemid'));
const Ip = lazy(() => import('../page/admin/ip'));
const Shelf = lazy(() => import('../page/admin/shelf'));
const Port = lazy(() => import('../page/admin/port'));
const VlanNet = lazy(() => import('../page/admin/vlannet'));
const VlanMyTV = lazy(() => import('../page/admin/vlanmytv'));
const Onu = lazy(() => import('../page/admin/onu'));
const VlanIms = lazy(() => import('../page/admin/vlanims'));
const Cards = lazy(() => import('../page/admin/card'));

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
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<ThietBi />} />
                    <Route path='thietbi' element={<ThietBi />} />
                    <Route path='systemid' element={<SystemID />} />
                    <Route path='ip' element={<Ip />} />
                    <Route path='shelf' element={<Shelf />} />
                    <Route path='card' element={<Cards />} />
                    <Route path='port' element={<Port />} />
                    <Route path='vlan-net' element={<VlanNet />} />
                    <Route path='vlan-mytv' element={<VlanMyTV />} />
                    <Route path='onu' element={<Onu />} />
                    <Route path='vlan-ims' element={<VlanIms />} />

                </Route>
            </Routes>
        </Suspense>
    </Router>
);

export default App