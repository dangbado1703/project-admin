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
import { Key } from "antd/es/table/interface";
import React, { useState } from "react";
import { IFormSearchVoucher } from "../../model/Voucher.model";
import { changeAction } from "../../pages/Voucher/voucher.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";
import { path } from "../../router/path";
import { DATE_FORMAT_TYPE_DDMMYYYY } from "../../utils/contants";
import { filterSelectOption, STATUS } from "../../utils/filterOptions";
import { useNavigate } from "react-router-dom";

interface IFormProps {
  setValueSearch: React.Dispatch<React.SetStateAction<IFormSearchVoucher>>;
  page: number;
  size: number;
  selectedRowKeys: Key[];
}
const SearchVoucher = ({
  setValueSearch,
  page,
  size,
  selectedRowKeys,
}: IFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = (data: any) => {
    setValueSearch(data);
  };
  const handleDelete = () => {};
  
const [isOpen, setIsOpen] = useState(false);
const dispatch = useAppDispatch();
  const handleOpenAddNew = () => {
    navigate(path.createVoucher);
  }
  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={10}>
          <Col span={12}>
            <CommonFormItem
              name="code"
              label="Mã khuyến mại"
              isRequired={false}
            >
              <Input placeholder="Mã khuyến mại" />
            </CommonFormItem>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="Trạng thái">
              <Select
                className="custom-selected"
                allowClear
                showSearch
                options={STATUS}
                filterOption={filterSelectOption}
                placeholder="Trạng thái"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <CommonFormItem name="fromPrice" label="Giá từ" isRequired={false}>
              <Input placeholder="Giá từ" />
            </CommonFormItem>
          </Col>
          <Col span={6}>
            <CommonFormItem name="toPrice" label="Giá đến" isRequired={false}>
              <Input placeholder="Giá đến" />
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
                <Button className="search" onClick={handleOpenAddNew}>Thêm mới</Button>
                <Popconfirm
                  title={
                    selectedRowKeys.length
                      ? "Bạn có chắc muốn xóa những sản phẩm này không?"
                      : "Vui lòng chọn sản phẩm"
                  }
                  onConfirm={handleDelete}
                  cancelText="Hủy"
                  okText="Đồng ý"
                  okButtonProps={{
                    className: "search",
                    style: {
                      height: "28px",
                      fontSize: "14px",
                      borderRadius: 0,
                    },
                  }}
                  cancelButtonProps={{
                    className: "delete",
                    style: {
                      height: "28px",
                      fontSize: "14px",
                      borderRadius: 0,
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

export default SearchVoucher;
