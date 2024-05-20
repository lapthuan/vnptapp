import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Form, Input, Radio, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { Space } from "antd";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import ServiceBras from "../service/ServiceBras";

const Bras = () => {
  const [lineData, setLineData] = useState([
    <TerminalOutput>Chào mừng đến với Auto Bras</TerminalOutput>,
  ]);

  const [macAddress, setMacAddress] = useState("");
  const [convertedMacAddress, setConvertedMacAddress] = useState("");
  const [radioValue, setRadioValue] = useState(null);
  const [form] = useForm();
  const handleClick = () => {
    // Concatenate a new line to lineData
    const newLine = <TerminalOutput> $ Hello </TerminalOutput>;
    setLineData((prevLineData) => prevLineData.concat(newLine));
    // Alternatively, using spread operator:
    // setLineData(prevLineData => [...prevLineData, newLine]);
  };

  const controlBras = async (mac) => {
    const data = {
      command: radioValue,
      mac: mac,
    };
    const res = await ServiceBras.ControlBras(data);
    console.log(res);
    const newLine = (
      <TerminalOutput> {res.detail.data.map((item) => item)}</TerminalOutput>
    );
    setLineData((prevLineData) => prevLineData.concat(newLine));
  };

  const handleRun = async () => {
    try {
      const formValues = await form.validateFields();
      if (radioValue === null) {
        message.error("Vui lòng chọn một chức năng.");
        return;
      }
      if (convertedMacAddress.length !== 17) {
        message.error("Địa chỉ MAC phải đủ 12 ký tự.");
        return;
      }

      const newLine = <TerminalOutput>{"..."}</TerminalOutput>;
      setLineData((prevLineData) => prevLineData.concat(newLine));

      controlBras(convertedMacAddress);
      // Process the collected data as needed
    } catch (error) {
      console.error("Validation failed:", error);
      message.error("Vui lòng điền đầy đủ thông tin.");
    }
  };

  const handleChange = (event) => {
    setMacAddress(event.target.value);
    if (event.target.value !== "") {
      setConvertedMacAddress(convertMacAddress(event.target.value));
    } else {
      setConvertedMacAddress("");
    }
  };
  // Function to convert MAC address to desired format
  const convertMacAddress = (mac) => {
    const cleanMac = mac.replace(/[^a-zA-Z0-9]/g, "");
    const formattedMac = cleanMac.match(/.{1,2}/g).join(":");
    return formattedMac;
  };

  const handleClear = () => {
    setLineData([<TerminalOutput>$</TerminalOutput>]);
  };

  return (
    <>
      <div className="body-home">
        <div className="body-ts">
          <Card
            title="Thông số"
            bordered={true}
            style={{ width: 400, margin: "auto" }}
          >
            <Form
              labelCol={{ span: 10 }}
              initialValues={{
                size: "small",
              }}
              layout="vertical"
              size={"small"}
              className="form-card"
              form={form}
            >
              <p>Chức năng</p>
              <Radio.Group onChange={(e) => setRadioValue(e.target.value)}>
                <Radio value={"check_auth_mac"}>Kiểm tra xác thực</Radio>
                <Radio value={"check_lock_mac"}>
                  Kiểm tra mac bị khóa trên BRAS
                </Radio>
                <Radio value={"clear_in_bras"}>Clear BRAS</Radio>
              </Radio.Group>
              <p>Địa chỉ Mac</p>
              <Space size="middle">
                <Input
                  type="text"
                  placeholder="Nhập chuỗi 12 ký tự "
                  value={macAddress}
                  onChange={handleChange}
                />
                <p> {convertedMacAddress}</p>
              </Space>
            </Form>
            <Button onClick={handleRun}>Run</Button>
          </Card>
        </div>

        <div className="body-terminal">
          <Terminal height="65vh" colorMode={ColorMode.Dark}>
            {lineData}
          </Terminal>
          <div style={{ paddingTop: 5 }}>
            <Button style={{ marginLeft: "94%" }} onClick={handleClear}>
              {" "}
              Clear{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bras;
