import { Button, Popconfirm, Space, message } from 'antd';
import { useEffect, useState } from 'react';
import useAsync from '../../hook/useAsync';
import { useForm } from 'antd/es/form/Form';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ServiceVlanMyTV from '../../service/ServiceVlanMyTV';

const SubmitVlanMyTV = () => {
    const [dataTable, setData] = useState([])
    const [editTab, setEditTab] = useState(false)
    const [idEdit, setIdEdit] = useState()
    const [valueEdit, setValueEdit] = useState()

    const { data, loading } = useAsync(() => ServiceVlanMyTV.getAllVlanMyTV())
    const [form] = useForm();

    let datatab = []
    data.map((item, i) => {
        datatab.push(
            {
                _id: item._id,
                number: item.number,
                key: item._id
            }
        )
    })

    useEffect(() => {
        setData(datatab)
    }, [data])
    const ChangeEdit = async (_id, number) => {
     
        await setIdEdit(_id);
        form.setFieldsValue({
            number: number
        });
        setEditTab(true);

    }
    const handleEdit = async () => {
        const number = form.getFieldValue('number');
        if (number) {
            const res = await ServiceVlanMyTV.editVlanMyTV({ number: number }, idEdit)
            if (res.detail.msg === "success") {
                message.success("Sửa thành công thành công")
                let datatab = []
                res.detail.data?.map((item, i) => {
                    datatab.push(
                        {
                            _id: item._id,
                            number: item.number,
                            key: item._id
                        }
                    )
                })
                setData(datatab)
            } else {
                message.error("Địa chỉ ip không hợp lệ")
            }
        } else {
            message.error("Dữ liệu bỏ trống")

        }
    }
    const handleDelete = async (_id) => {
        const res = await ServiceVlanMyTV.deleteVlanMyTV(_id)
        if (res.detail.msg === "success") {
            message.success("Xóa thành công")
            let datatab = []
            res.detail.data?.map((item, i) => {
                datatab.push(
                    {
                        _id: item._id,
                        number: item.number,
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
        const number = form.getFieldValue('number');
        if (number) {
            const res = await ServiceVlanMyTV.createVlanMyTV({ number: number })

            if (res.detail.msg === "success") {
                message.success("Thêm thành công")
                let datatab = []
                res.detail.data?.map((item, i) => {
                    datatab.push(
                        {
                            _id: item._id,
                            number: item.number,
                            key: item._id
                        }
                    )
                })
                setData(datatab)
            } else {
                message.error("Địa chỉ ip không hợp lệ")
            }
        } else {
            message.error("Dữ liệu bỏ trống")

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
            title: 'Vlan',
            dataIndex: 'number',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: "Công cụ",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => ChangeEdit(record._id, record.number)} style={{ backgroundColor: 'green', borderColor: 'green' }}>
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

    return {
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
    };
}

export default SubmitVlanMyTV;