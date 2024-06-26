import { Button, Card, Divider, Form, Input, Space, Table } from 'antd';
import SubmitIP from '../../component/submit/submitIp';


const Ip = () => {

    const {
        form,
        columns,
        dataTable,
        editTab,
        setEditTab,
        idEdit,
        loading,
        handleEdit,
        handleSubmit
    } = SubmitIP();


    return (<>
        <Divider orientation="left">Ip</Divider>
        <div className='admin-body'>

            <div className='admin-card-1-3'>
                {editTab === false ? (<Card title="Thêm dữ liệu" bordered={true}  >
                    <Form
                        form={form}
                        labelCol={{ span: 6 }}
                        initialValues={{
                            size: 'small',
                        }}
                        layout="horizontal"
                        size={'small'}
                        className='form-card'
                    >

                        <Form.Item label="IP :" name="ipaddress" tooltip="Nhập đúng định dạng IPv4" rules={[{ required: true, message: 'Vui lòng nhập Ip!' }]} className='select-item'>
                            <Input />
                        </Form.Item>

                        <Button type='primary' onClick={handleSubmit}>Thêm</Button>
                    </Form>
                </Card>) : (<Card title="Sửa dữ liệu" bordered={true}  >

                    <i>Sửa dữ liệu của id: {idEdit.slice(-6)}</i>
                    <Form
                        form={form}
                        labelCol={{ span: 6 }}
                        initialValues={{
                            size: 'small',
                        }}
                        layout="horizontal"
                        size={'small'}
                        className='form-card'
                    >
                        <Form.Item label="IP :" tooltip="Nhập đúng định dạng IPv4" name="ipaddress" rules={[{ required: true, message: 'Vui lòng nhập Ip!' }]} className='select-item'>
                            <Input/>
                        </Form.Item>
                        <Space size="middle">
                            <Button type='primary' onClick={handleEdit}>Sửa</Button>
                            <Button onClick={() => setEditTab(false)}>Trở về thêm</Button>

                        </Space>
                    </Form>
                </Card>)}

            </div>
            <div className='admin-card-2-3'>
           
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={dataTable.slice().reverse()} loading={loading} />
         
            </div>

        </div >
    </>);
}

export default Ip;