import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import React, { useState } from "react";
import { IFormColumnsDanhMuc, IFormSearchDanhMuc } from "../../model/DanhMuc.model";
import { IFormColumnsStaff, IFormSearchStaff } from "../../model/Staff.model";
import { IFormProps } from "../../model/utils";
import { deleteDanhMuc, getDanhMuc } from "../../pages/DanhMuc/danhmuc.reducer";
import {
  changeAction,
  deleteUser,
  getUser,
} from "../../pages/Staff/staff.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonTable from "../../utils/CommonTable";
import ViewModal from "./ViewModal";

const FormTable = ({
  page,
  size,
  setPage,
  setSize,
  valueSearch,
  selectedRowKeys,
  setSelectedRowKeys,
}: Omit<IFormProps<IFormSearchDanhMuc>, "setValueSearch">) => {
  const [isOpen, setIsOpen] = useState(false);
  const [valueDetail, setValueDetail] = useState<IFormColumnsDanhMuc>();
  const dispatch = useAppDispatch();
  const dataDanhMuc = useAppSelector((state) => state.danhMucReducer.dataForm);
  const handleDelete = () => {
    dispatch(deleteDanhMuc(selectedRowKeys)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getDanhMuc(valueSearch));
      }
    });
  };
  const handleOpenView = (record: IFormColumnsDanhMuc) => {
    setIsOpen(true);
    setValueDetail(record);
    dispatch(changeAction("view"));
  };
  const handleOpenUpdate = (record: IFormColumnsDanhMuc) => {
    setIsOpen(true);
    setValueDetail(record);
    dispatch(changeAction("update"));
  };
  const columns: ColumnsType<IFormColumnsDanhMuc> = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Mã danh mục",
      dataIndex: "code",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "lastModifiedDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Danh mục cha",
      dataIndex: "parent",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: "center",
      render: (value, record) => (
        <>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc muốn xóa danh mục này không?"
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
                onClick={() => setSelectedRowKeys([record.id])}
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
        dataSource={dataDanhMuc}
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

export default FormTable;
