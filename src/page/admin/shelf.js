


import { Card, Divider, Form, Select, Table } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },

];
const data = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
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

                        <Form.Item label="Thiết bị" className='select-item'>
                            <Select style={{ width: "100%" }}>
                                <Select.Option value="demo">Demoaaaaaaaaaaaaaa  </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="SystemID" className='select-item'>
                            <Select style={{ width: "100%" }}>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
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