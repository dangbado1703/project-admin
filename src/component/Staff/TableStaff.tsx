import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import React from "react";
import { IFormColumnsStaff, IFormSearchStaff } from "../../model/Staff.model";
import { IFormProps } from "../../model/utils";
import { useAppSelector } from "../../store/hooks";
import CommonTable from "../../utils/CommonTable";

const TableStaff = ({
  page,
  size,
  setPage,
  setSize,
  valueSearch,
  selectedRowKeys,
  setSelectedRowKeys,
}: Omit<IFormProps<IFormSearchStaff>, "setValueSearch">) => {
  const dataUser = useAppSelector((state) => state.staffReducer.dataStaff);
  const handleDelete = (id: number) => {};
  const handleOpenView = (record: IFormColumnsStaff) => {};
  const handleOpenUpdate = (record: IFormColumnsStaff) => {};
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
      title: "Status",
      dataIndex: "status",
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
              onConfirm={() => handleDelete(record.userId)}
              onCancel={() => setSelectedRowKeys([])}
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
        total={0}
        dataSource={dataUser}
        page={page}
        pageSize={size}
        setPage={setPage}
        setSize={setSize}
        rowKey="userId"
      />
    </div>
  );
};

export default TableStaff;
