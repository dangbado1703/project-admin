import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { IFormSearchOrder } from "../../model/Order.model";
import { getUserOrder } from "../../pages/Order/order.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";
import { DATE_FORMAT_TYPE_DDMMYYYY, STATUS_ORDER } from "../../utils/contants";
import SelectCommon from "../../utils/SelectCommon";

const SearchOrder = ({
  setValueSearch,
}: {
  setValueSearch: React.Dispatch<React.SetStateAction<IFormSearchOrder>>;
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { dataUserOrder } = useAppSelector((state) => state.orderReducer);
  useEffect(() => {
    dispatch(getUserOrder());
  }, []);
  const handleSearch = (data: any) => {
    setValueSearch(data);
  };

  return (
    <div>
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item name="customerId">
              <SelectCommon
                options={dataUserOrder}
                placeholder="Người đặt hàng"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="fromDate">
              <DatePicker
                format={DATE_FORMAT_TYPE_DDMMYYYY}
                allowClear
                className="date-picker"
                placeholder="Ngày đặt từ"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="toDate">
              <DatePicker
                format={DATE_FORMAT_TYPE_DDMMYYYY}
                allowClear
                className="date-picker"
                placeholder="Ngày đặt đến"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <CommonFormItem name="fromPrice" isRequired={false}>
              <Input placeholder="Giá trị đơn hàng từ" type="number" />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem name="toPrice" isRequired={false}>
              <Input placeholder="Giá trị đơn hàng đến" type="number" />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <Form.Item name="status">
              <SelectCommon
                placeholder="Trạng thái đơn hàng"
                options={STATUS_ORDER}
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <CommonFormItem isRequired={false}>
              <div>
                <Button htmlType="submit" className="search">
                  Tìm kiếm
                </Button>
              </div>
            </CommonFormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchOrder;
