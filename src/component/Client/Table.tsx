import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Popconfirm, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { Key, TableRowSelection } from "antd/es/table/interface";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { IFormColumns, IFormSearchClient } from "../../model/Client.model";
import {
  blockUser,
  changeAction,
  deleteClient,
  getClient,
} from "../../pages/Client/client.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonTable from "../../utils/CommonTable";
import ModalClient from "./ModalClient";

interface IFormProps {
  page: number;
  size: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  selectedRowKeys: Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<Key[]>>;
  valueSearch: IFormSearchClient;
}
const TableClient = ({
  page,
  size,
  setPage,
  setSize,
  selectedRowKeys,
  setSelectedRowKeys,
  valueSearch,
}: IFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [valueDetail, setValueDetail] = useState<IFormColumns>();
  const { dataClient, totalElements } = useAppSelector(
    (state) => state.clientReducer
  );
  const dispatch = useAppDispatch();
  const columns: ColumnsType<IFormColumns> = [
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
              onConfirm={() => handleDelete(record.customerId)}
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
                onClick={() => setSelectedRowKeys([record.customerId])}
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              style={{ margin: "0 8px" }}
              onClick={() => handleOpenView(record)}
            />
          </Tooltip>
          {record.status === 1 ? (
            <Popconfirm
              title="Bạn có chắc muốn chặn khách hàng này không?"
              okText="Đồng ý"
              cancelText="Huỷ"
              onConfirm={() =>
                handleSubmitBlock(record.customerId, record.status)
              }
            >
              <Tooltip title="Khoá khách hàng">
                <UnlockOutlined />
              </Tooltip>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Bạn có chắc muốn mở chặn khách hàng này không?"
              okText="Đồng ý"
              cancelText="Huỷ"
              onConfirm={() =>
                handleSubmitBlock(record.customerId, record.status)
              }
            >
              <Tooltip title="Mở khoá khách hàng">
                <LockOutlined />
              </Tooltip>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];
  const handleSubmitBlock = (userId: number, status: number) => {
    console.log("userId", userId);
    if (status === 1) {
      dispatch(blockUser({ userId, status: 0 })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Chặn người dùng thành công");
          dispatch(getClient({ ...valueSearch, page: 1, size: 10 }));
        }
      });
    } else {
      dispatch(blockUser({ userId, status: 1 })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Mở khoá người dùng thành công");
          dispatch(getClient({ ...valueSearch, page: 1, size: 10 }));
        }
      });
    }
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    preserveSelectedRowKeys: true,
    onChange(selectedRowKeys) {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const handleDelete = (id: number) => {
    dispatch(deleteClient([id])).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Xoá người dùng thành công");
        dispatch(getClient(valueSearch));
      }
    });
  };
  const handleOpenView = (record: any) => {
    setValueDetail(record);
    setIsOpen(true);
    dispatch(changeAction("view"));
  };
  const handleOpenUpdate = (record: any) => {
    setValueDetail(record);
    setIsOpen(true);
    dispatch(changeAction("update"));
  };
  return (
    <>
      <CommonTable
        rowSelection={rowSelection}
        page={page}
        dataSource={dataClient}
        columns={columns}
        pageSize={size}
        setPage={setPage}
        setSize={setSize}
        total={totalElements}
        rowKey="userId"
      />
      <ModalClient
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        valueDetail={valueDetail}
        valueSearch={valueSearch}
      />
    </>
  );
};

export default TableClient;
