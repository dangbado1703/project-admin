import { Button, Col, DatePicker, Form, Popconfirm, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { IFormSearchStaff } from "../../model/Staff.model";
import { IFormProps } from "../../model/utils";
import { deleteUser } from "../../pages/Staff/staff.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";
import { DATE_FORMAT_TYPE_DDMMYYYY } from "../../utils/contants";
import { filterSelectOption, STATUS } from "../../utils/filterOptions";

const SearchStaff = ({
  setValueSearch,
  selectedRowKeys,
  valueSearch,
  setSelectedRowKeys,
}: Omit<
  IFormProps<IFormSearchStaff>,
  "page" | "size" | "setPage" | "setSize"
>) => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const { dataEmail, dataFullName, dataPhone, dataUsername } = useAppSelector(
    (state) => state.staffReducer
  );
  const handleSearch = (data: any) => {
    setValueSearch(data);
  };
  const handleDelete = () => {
    dispatch(deleteUser(selectedRowKeys));
  };
  return (
    <div>
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Row gutter={10}>
          <Col span={8}>
            <CommonFormItem name="username" label="Username" isRequired={false}>
              <Select
                allowClear
                className="custom-selected"
                showSearch
                options={dataUsername}
                filterOption={filterSelectOption}
                placeholder="Username"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem
              name="fullName"
              label="Full Name"
              isRequired={false}
            >
              <Select
                className="custom-selected"
                allowClear
                showSearch
                options={dataFullName}
                filterOption={filterSelectOption}
                placeholder="Full Name"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem name="email" label="Email" isRequired={false}>
              <Select
                className="custom-selected"
                allowClear
                showSearch
                options={dataEmail}
                filterOption={filterSelectOption}
                placeholder="Email"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem name="phone" label="Phone" isRequired={false}>
              <Select
                className="custom-selected"
                allowClear
                showSearch
                options={dataPhone}
                filterOption={filterSelectOption}
                placeholder="Phone"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <Form.Item name="status" label="Status">
              <Select
                className="custom-selected"
                allowClear
                showSearch
                options={STATUS}
                filterOption={filterSelectOption}
                placeholder="Status"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="birthday" label="Sinh nhật">
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
                  Tìm kiếm
                </Button>
                <Popconfirm
                  placement="topRight"
                  title={
                    selectedRowKeys.length
                      ? "Bạn có chắc muốn xóa những người dùng này không?"
                      : "Vui lòng chọn người dùng để xóa"
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

export default SearchStaff;
