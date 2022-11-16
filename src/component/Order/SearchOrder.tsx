import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
} from "antd";
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
                placeholder="Select status"
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
          <Col span={8}>
            <CommonFormItem
              name="customerId"
              label="Customer"
              isRequired={false}
            >
              <Select
                allowClear
                showSearch
                className="custom-selected"
                placeholder="Select customer"
                filterOption={filterSelectOption}
                options={[]}
              />
            </CommonFormItem>
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
                <Popconfirm
                  placement="topRight"
                  title={
                    selectedRowKeys.length
                      ? "Bạn có chắc muốn xóa những người dùng này không?"
                      : "Vui lòng chọn người dùng"
                  }
                  // onConfirm={handleDelete}
                  cancelText="Hủy"
                  okText="Đồng ý"
                  okButtonProps={{
                    className: "search",
                    style: {
                      height: "28px",
                      fontSize: "14px",
                      borderRadius: 0,
                      display: selectedRowKeys.length ? "" : "none",
                    },
                  }}
                  cancelButtonProps={{
                    className: "delete",
                    style: {
                      height: "28px",
                      fontSize: "14px",
                      borderRadius: 0,
                      display: selectedRowKeys.length ? "" : "none",
                    },
                  }}
                >
                  <Button className="delete">Xóa</Button>
                </Popconfirm>
              </div>
            </CommonFormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchOrder;
