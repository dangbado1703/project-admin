import { Button, Col, DatePicker, Form, Popconfirm, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { IFormSearchDanhMuc } from "../../model/DanhMuc.model";
import { IFormProps } from "../../model/utils";
import { changeAction, getCode, getCreatedBy, getDanhMuc, getName, getParent } from "../../pages/DanhMuc/danhmuc.reducer";
import { deleteUser, getUser } from "../../pages/Staff/staff.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";
import { DATE_FORMAT_TYPE_DDMMYYYY } from "../../utils/contants";
import { filterSelectOption, STATUS } from "../../utils/filterOptions";
import ViewModal from "./ViewModal";

const FormSearch = ({
  setValueSearch,
  selectedRowKeys,
  valueSearch,
  setSelectedRowKeys,
}: Omit<
  IFormProps<IFormSearchDanhMuc>,
  "page" | "size" | "setPage" | "setSize"
>) => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { dataCode, dataName, dataCreatedBy, dataParent } = useAppSelector(
    (state) => state.danhMucReducer
  );
console.log("dataCode= ", dataCode);
console.log("dataName= ", dataName);
console.log("dataParent= ", dataParent);
  const handleSearch = (data: any) => {
    setValueSearch(data);
  };
  const handleDelete = () => {
    dispatch(deleteUser(selectedRowKeys)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setSelectedRowKeys([]);
        dispatch(getDanhMuc(valueSearch));
      }
    });
  };
  const handleOpenAddNew = () => {
    setIsOpen(true);
    dispatch(changeAction("add"));
  };
  return (
    <div>
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Row gutter={10}>
          <Col span={8}>
            <CommonFormItem name="code" label="Mã danh mục" isRequired={false}>
              <Select
                allowClear
                className="custom-selected"
                showSearch
                options={dataCode}
                filterOption={filterSelectOption}
                placeholder="Mã danh mục"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem
              name="name"
              label="Tên danh mục"
              isRequired={false}
            >
              <Select
                className="custom-selected"
                allowClear
                showSearch
                options={dataName}
                filterOption={filterSelectOption}
                placeholder="Tên danh mục"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem name="createdBy" label="Người tạo" isRequired={false}>
              <Select
                className="custom-selected"
                allowClear
                showSearch
                options={dataCreatedBy}
                filterOption={filterSelectOption}
                placeholder="Người tạo"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
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
          <Col span={8}>
            <Form.Item name="parent" label="Danh mục cha">
              <Select
                className="custom-selected"
                allowClear
                showSearch
                options={dataParent}
                filterOption={filterSelectOption}
                placeholder="Danh mục cha"
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
                <Button className="search" onClick={handleOpenAddNew}>Thêm mới</Button>
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
      <ViewModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        valueSearch={valueSearch}
      />
    </div>
  );
};

export default FormSearch;
