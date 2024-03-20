import { Button, Card, Divider, Form, Input, Space, Table } from 'antd';


const columns = [
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: "Công cụ",
        key: "action",
        render: (id) => (
            <Space size="middle">
                <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }}>
                    Sửa
                </Button>
                <Button type="primary" danger>Xóa</Button>
            </Space >
        )
    }
];
const data = [
    {
        id: '123',
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        id: '123',
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        id: '123',
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        id: '123',
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];
const Shelf = () => {
    return (<>
        <Divider orientation="left">Shelf</Divider>
        <div className='admin-body'>

            <div className='admin-card-1-3'>
                <Card title="Thông số" bordered={true}  >
                    <Form
                        labelCol={{ span: 6 }}
                        initialValues={{
                            size: 'small',
                        }}
                        layout="horizontal"
                        size={'small'}
                        className='form-card'

                    >

                        <Form.Item label="Card" className='select-item'>
                            <Input />
                        </Form.Item>

                        <Button type='primary' >Thêm</Button>
                    </Form>
                </Card>
            </div>
            <div className='admin-card-2-3'>
                <Card title="Bảng" bordered={true}  >
                    <Table columns={columns} dataSource={data} />
                </Card>
            </div>

        </div>
    </>);
}

export default Shelf;