import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFormColumnsOrderCancel, IFormSearchOrderCancel } from "../../model/Order.model";
import { IFormProps } from "../../model/utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CommonTable from "../../utils/CommonTable";



const TableOrderCancel = ({ valueSearch, setPage, setSize, page, size }: Omit<IFormProps<IFormSearchOrderCancel>, "setValueSearch" | "setSelectedRowKeys" | "selectedRowKeys">) => {
  const [isOpen, setIsOpen] = useState(false)
  const [orderId, setOrderId] = useState<number | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { dataOrderCancel, totalElements, isLoading } = useAppSelector(state => state.orderReducer)
  const columns: ColumnsType<IFormColumnsOrderCancel> = [
    {
      title: "Khách hàng",
      dataIndex: "customerName",
    },
    {
      title: "Nhân viên",
      dataIndex: "employee",
    },
    {
      title: 'Người hủy',
      dataIndex: 'type',
    },
    {
      title: 'Lý do hủy',
      dataIndex: 'reason',    
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',    
    }
  ];
  return <div>
    <CommonTable columns={columns} dataSource={dataOrderCancel} total={totalElements} loading={isLoading} pageSize={size} page={page} setPage={setPage} setSize={setSize} />
  </div>;
};

export default TableOrderCancel;
