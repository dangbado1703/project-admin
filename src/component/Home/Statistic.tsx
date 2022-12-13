import { Column, ColumnConfig } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { getDataStatistic } from "../../pages/Home/home.reducer";
import { useAppDispatch } from "../../store/hooks";
import { Form, Row, Col, DatePicker, Button } from "antd";
import { DATE_FORMAT_TYPE_DDMMYYYY } from "../../utils/contants";
import dayjs from "dayjs";

const Statistic = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [config, setConfig] = useState<ColumnConfig>({
    data: [],
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#fffff",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Tháng",
      },
      sales: {
        alias: "Doanh thu",
      },
    },
  });
  const [valueSearch, setValueSearch] = useState({
    fromDate: "",
    toDate: "",
  });
  useEffect(() => {
    dispatch(getDataStatistic(valueSearch)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setConfig({ ...config, data: res.payload as any[] });
      }
    });
  }, [dispatch, valueSearch]);
  const handleSubmit = (data: any) => {
    setValueSearch({
      fromDate: data.fromDate ? dayjs(data.fromDate).format("DD/MM/YYYY") : "",
      toDate: data.toDate ? dayjs(data.toDate).format("DD/MM/YYYY") : "",
    });
  };
  return (
    <div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <span style={{ fontSize: "30px", fontWeight: 600 }}>
          Thống kê doanh thu
        </span>
      </div>
      <div>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item name="fromDate">
                <DatePicker
                  format={DATE_FORMAT_TYPE_DDMMYYYY}
                  placeholder="Từ tháng"
                  className="date-picker"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="toDate">
                <DatePicker
                  format={DATE_FORMAT_TYPE_DDMMYYYY}
                  placeholder="Đến tháng"
                  className="date-picker"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={4} style={{ textAlign: "end" }}>
              <Form.Item>
                <Button className="search" type="link" htmlType="submit">
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Column {...config} />
    </div>
  );
};

export default Statistic;
