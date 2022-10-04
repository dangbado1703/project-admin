import { Button, Col, DatePicker, Form, Popconfirm, Row, Select } from "antd";
import { Key } from "antd/lib/table/interface";
import React from "react";
import { toast } from "react-toastify";
import { IFormSearchClient } from "../../model/Client.model";
import { deleteClient, getClient } from "../../pages/Client/client.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonFormItem from "../../utils/CommonFormItem";
import { filterSelectOption, STATUS } from "../../utils/filterOptions";

interface IFormProps {
  setValueSearch: React.Dispatch<React.SetStateAction<any>>;
  selectedRowKeys: Key[];
  valueSearch: IFormSearchClient;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<Key[]>>;
}
const SearchClient = ({
  setValueSearch,
  selectedRowKeys,
  valueSearch,
  setSelectedRowKeys,
}: IFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { dataUsername, dataEmail, dataPhone } = useAppSelector(
    (state) => state.clientReducer
  );
  const handleSearch = (data: any) => {
    setValueSearch(data);
  };
  const handleDelete = () => {
    if (selectedRowKeys.length) {
      dispatch(deleteClient(selectedRowKeys)).then((res) => {
        if (res.meta.requestStatus) {
          toast.success("Xóa thành công");
          setSelectedRowKeys([]);
          dispatch(getClient(valueSearch));
        }
      });
    }
  };
  return (
    <Form form={form} layout="vertical" onFinish={handleSearch}>
      <Row gutter={10}>
        <Col span={8}>
          <CommonFormItem name="username" label="Username" isRequired={false}>
            <Select
              allowClear
              showSearch
              options={dataUsername}
              filterOption={filterSelectOption}
              placeholder="Username"
            />
          </CommonFormItem>
        </Col>
        <Col span={8}>
          <CommonFormItem name="fullName" label="Full Name" isRequired={false}>
            <Select
              allowClear
              showSearch
              options={[]}
              filterOption={filterSelectOption}
              placeholder="Full Name"
            />
          </CommonFormItem>
        </Col>
        <Col span={8}>
          <CommonFormItem name="email" label="Email" isRequired={false}>
            <Select
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
              allowClear
              showSearch
              options={dataPhone}
              filterOption={filterSelectOption}
              placeholder="Phone"
            />
          </CommonFormItem>
        </Col>
        <Col span={8}>
          <CommonFormItem name="status" label="Status" isRequired={false}>
            <Select
              allowClear
              showSearch
              options={STATUS}
              filterOption={filterSelectOption}
              placeholder="Status"
            />
          </CommonFormItem>
        </Col>
        <Col span={8}>
          <Form.Item name="birthday" label="Sinh nhật">
            <DatePicker
              format="DD/MM/YYYY"
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
                title={
                  selectedRowKeys.length
                    ? "Bạn có chắc muốn xóa những người dùng này không?"
                    : "Vui lòng chọn người dùng"
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
  );
};

export default SearchClient;
