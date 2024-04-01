import { Button, Card, Divider, Form, Input, Select, Space, Table } from 'antd';
import SubmitDevice from '../../component/submit/submitDevice';



const Ip = () => {


    const {
        form,
        onFinish,
        columns,
        dataTable,
        editTab,
        setEditTab,
        valueEdit,
        idEdit,
        loading,
        handleEdit,
        loadingButton,
        dataIp,
        dataVlanIMS,
        dataVlanMyTV,
        dataVlanNet,
        loadingIp,
        loadingVlanIMS,
        loadingVlanMyTV,
        loadingVlanNet,
    } = SubmitDevice();




    return (<>
        <Divider orientation="left">Ip</Divider>
        <div className='admin-body'>

            <div className='admin-card-1-3'>
                {editTab === false ? (<Card title="Thêm dữ liệu" bordered={true}  >
                    <Form
                        form={form}
                        labelCol={{ span: 8 }}
                        initialValues={{
                            size: 'small',
                        }}
                        layout="horizontal"
                        size={'small'}
                        className='form-card'
                        onFinish={onFinish}
                    >

                        <Form.Item label="Loại TB" name="loaithietbi" rules={[{ required: true, message: 'Hãy Chọn loại thiết bị' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn loại thiết bị">
                                <Select.Option value="GPON ALU">GPON ALU</Select.Option>
                                <Select.Option value="GPON HW">GPON HW</Select.Option>
                                <Select.Option value="GPON MINI ZTE">GPON Mini ZTE</Select.Option>
                                <Select.Option value="GPON ZTE">GPON ZTE</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Tên TB" name="tenthietbi" rules={[{ required: true, message: 'Chưa nhập tên TB' }]} className='select-item'>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Ip" name="ipaddress" rules={[{ required: true, message: 'Hãy Chọn Ip' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn Ip" loading={loadingIp}>
                                {dataIp?.map((item, i) => (
                                    <Select.Option key={i + 1} value={item._id}>{item.ipaddress}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Vlan IMS" name="vlanims" rules={[{ required: true, message: 'Hãy Chọn Vlan IMS' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn Vlan IMS" loading={loadingVlanIMS}>
                                {dataVlanIMS?.map((item, i) => (
                                    <Select.Option key={i + 1} value={item._id}>{item.number}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Vlan MyTV" name="vlanmytv" rules={[{ required: true, message: 'Hãy Chọn Vlan MyTV' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn Vlan MyTV" loading={loadingVlanMyTV}>
                                {dataVlanMyTV?.map((item, i) => (
                                    <Select.Option key={i + 1} value={item._id}>{item.number}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Vlan Net" name="vlannet" rules={[{ required: true, message: 'Hãy Chọn Vlan Net' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn Vlan Net" loading={loadingVlanNet}>
                                {dataVlanNet?.map((item, i) => (
                                    <Select.Option key={i + 1} value={item._id}>{item.number}</Select.Option>
                                ))}


                            </Select>
                        </Form.Item>
                        <Button type='primary' loading={loadingButton} htmlType="submit">Thêm</Button>
                    </Form>
                </Card>) : (<Card title="Sửa dữ liệu" bordered={true}  >

                    <i>Sửa dữ liệu của id: {idEdit.slice(-6)}</i>
                    <Form
                        form={form}
                        labelCol={{ span: 8 }}
                        initialValues={{
                            size: 'small',
                        }}
                        layout="horizontal"
                        size={'small'}
                        className='form-card'
                        onFinish={handleEdit}
                    >

                        <Form.Item label="Loại TB" name="loaithietbi" rules={[{ required: true, message: 'Hãy Chọn loại thiết bị' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn loại thiết bị">
                                <Select.Option value="GPON ALU">GPON ALU</Select.Option>
                                <Select.Option value="GPON HW">GPON HW</Select.Option>
                                <Select.Option value="GPON MINI ZTE">GPON Mini ZTE</Select.Option>
                                <Select.Option value="GPON ZTE">GPON ZTE</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Tên TB" name="tenthietbi" rules={[{ required: true, message: 'Chưa nhập tên TB' }]} className='select-item'>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Ip" name="ipaddress" rules={[{ required: true, message: 'Hãy Chọn Ip' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn Ip" loading={loadingIp}>
                                {dataIp?.map((item, i) => (
                                    <Select.Option key={i + 1} value={item._id}>{item.ipaddress}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Vlan IMS" name="vlanims" rules={[{ required: true, message: 'Hãy Chọn Vlan IMS' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn Vlan IMS" loading={loadingVlanIMS}>
                                {dataVlanIMS?.map((item, i) => (
                                    <Select.Option key={i + 1} value={item._id}>{item.number}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Vlan MyTV" name="vlanmytv" rules={[{ required: true, message: 'Hãy Chọn Vlan MyTV' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn Vlan MyTV" loading={loadingVlanMyTV}>
                                {dataVlanMyTV?.map((item, i) => (
                                    <Select.Option key={i + 1} value={item._id}>{item.number}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Vlan Net" name="vlannet" rules={[{ required: true, message: 'Hãy Chọn Vlan Net' }]} className='select-item'>
                            <Select style={{ width: "100%" }} placeholder="Chọn Vlan Net" loading={loadingVlanNet}>
                                {dataVlanNet?.map((item, i) => (
                                    <Select.Option key={i + 1} value={item._id}>{item.number}</Select.Option>
                                ))}


                            </Select>
                        </Form.Item>
                        <Button type='primary' loading={loadingButton} htmlType="submit">Sửa</Button>
                        <Button onClick={() => setEditTab(false)}>Trở về thêm</Button>
                    </Form>
                </Card>)}

            </div>
            <div className='admin-card-2-3'>
                <Card title="Bảng" bordered={true}  >
                    <Table pagination={{ pageSize: 4 }} columns={columns} dataSource={dataTable.slice().reverse()} loading={loading} />
                </Card>
            </div>

        </div >
    </>);
}

export default Ip;