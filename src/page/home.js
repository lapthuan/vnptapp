import React, { useState } from 'react';
import { Button, Card, Form, Radio } from 'antd';
import { Select, Space } from 'antd';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

const Home = () => {
    const [lineData, setLineData] = useState([
        <TerminalOutput>Welcome to the React Terminal UI Demo!&#128075;</TerminalOutput>,
        <TerminalOutput></TerminalOutput>,
        <TerminalOutput>The following example commands are provided:</TerminalOutput>,
        <TerminalOutput>'view-source' will navigate to the React Terminal UI github source.</TerminalOutput>,
        <TerminalOutput>'view-react-docs' will navigate to the react docs.</TerminalOutput>,
        <TerminalOutput>'clear' will clear the terminal.</TerminalOutput>,
    ]);
    const handleClick = () => {
        // Concatenate a new line to lineData
        const newLine = <TerminalOutput> $ Hello </TerminalOutput>;
        setLineData(prevLineData => prevLineData.concat(newLine));
        // Alternatively, using spread operator:
        // setLineData(prevLineData => [...prevLineData, newLine]);
    }
    return (
        <>
            <div className='body-home'>
                <div className='body-ts' >
                    <Card title="Thông số" bordered={true} style={{ width: 400, margin: "auto" }} >
                        <Form
                            labelCol={{ span: 10 }}
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
                            <Form.Item label="Ip" className='select-item'>
                                <Select style={{ width: "100%" }}>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Shelf" className='select-item'>
                                <Select style={{ width: "100%" }}>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Card" className='select-item'>
                                <Select style={{ width: "100%" }}>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Port" className='select-item'>
                                <Select style={{ width: "100%" }}>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Vlan Net" className='select-item'>
                                <Select style={{ width: "100%" }}>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Vlan Mytv" className='select-item'>
                                <Select style={{ width: "100%" }}>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Onu" className='select-item'>
                                <Select style={{ width: "100%" }}>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Vlan IMS" className='select-item'>
                                <Select >
                                    <Select.Option value="demo">aaaaaaaaaa</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>

                <div className='body-terminal'>

                    <Terminal height="40vh" colorMode={ColorMode.Dark} >
                        {lineData}
                    </Terminal>

                    <Button onClick={handleClick} hidden>Bấm vào em nè</Button>

                </div>



            </div>
            <Card bordered={true} title="Chức năng" >
                <Radio.Group >
                    <Space>
                        <Space.Compact direction="vertical">

                            <Radio value={11}>Xem trạng thái Lip/Down Onu</Radio>
                            <Radio value={21}>Xem suy hao</Radio>
                            <Radio value={31}>Xem cấu hình Onu</Radio>
                            <Radio value={41}>Thay Onu</Radio>
                            <Radio value={12}>Xem Onu chưa config</Radio>
                            <Radio value={22}>Tạo IMS GPON ALU</Radio>
                            <Radio value={33}>Tạo Vlan 3030 ONT iGate</Radio>
                            <Radio value={43}>Tạo Vlan 4001 ONT iGate</Radio>
                        </Space.Compact>
                        <Space.Compact direction="vertical">
                            <Radio value={111}>Xem Seri nhận trên port Onu</Radio>
                            <Radio value={211}>Xem profile Onu</Radio>
                            <Radio value={311}>Xem Mac</Radio>
                            <Radio value={4111}>Cấu hình Onu-Seri-VNPT</Radio>
                            <Radio value={1333}>Set Tốc Độ</Radio>
                            <Radio value={233}>Tìm Onu bằng Sn</Radio>
                            <Radio value={332}>Show DHCP 3830</Radio>
                            <Radio value={422}>Xem Vlan</Radio>
                        </Space.Compact>
                        <Space.Compact direction="vertical">
                            <Button type='primary'> Run </Button>
                        </Space.Compact>
                    </Space>



                </Radio.Group>

            </Card >
        </>


    );
}

export default Home;