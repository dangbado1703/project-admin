import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useState } from "react";
import { IFormColumnsStaff, IFormSearchStaff } from "../../model/Staff.model";
import { IFormProps } from "../../model/utils";
import {
  changeAction,
  deleteUser,
  getUser,
} from "../../pages/Staff/staff.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonTable from "../../utils/CommonTable";
import ViewModal from "./ViewModal";

const TableStaff = ({
  page,
  size,
  setPage,
  setSize,
  valueSearch,
  selectedRowKeys,
  setSelectedRowKeys,
}: Omit<IFormProps<IFormSearchStaff>, "setValueSearch">) => {
  const [isOpen, setIsOpen] = useState(false);
  const [valueDetail, setValueDetail] = useState<IFormColumnsStaff>();
  const dispatch = useAppDispatch();
  const { dataStaff, totalItem } = useAppSelector(
    (state) => state.staffReducer
  );
  const handleDelete = () => {
    dispatch(deleteUser(selectedRowKeys)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getUser(valueSearch));
      }
    });
  };
  const handleOpenView = (record: IFormColumnsStaff) => {
    setIsOpen(true);
    setValueDetail(record);
    dispatch(changeAction("view"));
  };
  const handleOpenUpdate = (record: IFormColumnsStaff) => {
    setIsOpen(true);
    setValueDetail(record);
    dispatch(changeAction("update"));
  };
  const columns: ColumnsType<IFormColumnsStaff> = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "FullName",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Sinh nhật",
      dataIndex: "birthday",
    },
    {
      title: "Quyền",
      dataIndex: "roleName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render(value) {
        if (value === 0) {
          return <Tag color="orange">Không hoạt động</Tag>
        }
        if (value === 1) {
          return <Tag color="success">Hoạt động</Tag>
        }
      }
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: "center",
      render: (value, record) => (
        <>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc muốn xóa người dùng này không?"
              onConfirm={() => handleDelete()}
              onCancel={() => setSelectedRowKeys([])}
              onOpenChange={(open: boolean) => {
                if (!open) {
                  setSelectedRowKeys([]);
                }
              }}
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
              <DeleteOutlined
                onClick={() => setSelectedRowKeys([record.userId])}
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              style={{ margin: "0 8px" }}
              onClick={() => handleOpenView(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <EditOutlined onClick={() => handleOpenUpdate(record)} />
          </Tooltip>
        </>
      ),
    },
  ];
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    preserveSelectedRowKeys: true,
    onChange(selectedRowKeys) {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <div>
      <CommonTable
        rowSelection={rowSelection}
        columns={columns}
        total={totalItem}
        dataSource={dataStaff}
        page={page}
        pageSize={size}
        setPage={setPage}
        setSize={setSize}
        rowKey="userId"
      />
      <ViewModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        valueDetail={valueDetail}
        valueSearch={valueSearch}
      />
    </div>
  );
};

export default TableStaff;
