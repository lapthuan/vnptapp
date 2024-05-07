import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Form, Input, Radio } from 'antd';
import { Space } from 'antd';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';


const Bras = () => {
    const [lineData, setLineData] = useState([
        <TerminalOutput>Welcome to the React Terminal UI Demo!&#128075;</TerminalOutput>,
        <TerminalOutput></TerminalOutput>,
        <TerminalOutput>The following example commands are provided:</TerminalOutput>,
        <TerminalOutput>'view-source' will navigate to the React Terminal UI github source.</TerminalOutput>,
        <TerminalOutput>'view-react-docs' will navigate to the react docs.</TerminalOutput>,
        <TerminalOutput>'clear' will clear the terminal.</TerminalOutput>,
    ]);

    const [macAddress, setMacAddress] = useState('');
    const [convertedMacAddress, setConvertedMacAddress] = useState('');
    const handleClick = () => {
        // Concatenate a new line to lineData
        const newLine = <TerminalOutput> $ Hello </TerminalOutput>;
        setLineData(prevLineData => prevLineData.concat(newLine));
        // Alternatively, using spread operator:
        // setLineData(prevLineData => [...prevLineData, newLine]);
    }
    const handleChange = (event) => {
        setMacAddress(event.target.value);
        if (event.target.value !== "") {
            setConvertedMacAddress(convertMacAddress(event.target.value));
            const newLine = <TerminalOutput>$ {convertMacAddress(event.target.value)} </TerminalOutput>;

            setLineData(prevLineData => [...prevLineData, newLine]);
        } else {
            setConvertedMacAddress("")

        }
    };
    // Function to convert MAC address to desired format
    const convertMacAddress = (mac) => {
        const cleanMac = mac.replace(/[^a-zA-Z0-9]/g, '');
        const formattedMac = cleanMac.match(/.{1,2}/g).join(':');
        return formattedMac;
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
                            layout="vertical"
                            size={'small'}
                            className='form-card'

                        >
                            <p>Chức năng</p>
                            <Radio.Group name="chucnang" defaultValue={"clearUser"}>
                                <Radio value={"clearUser"}>Clear User</Radio>
                                <Radio value={"showUser"}>Show User</Radio>
                                <Radio value={"showMac"}>Show Mac</Radio>
                                <Radio value={"blockMac"}>Block Mac</Radio>
                                <Radio value={"clearMac"}>Clear Mac</Radio>
                            </Radio.Group>
                            <p>Bras</p>
                            <Radio.Group name="bras" defaultValue={"clearUser"}>
                                <Radio value={"clearUser"}>Bras 01</Radio>
                                <Radio value={"showUser"}>Bras 02</Radio>
                                <Radio value={"showMac"}>Bras Bến Tre</Radio>

                            </Radio.Group>

                        </Form>
                        <p>Địa chỉ Mac</p>
                        <Space size="middle">
                            <Input
                                type="text"
                                placeholder="Nhập chuỗi 12 ký tự "
                                value={macAddress}
                                onChange={handleChange}
                            />
                            <p> {convertedMacAddress}</p>
                            {/* <Button onClick={() => setMacAddress("")}>Clear</Button> */}
                        </Space>
                    </Card>
                </div>

                <div className='body-terminal'>

                    <Terminal height="40vh" colorMode={ColorMode.Dark} >
                        {lineData}
                    </Terminal>

                    <Button onClick={handleClick} hidden>Bấm vào em nè</Button>

                </div>



            </div>

        </>


    );
}

export default Bras;