import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import moment from "moment";
import { useState } from "react";
import {
  IFormColumnsDanhMuc,
  IFormSearchDanhMuc
} from "../../model/DanhMuc.model";
import { IFormProps } from "../../model/utils";
import { deleteDanhMuc, getDanhMuc } from "../../pages/DanhMuc/danhmuc.reducer";
import {
  changeAction
} from "../../pages/Staff/staff.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonTable from "../../utils/CommonTable";
import { DATE_FORMAT_TYPE_DDMMYYYY } from "../../utils/contants";
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
      render(value) {
        return <span>{moment(value).format(DATE_FORMAT_TYPE_DDMMYYYY)}</span>
      },
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
              <DeleteOutlined onClick={() => setSelectedRowKeys([record.id])} />
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
        rowKey="id"
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
