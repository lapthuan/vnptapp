import { Button, Card, Divider, Form, Input, Popconfirm, Space, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import useAsync from '../../hook/useAsync';
import ServiceDevice from '../../service/ServiceDevice';
import { useForm } from 'antd/es/form/Form';
import { QuestionCircleOutlined } from '@ant-design/icons';


const ThietBi = () => {
    const [dataTable, setData] = useState([])
    const { data, loading } = useAsync(() => ServiceDevice.getAlldevice())
    const [form] = useForm();

    let datatab = []
    data.map((item, i) => {
        datatab.push(
            {
                _id: item._id,
                name: item.name,
                key: item._id
            }
        )
    })


    useEffect(() => {
        setData(datatab)
    }, [data])

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const handleDelete = async () => {

    }

    const handleSubmit = async () => {
        const name = form.getFieldValue('name');
        const res = await ServiceDevice.createDevice({ name: name })

        if (res.detail.msg === "success") {
            message.success("Thêm thành công")
            let datatab = []
            res.detail.data?.map((item, i) => {
                datatab.push(
                    {
                        _id: item._id,
                        name: item.name,
                        key: item._id
                    }
                )
            })
            setData(datatab)
        }
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (id) => (
                <p>{id.slice(-6)}</p>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: "Công cụ",
            key: "action",
            render: (_id) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa"
                        description="Bạn có chắc chắn xóa?"
                        onConfirm={confirm}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space >
            )
        }
    ];
    return (<>
        <Divider orientation="left">Thiết bị</Divider>
        <div className='admin-body'>

            <div className='admin-card-1-3'>
                <Card title="Thông số" bordered={true}  >
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

                        <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]} className='select-item'>
                            <Input />
                        </Form.Item>

                        <Button type='primary' onClick={handleSubmit}>Thêm</Button>
                    </Form>
                </Card>
            </div>
            <div className='admin-card-2-3'>
                <Card title="Bảng" bordered={true}  >
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={dataTable.slice().reverse()} loading={loading} />
                </Card>
            </div>

        </div>
    </>);
}

export default ThietBi;