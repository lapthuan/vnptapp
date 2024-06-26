import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputNumber, Radio, message } from "antd";
import { Select, Space } from "antd";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import useAsync from "../hook/useAsync";
import ServiceIp from "../service/ServiceIp";
import ServiceVlanIMS from "../service/ServiceVlanIMS";
import ServiceVlanMyTV from "../service/ServiceVlanMyTV";
import ServiceVlanNet from "../service/ServiceVlanNet";
import ServiceDevice from "../service/ServiceDevice";
import { useForm } from "antd/es/form/Form";
import ServiceGpon from "../service/ServiceGpon";

const Gpon = () => {
  const [lineData, setLineData] = useState([
    <TerminalOutput>{"typ:isadmin>#"}</TerminalOutput>,
  ]);
  const [deviceType, setDeviceType] = useState("");
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [selectDevices, setSelectDevices] = useState();
  const [radioValue, setRadioValue] = useState(null);
  const { data: dataIp, loading: loadingIp } = useAsync(() =>
    ServiceIp.getAllIp()
  );
  const { data: dataVlanIMS, loading: loadingVlanIMS } = useAsync(() =>
    ServiceVlanIMS.getAllVlanIMS()
  );
  const { data: dataVlanMyTV, loading: loadingVlanMyTV } = useAsync(() =>
    ServiceVlanMyTV.getAllVlanMyTV()
  );
  const { data: dataVlanNet, loading: loadingVlanNet } = useAsync(() =>
    ServiceVlanNet.getAllVlanNet()
  );
  const [form] = useForm();
  const [form2] = useForm();

  const controlGpon = async (mytv, net, ims, ip, loaithietbi, form2Values) => {
    const data = {
      ipaddress: ip,
      commands: radioValue,
      device_types: loaithietbi,
      card: form2Values.card ? form2Values.card : 0,
      port: form2Values.port ? form2Values.port : 0,
      onu: form2Values.onuId ? form2Values.onuId : 0,
      slid: form2Values.slId ? form2Values.slId : 0,
      vlanims: ims,
      vlanmytv: mytv,
      vlannet: net,
    };

    const res = await ServiceGpon.ControlGpon(data);

    const newLine = (
      <TerminalOutput> {res.detail.map((item) => item)}</TerminalOutput>
    );
    setLineData((prevLineData) => prevLineData.concat(newLine));
  };

  const handleRun = async () => {
    try {
      const formValues = await form.validateFields();
      const form2Values = await form2.validateFields();
      if (radioValue === null) {
        message.error("Vui lòng chọn một chức năng.");
        return;
      }
      console.log(form2Values);
      if (radioValue !== "sync_password") {
        if (
          form2Values.card === undefined ||
          form2Values.port === undefined ||
          form2Values.onuId === undefined
        ) {
          message.warning("Nhập thiếu thông tin");
          return;
        }
      }
      if (radioValue === "create_dvnet") {
        if (form2Values.slId === undefined) {
          message.warning("Nhập thiếu SLID");
          return;
        }
        if (
          form2Values.slId.toString().length < 6 ||
          form2Values.slId.toString().length > 10
        ) {
          message.warning("SLID phải bao gồm 6 đến 10 ký tự");
          return;
        }
      }
      const newLine = <TerminalOutput>{"typ:isadmin># ..."}</TerminalOutput>;
      setLineData((prevLineData) => prevLineData.concat(newLine));
      const device = devices.find((item) => item._id === formValues.deviceName);
      const ip = dataIp.find((item) => item._id === formValues.ipaddress);
      const mytv = dataVlanMyTV.find(
        (item) => item._id === formValues.vlanmytv
      );
      const net = dataVlanNet.find((item) => item._id === formValues.vlannet);
      const ims = dataVlanIMS.find((item) => item._id === formValues.vlanims);

      controlGpon(
        mytv.number,
        net.number,
        ims.number,
        ip.ipaddress,
        device.loaithietbi,
        form2Values
      );
      // Process the collected data as needed
    } catch (error) {
      console.error("Validation failed:", error);
      message.error("Vui lòng điền đầy đủ thông tin.");
    }
  };

  useEffect(() => {
    if (deviceType) {
      setLoadingDevices(true);
      const getDevice = async () => {
        const res = await ServiceDevice.getDevice(deviceType);

        setDevices(res);
        setLoadingDevices(false);
      };
      getDevice();
    }
  }, [deviceType]);

  useEffect(() => {
    if (selectDevices) {
      const getADV = async () => {
        const res = await ServiceDevice.getADevice(selectDevices);
        form.setFieldsValue({
          ipaddress: res.ipaddress,
          vlanims: res.vlanims,
          vlanmytv: res.vlanmytv,
          vlannet: res.vlannet,
        });
      };

      getADV();
    }
  }, [selectDevices, form]);

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
              form={form}
              labelCol={{ span: 10 }}
              initialValues={{
                size: "small",
              }}
              layout="horizontal"
              size={"small"}
              className="form-card"
            >
              <Form.Item
                label="Loại thiết bị"
                className="select-item"
                name="deviceType"
                rules={[
                  { required: true, message: "Vui lòng chọn loại thiết bị" },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => setDeviceType(value)}
                  placeholder="Chọn loại thiết bị"
                >
                  <Select.Option value="GPON ALU">GPON ALU</Select.Option>
                  <Select.Option value="GPON HW">GPON HW</Select.Option>
                  <Select.Option value="GPON MINI ZTE">
                    GPON Mini ZTE
                  </Select.Option>
                  <Select.Option value="GPON ZTE">GPON ZTE</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Thiết bị"
                className="select-item"
                name="deviceName"
                rules={[{ required: true, message: "Vui lòng chọn thiết bị" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Chọn thiết bị"
                  onChange={(value) => setSelectDevices(value)}
                  loading={loadingDevices}
                >
                  {devices.map((device) => (
                    <Select.Option key={device._id} value={device._id}>
                      {device.tenthietbi}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Ip"
                name="ipaddress"
                className="select-item"
                rules={[{ required: true, message: "Vui lòng chọn Ip" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Chọn Ip"
                  loading={loadingIp}
                >
                  {dataIp?.map((item, i) => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.ipaddress}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Vlan Net"
                name="vlannet"
                className="select-item"
                rules={[{ required: true, message: "Vui lòng chọn Vlan Net" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Chọn Vlan Net"
                  loading={loadingVlanNet}
                >
                  {dataVlanNet?.map((item, i) => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.number}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Vlan Mytv"
                name="vlanmytv"
                className="select-item"
                rules={[{ required: true, message: "Vui lòng chọn Vlan Mytv" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Chọn Vlan Mytv"
                  loading={loadingVlanMyTV}
                >
                  {dataVlanMyTV?.map((item, i) => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.number}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Vlan IMS"
                name="vlanims"
                className="select-item"
                loading={loadingVlanIMS}
                rules={[{ required: true, message: "Vui lòng chọn Vlan IMS" }]}
              >
                <Select placeholder="Chọn Vlan IMS">
                  {dataVlanIMS?.map((item, i) => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.number}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </div>

        <div className="body-terminal">
          <Terminal
            style={{ maxWidth: "150px" }}
            height="40vh"
            colorMode={ColorMode.Dark}
          >
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
      <Card bordered={true} title="Chức năng">
        <Radio.Group onChange={(e) => setRadioValue(e.target.value)}>
          <Space>
            <Space.Compact direction="vertical">
              <Radio value={"sync_password"}>Xem Password đồng bộ</Radio>
              <Radio value={"delete_port"}>Xóa Port</Radio>
              <Radio value={"check_mac"}>Xem Mac</Radio>
              <Radio value={"create_dvnet"}>Tạo DV_NET</Radio>
              <Radio value={"dv_mytv"}>Tạo DV_MYTV</Radio>
              <Radio value={"dv_ims"}>Tạo DV_IMS</Radio>
              <Radio value={"check_capacity"}>Kiểm tra công suất</Radio>
              <Radio value={"status_port"}>
                Xem trạng thái port (GPON ALU)
              </Radio>
              {/* <Radio value={43}>Tạo Vlan 4001 ONT iGate</Radio> */}
            </Space.Compact>
            {/* <Space.Compact direction="vertical">
              <Radio value={111}>Xem Seri nhận trên port Onu</Radio>
              <Radio value={211}>Xem profile Onu</Radio>
              <Radio value={4111}>Cấu hình Onu-Seri-VNPT</Radio>
              <Radio value={1333}>Set Tốc Độ</Radio>
              <Radio value={233}>Tìm Onu bằng Sn</Radio>
              <Radio value={332}>Show DHCP 3830</Radio>
              <Radio value={422}>Xem Vlan</Radio>
            </Space.Compact> */}

            <Space.Compact direction="vertical">
              <Form
                labelCol={{ span: 10 }}
                initialValues={{
                  size: "small",
                }}
                layout="horizontal"
                size={"small"}
                className="form-card"
                form={form2}
              >
                <Form.Item label="Card" name="card" className="select-item">
                  <InputNumber placeholder="Nhập Card" />
                </Form.Item>
                <Form.Item label="Port" name="port" className="select-item">
                  <InputNumber placeholder="Nhập Port" />
                </Form.Item>
                <Form.Item label="Onu ID" name="onuId" className="select-item">
                  <InputNumber placeholder="Nhập Onu ID" />
                </Form.Item>
                <Form.Item label="SL ID" name="slId" className="select-item">
                  <InputNumber placeholder="Nhập SL ID" />
                </Form.Item>
              </Form>
            </Space.Compact>
            <Space.Compact align="center">
              <Button type="primary" onClick={handleRun}>
                {" "}
                Run{" "}
              </Button>
            </Space.Compact>
          </Space>
        </Radio.Group>
      </Card>
    </>
  );
};

export default Gpon;
