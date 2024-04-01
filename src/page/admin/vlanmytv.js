import { Button, Card, Divider, Form, Input, InputNumber, Space, Table } from 'antd';
import SubmitVlanMyTV from '../../component/submit/submitVlanMyTV';


const VlanMyTV = () => {
    const {
        form,
        columns,
        dataTable,
        editTab,
        setEditTab,
        valueEdit,
        idEdit,
        loading,
        handleEdit,
        handleSubmit
    } = SubmitVlanMyTV();

    return (<>
        <Divider orientation="left">Vlan MyTV</Divider>
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
                    >

                        <Form.Item label="Vlan MyTV :" name="number" rules={[{ required: true, message: 'Vui lòng nhập Vlan MyTV!' }]} className='select-item'>
                            <InputNumber type='number' />
                        </Form.Item>

                        <Button type='primary' onClick={handleSubmit}>Thêm</Button>
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
                    >
                        <Form.Item label="Vlan MyTV :" name="number" rules={[{ required: true, message: 'Vui lòng nhập Vlan MyTV!' }]} className='select-item'>
                            <InputNumber type='number' placeholder={valueEdit} />
                        </Form.Item>
                        <Space size="middle">
                            <Button type='primary' onClick={handleEdit}>Sửa</Button>
                            <Button onClick={() => setEditTab(false)}>Trở về thêm</Button>

                        </Space>
                    </Form>
                </Card>)}

            </div>
            <div className='admin-card-2-3'>
                <Card title="Bảng" bordered={true}  >
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={dataTable.slice().reverse()} loading={loading} />
                </Card>
            </div>

        </div >
    </>);
}

export default VlanMyTV;