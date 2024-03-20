import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../component/layout/index'
import Admin from '../component/layout/admin'
import ThietBi from '../page/admin/thietbi';
import Home from '../page/home';
import SystemID from '../page/admin/systemid';
import Ip from '../page/admin/ip';
import Shelf from '../page/admin/shelf';
import Port from '../page/admin/port';
import VlanNet from '../page/admin/vlannet';
import VlanMyTV from '../page/admin/vlanmytv';
import Onu from '../page/admin/onu';
import VlanIms from '../page/admin/vlanims';
import Cards from '../page/admin/card';

const App = () => (
    <Router>
        <Suspense fallback={<Spin tip="Đang tải..." size="large">
            <div className="content" />
        </Spin>}>
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