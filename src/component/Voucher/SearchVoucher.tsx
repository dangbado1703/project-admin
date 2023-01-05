import {
  Button,
  Col, Form,
  Input,
  Popconfirm,
  Row,
  Select
} from "antd";
import { Key } from "antd/lib/table/interface";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IFormSearchVoucher } from "../../model/Voucher.model";
import { path } from "../../router/path";
import {
  filterSelectOption,
  STATUS,
  TYPEVOUCHER
} from "../../utils/filterOptions";

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
  const handleSubmit = (data: any) => {
    setValueSearch(data);
  };
  const nagivate = useNavigate();
  const handleDelete = () => {};
  const addVoucher = () => {
    nagivate(path.addVoucher);
  };
  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              name="code"
              label="Mã khuyến mại"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Mã khuyến mại" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="Trạng thái">
              <Select
                showArrow={false}
                allowClear
                showSearch
                filterOption={filterSelectOption}
                className="custom-select"
                options={STATUS}
                placeholder="Trạng thái"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="type" label="Loại khuyến mãi">
              <Select
                showArrow={false}
                allowClear
                showSearch
                filterOption={filterSelectOption}
                className="custom-select"
                options={TYPEVOUCHER}
                placeholder="Loại khuyến mãi"
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
            <Form.Item>
              <div className="button-group">
                <div>
                  <Button htmlType="submit" className="search">
                    Tìm kiếm
                  </Button>
                </div>
                <div>
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
                    <Button
                      className="delete"
                      style={{ backgroundColor: "#de334d" }}
                    >
                      Xóa
                    </Button>
                  </Popconfirm>
                  <Button className="search" onClick={addVoucher}>
                    Thêm mới
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchVoucher;
