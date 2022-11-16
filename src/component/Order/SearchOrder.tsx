import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";
import { IFormSearchOrder } from "../../model/Order.model";
import { IFormProps } from "../../model/utils";
import CommonFormItem from "../../utils/CommonFormItem";
import { DATE_FORMAT_TYPE_DDMMYYYY, STATUS_ORDER } from "../../utils/contants";
import { filterSelectOption } from "../../utils/filterOptions";

const SearchOrder = ({
  setValueSearch,
  selectedRowKeys,
  valueSearch,
  setSelectedRowKeys,
}: Omit<
  IFormProps<IFormSearchOrder>,
  "page" | "size" | "setPage" | "setSize"
>) => {
  const [form] = Form.useForm();
  const handleSearch = (data: any) => {
    console.log("data", data);
  };
  return (
    <div>
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Row gutter={10}>
          <Col span={8}>
            <CommonFormItem
              name="statusOrder"
              label="Status Order"
              isRequired={false}
            >
              <Select
                className="custom-selected"
                showSearch
                allowClear
                filterOption={filterSelectOption}
                options={STATUS_ORDER}
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem
              name="fromPrice"
              label="From Price"
              isRequired={false}
            >
              <Input />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem name="toPrice" label="To Price" isRequired={false}>
              <Input />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <Form.Item label="From Date" name="fromDate">
              <DatePicker
                format={DATE_FORMAT_TYPE_DDMMYYYY}
                allowClear
                className="date-picker"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="To Date" name="toDate">
              <DatePicker
                format={DATE_FORMAT_TYPE_DDMMYYYY}
                allowClear
                className="date-picker"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchOrder;
