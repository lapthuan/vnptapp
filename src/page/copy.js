import React, { useState } from "react";
import { Button, Card, Form, Input, Radio, message } from "antd";
import { Space } from "antd";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import ServiceBras from "../service/ServiceBras";
import { useForm } from "antd/es/form/Form";

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
  const [userFileDisabled, setUserFileDisabled] = useState(true);
  const [fileUserBras, setFileUserBras] = useState(""); // Thêm state để lưu danh sách người dùng từ file
  const [form] = useForm();

  const handleClick = () => {
    const newLine = (
      <TerminalOutput key={lineData.length}>$ Hello</TerminalOutput>
    );
    setLineData((prevLineData) => prevLineData.concat(newLine));
  };

  const controlBras = async (data) => {
    const res = await ServiceBras.ControlBras(data);
    if (res.data && Array.isArray(res.data)) {
      const newLine = (
        <TerminalOutput key={lineData.length}>
          {res.data.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </TerminalOutput>
      );
      setLineData((prevLineData) => prevLineData.concat(newLine));
      console.log(lineData);
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
      let data = {};

      // Kiểm tra xem người dùng đã chọn chức năng hay chưa
      if (radioValue === null && fileUserBras === "") {
        message.error(
          "Vui lòng chọn một chức năng hoặc đọc file danh sách người dùng."
        );
        return;
      }

      // Kiểm tra xem người dùng đã chọn file hay chưa
      if (fileUserBras !== "") {
        const usernames = fileUserBras
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        // Kiểm tra các username có hợp lệ không
        if (usernames.some((username) => /[^a-zA-Z0-9_.,-]/.test(username))) {
          message.error("File chứa username không hợp lệ.");
          return;
        }

        // Format lại data body từ danh sách username trong file
        const formattedUsernames = `[${usernames.join(",")}]`;
        data = {
          command: "clear_user_bras",
          username_bras: formattedUsernames,
        };
      } else {
        // Kiểm tra xem người dùng đã nhập thông tin cần thiết hay chưa
        const formValues = await form.validateFields();

        if (
          radioValue === "check_auth_mac" ||
          radioValue === "check_lock_mac"
        ) {
          if (convertedMacAddress.length !== 17) {
            message.error("Địa chỉ MAC phải đủ 12 ký tự.");
            return;
          }
          data = { command: radioValue, mac: convertedMacAddress };
        } else if (radioValue === "check_user_bras") {
          if (userBras === "") {
            message.error("Vui lòng nhập username.");
            return;
          }
          data = { command: "check_user_bras", username_bras: userBras };
        } else if (radioValue === "clear_user_bras") {
          if (userBras === "") {
            message.error("Vui lòng nhập username.");
            return;
          }

          if (/[;:!$+={}''""\s]/.test(userBras)) {
            message.warning(
              "Các username phải được ngăn cách nhau bởi dấu phẩy (,). Vui lòng kiểm tra lại."
            );
            return;
          }

          const usernames = userBras.split(",").map((user) => user.trim());
          if (usernames.length === 1) {
            const formattedUsernames = `[${usernames.join(",")}]`;
            data = {
              command: "clear_user_bras",
              username_bras: formattedUsernames,
            };
          }

          if (usernames.length > 1 && !userBras.includes(",")) {
            message.error("Các username được ngăn cách nhau bởi dấu phẩy (,).");
            return;
          }

          const formattedUsernames = `[${usernames.join(",")}]`;
          data = {
            command: "clear_user_bras",
            username_bras: formattedUsernames,
          };
        } else {
          data = { command: radioValue };
        }
      }

      const newLine = (
        <TerminalOutput key={lineData.length}>...</TerminalOutput>
      );
      setLineData((prevLineData) => prevLineData.concat(newLine));
      console.log(data);
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
      setUserFileDisabled(true);
    } else if (value === "check_user_bras" || value === "clear_user_bras") {
      setMacAddress("");
      setFileUserBras("");
      setUserDisabled(false);
      setMacDisabled(true);
      setUserFileDisabled(true);
    } else if (value === "clear_user_bras_file") {
      setMacAddress("");
      setUserBras("");
      setUserDisabled(true);
      setMacDisabled(true);
      setUserFileDisabled(false);
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

  // Xử lý đọc file txt
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setFileUserBras(text); // Lưu nội dung tệp vào state
      };
      reader.readAsText(file);
    }
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
              <Radio value="clear_user_bras_file">
                Clear xác thực user trên BRAS <strong>(File)</strong>
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
            <div>
              <p>Chọn file chứa danh sách tên người dùng</p>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                disabled={userFileDisabled}
              />
            </div>
          </Form>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" onClick={handleRun}>
              Run
            </Button>
          </div>
        </Card>
      </div>

      <div className="body-terminal">
        <Terminal height="65vh" lineData={lineData} />
      </div>
    </div>
  );
};

export default Bras;
