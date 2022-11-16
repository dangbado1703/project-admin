import { Button, Col, Form, Radio, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { IFormSearchStaff } from "../../model/Staff.model";
import { IFormProps } from "../../model/utils";
import { changeAction, deleteUser, getUser } from "../../pages/Staff/staff.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";
import { STATUS } from "../../utils/filterOptions";
import SelectCommon from "../../utils/SelectCommon";
import ViewModal from "./ViewModal";

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
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch();
  const { dataEmail, dataFullName, dataPhone, dataUsername, dataRole } = useAppSelector(
    (state) => state.staffReducer
  );
  const handleSearch = (data: any) => {
    setValueSearch(data);
  };
  const handleDelete = () => {
    dispatch(deleteUser(selectedRowKeys)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setSelectedRowKeys([]);
        dispatch(getUser(valueSearch));
      }
    });
  };
  const handleOpenAddNew = () => {
    setIsOpen(true)
    dispatch(changeAction('addnew'))
  }
  return (
    <div>
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Row gutter={10}>
          <Col span={8}>
            <CommonFormItem name="username" label="Tên đăng nhập" isRequired={false}>
              <SelectCommon
                options={dataUsername}
                placeholder="Username"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem
              name="fullName"
              label="Họ tên"
              isRequired={false}
            >
              <SelectCommon
                options={dataFullName}
                placeholder="Full Name"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem name="email" label="Email" isRequired={false}>
              <SelectCommon
                options={dataEmail}
                placeholder="Email"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <CommonFormItem name="phone" label="Số điện thoại" isRequired={false}>
              <SelectCommon
                options={dataPhone}
                placeholder="Phone"
              />
            </CommonFormItem>
          </Col>
          <Col span={8}>
            <Form.Item name="status" label="Trạng thái">
              <SelectCommon
                options={STATUS}
                placeholder="Status"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="roleId" label="Quyền">
              <SelectCommon options={dataRole} placeholder="Quyền" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='gender'>
              <Radio.Group>
                <Radio value="0"> Nam </Radio>
                <Radio value="1"> Nữ </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col
            span={24}
          >
            <CommonFormItem isRequired={false}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button htmlType="submit" className="search">
                  Tìm kiếm
                </Button>
                <Button className="search" onClick={handleOpenAddNew}>Thêm mới</Button>
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

export default SearchStaff;
