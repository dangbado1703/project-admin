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
import { Key } from "antd/lib/table/interface";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFormSearchProduct } from "../../model/Product.model";
import { path } from "../../router/path";
import { useAppSelector } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";
import { DATE_FORMAT_TYPE_DDMMYYYY } from "../../utils/contants";
import { filterSelectOption } from "../../utils/filterOptions";
import SelectCommon from "../../utils/SelectCommon";

interface IFormProps {
  setValueSearch: React.Dispatch<React.SetStateAction<IFormSearchProduct>>;
  page: number;
  size: number;
  selectedRowKeys: Key[];
}
const SearchProduct = ({
  setValueSearch,
}: IFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { dataMake, dataProductType, dataCode, dataName, dataCreated } =
    useAppSelector((state) => state.productReducer);
  const handleSubmit = (data: any) => {
    setValueSearch(data);
  };
  const handleAddNew = () => {
    navigate(path.addnewProduct)
  }
  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={10}>
          <Col span={6}>
            <CommonFormItem name="name" label="Product Name" isRequired={false}>
              <SelectCommon
                options={dataName}
                filterOption={filterSelectOption}
                placeholder="Product Name"
              />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <CommonFormItem name="code" label="Product Code" isRequired={false}>
              <SelectCommon
                className="custom-selected"
                options={dataCode}
                filterOption={filterSelectOption}
                allowClear
                showSearch
                placeholder="Product Code"
              />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <CommonFormItem
              name="fromPrice"
              label="From Price"
              isRequired={false}
            >
              <Input placeholder="From Price" />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <CommonFormItem name="toPrice" label="To Price" isRequired={false}>
              <Input placeholder="To Price" />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <CommonFormItem
              name="fromStockQty"
              label="From StockQty"
              isRequired={false}
            >
              <Input placeholder="From StockQty" />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <CommonFormItem
              name="toStockQty"
              label="To StockQty"
              isRequired={false}
            >
              <Input placeholder="To StockQty" />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <CommonFormItem name="makeId" label="Make Name" isRequired={false}>
              <SelectCommon
                options={dataMake}
                className="custom-selected"
                filterOption={filterSelectOption}
                allowClear
                showSearch
                placeholder="Make Name"
              />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <CommonFormItem
              name="productTypeId"
              label="Product Type"
              isRequired={false}
            >
              <SelectCommon
                options={dataProductType}
                className="custom-selected"
                filterOption={filterSelectOption}
                allowClear
                showSearch
                placeholder="Product Type"
              />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <CommonFormItem
              name="created"
              label="Created By"
              isRequired={false}
            >
              <SelectCommon
                className="custom-selected"
                options={dataCreated}
                filterOption={filterSelectOption}
                allowClear
                showSearch
                placeholder="Created By"
              />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <Form.Item name="expiredDate" label="Expired Date">
              <DatePicker
                format={DATE_FORMAT_TYPE_DDMMYYYY}
                allowClear
                className="date-picker"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="fromDate" label="From Date">
              <DatePicker
                format={DATE_FORMAT_TYPE_DDMMYYYY}
                allowClear
                className="date-picker"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="toDate" label="To Date">
              <DatePicker
                format={DATE_FORMAT_TYPE_DDMMYYYY}
                allowClear
                className="date-picker"
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
                  T??m ki???m
                </Button>
                <Button className="search" onClick={handleAddNew}>Th??m m???i</Button>
              </div>
            </CommonFormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchProduct;
