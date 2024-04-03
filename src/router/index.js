import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GponLayout from '../component/layout/gpon'
import AdminLayout from '../component/layout/admin'
import BrasLayout from '../component/layout/bras'
import ThietBi from '../page/admin/device'


const Bras = lazy(() => import('../page/bras'));
const Gpon = lazy(() => import('../page/gpon'));
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
                <Route path="/" element={<GponLayout />}>
                    <Route index element={<Gpon />} />
                </Route>
                <Route path="/gpon" element={<GponLayout />}>
                    <Route index element={<Gpon />} />
                </Route>
                <Route path="/bras" element={<BrasLayout />}>
                    <Route index element={<Bras />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
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