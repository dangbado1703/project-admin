import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useState } from "react";
import {
  IFormColumnsDanhMuc,
  IFormSearchDanhMuc,
} from "../../model/DanhMuc.model";
import { IFormColumnsOrderCancel, IFormSearchOrderCancel } from "../../model/OrderCancel.model";
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

const FormTableCancel = ({
  page,
  size,
  setPage,
  setSize,
  valueSearch,
  selectedRowKeys,
  setSelectedRowKeys,
}: Omit<IFormProps<IFormSearchOrderCancel>, "setValueSearch">) => {
  const [isOpen, setIsOpen] = useState(false);
  const [valueDetail, setValueDetail] = useState<IFormColumnsOrderCancel>();
  const dispatch = useAppDispatch();
  const dataOrderCancel = useAppSelector((state) => state.orderCancelReducer.dataOrderCancel);
  const columns: ColumnsType<IFormColumnsOrderCancel> = [
    {
      title: "Tên người dùng",
      dataIndex: "employee",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
    },
    {
      title: "Người hủy",
      dataIndex: "type",
    },
    {
      title: "Lý do hủy",
      dataIndex: "reason",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
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
              <DeleteOutlined onClick={() => setSelectedRowKeys([record.customerId])} />
            </Popconfirm>
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
        dataSource={dataOrderCancel}
        page={page}
        pageSize={size}
        setPage={setPage}
        setSize={setSize}
        rowKey="userId"
      />
    </div>
  );
};

export default FormTableCancel;
