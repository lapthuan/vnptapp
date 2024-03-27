import { Button, Card, Divider, Form, Input, Popconfirm, Space, Table, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';
import useAsync from '../../hook/useAsync';
import { useForm } from 'antd/es/form/Form';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ServiceIp from '../../service/ServiceIp';

const Ip = () => {
    const [dataTable, setData] = useState([])
    const [editTab, setEditTab] = useState(false)
    const [idEdit, setIdEdit] = useState()
    const [valueEdit, setValueEdit] = useState()

    const { data, loading } = useAsync(() => ServiceIp.getAllIp())
    const [form] = useForm();

    let datatab = []
    data.map((item, i) => {
        datatab.push(
            {
                _id: item._id,
                ipaddress: item.ipaddress,
                key: item._id
            }
        )
    })

    useEffect(() => {
        setData(datatab)
    }, [data])
    const ChangeEdit = async (_id, ipaddress) => {
        await setIdEdit(_id);
        await setValueEdit(ipaddress)

        setEditTab(true);

    }
    const handleEdit = async (_id) => {
        const res = await ServiceIp.deleteIp(_id)
        if (res.detail.msg === "success") {
            message.success("Xóa thành công")
            let datatab = []
            res.detail.data?.map((item, i) => {
                datatab.push(
                    {
                        _id: item._id,
                        ipaddress: item.ipaddress,
                        key: item._id
                    }
                )
            })
            setData(datatab)
        } else {
            message.error("Lỗi")
        }
    }
    const handleDelete = async (_id) => {
        const res = await ServiceIp.deleteIp(_id)
        if (res.detail.msg === "success") {
            message.success("Xóa thành công")
            let datatab = []
            res.detail.data?.map((item, i) => {
                datatab.push(
                    {
                        _id: item._id,
                        ipaddress: item.ipaddress,
                        key: item._id
                    }
                )
            })
            setData(datatab)
        } else {
            message.error("Lỗi")
        }
    }
    const handleSubmit = async () => {
        const ipaddress = form.getFieldValue('ipaddress');
        const res = await ServiceIp.createIp({ ipaddress: ipaddress })

        if (res.detail.msg === "success") {
            message.success("Thêm thành công")
            let datatab = []
            res.detail.data?.map((item, i) => {
                datatab.push(
                    {
                        _id: item._id,
                        ipaddress: item.ipaddress,
                        key: item._id
                    }
                )
            })
            setData(datatab)
        } else {
            message.error("Địa chỉ ip không hợp lệ")
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
            title: 'Ip',
            dataIndex: 'ipaddress',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: "Công cụ",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => ChangeEdit(record._id, record.ipaddress)} style={{ backgroundColor: 'green', borderColor: 'green' }}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa"
                        description="Bạn có chắc chắn xóa?"
                        onConfirm={() => handleDelete(record._id)}
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
                            <Input placeholder={valueEdit} />
                        </Form.Item>

                        <Button type='primary' onClick={handleSubmit}>Sửa</Button>
                    </Form>
                </Card>)}

            </div>
            <div className='admin-card-2-3'>
                <Card title="Bảng" bordered={true}  >
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={dataTable.slice().reverse()} loading={loading} />
                </Card>
            </div>

        </div>
    </>);
}

export default Ip;