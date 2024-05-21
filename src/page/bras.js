import React, { useState } from "react";
import { Button, Card, Flex, Form, Input, Radio, message } from "antd";
import { Space } from "antd";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import ServiceBras from "../service/ServiceBras";
import { useForm } from "antd/es/form/Form";
import Title from "antd/es/skeleton/Title";

const Bras = () => {
  const [lineData, setLineData] = useState([
    <TerminalOutput key="welcome">Chào mừng đến với Auto Bras</TerminalOutput>,
  ]);

  const [macAddress, setMacAddress] = useState("");
  const [userBras, setUserBras] = useState("");
  const [convertedMacAddress, setConvertedMacAddress] = useState("");
  const [radioValue, setRadioValue] = useState(null);
  const [macDisabled, setMacDisabled] = useState(true);
  const [userDisabled, setUserDisabled] = useState(true);
  const [form] = useForm();

  const handleClick = () => {
    const newLine = (
      <TerminalOutput key={lineData.length}>$ Hello</TerminalOutput>
    );
    setLineData((prevLineData) => prevLineData.concat(newLine));
  };

  const controlBras = async (data) => {
    const res = await ServiceBras.ControlBras(data);
    if (res.detail && Array.isArray(res.detail.data)) {
      const newLine = (
        <TerminalOutput key={lineData.length}>
          {res.detail.data.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </TerminalOutput>
      );
      setLineData((prevLineData) => prevLineData.concat(newLine));
    } else {
      const newLine = (
        <TerminalOutput key={lineData.length}>
          {"Unexpected response format"}
        </TerminalOutput>
      );
      setLineData((prevLineData) => prevLineData.concat(newLine));
    }
  };

  const handleRun = async () => {
    try {
      const formValues = await form.validateFields();
      if (radioValue === null) {
        message.error("Vui lòng chọn một chức năng.");
        return;
      }

      let data = {};
      if (radioValue === "check_auth_mac" || radioValue === "check_lock_mac") {
        if (convertedMacAddress.length !== 17) {
          message.error("Địa chỉ MAC phải đủ 12 ký tự.");
          return;
        }
        data = { command: radioValue, mac: convertedMacAddress };
      } else if (
        radioValue === "check_user_bras" ||
        radioValue === "clear_user_bras"
      ) {
        if (userBras === "") {
          message.error("Vui lòng nhập username.");
          return;
        }
        data = { command: radioValue, username_bras: userBras };
      } else {
        data = { command: radioValue };
      }

      const newLine = (
        <TerminalOutput key={lineData.length}>...</TerminalOutput>
      );
      setLineData((prevLineData) => prevLineData.concat(newLine));

      controlBras(data);
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

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setRadioValue(value);
    if (value === "check_auth_mac" || value === "check_lock_mac") {
      setUserBras("");
      setMacDisabled(false);
      setUserDisabled(true);
    } else if (value === "check_user_bras" || value === "clear_user_bras") {
      setMacAddress("");
      setMacDisabled(true);
      setUserDisabled(false);
    } else {
      setMacDisabled(true);
      setUserDisabled(true);
    }
  };

  const convertMacAddress = (mac) => {
    const cleanMac = mac.replace(/[^a-zA-Z0-9]/g, "");
    const formattedMac = cleanMac.match(/.{1,2}/g).join(":");
    return formattedMac;
  };

  const handleClear = () => {
    setLineData([<TerminalOutput key="$">$</TerminalOutput>]);
  };

  return (
    <div className="body-home">
      <div className="body-ts">
        <Card
          title="Chức năng"
          bordered={true}
          style={{ width: 400, margin: "auto" }}
        >
          <Form
            labelCol={{ span: 10 }}
            initialValues={{ size: "small" }}
            layout="vertical"
            size="small"
            className="form-card"
            form={form}
          >
            <Radio.Group onChange={handleRadioChange}>
              <Radio value="check_auth_mac">Kiểm tra xác thực MAC</Radio>
              <Radio value="check_lock_mac">
                Kiểm tra mac bị khóa trên BRAS
              </Radio>
              <Radio value="check_user_bras">Kiểm tra user trên BRAS</Radio>
              <Radio value="clear_user_bras">
                Clear xác thực user trên BRAS
              </Radio>

              <Radio value="clear_in_bras">Clear BRAS</Radio>
            </Radio.Group>

            <Space size="middle">
              <div>
                <p>Địa chỉ MAC:</p>

                <Input
                  type="text"
                  placeholder="Nhập chuỗi 12 ký tự "
                  value={macAddress}
                  onChange={handleChange}
                  disabled={macDisabled}
                />
              </div>
              <div>
                <p>Username:</p>
                <Input
                  type="text"
                  placeholder="Nhập username"
                  value={userBras}
                  onChange={(e) => setUserBras(e.target.value)}
                  disabled={userDisabled}
                />
              </div>
            </Space>
          </Form>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" onClick={handleRun}>
              Run
            </Button>
          </div>
        </Card>
      </div>

      <div className="body-terminal">
        <Terminal height="65vh" colorMode={ColorMode.Dark}>
          {lineData}
        </Terminal>
        <div style={{ paddingTop: 5 }}>
          <Button style={{ marginLeft: "94%" }} onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bras;
