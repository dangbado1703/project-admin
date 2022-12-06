import { Popconfirm, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { IFormColumnsOrder, IFormSearchOrder } from "../../model/Order.model";
import { IFormProps } from "../../model/utils";
import moment from 'moment'
import { DATE_FORMAT_TYPE_DDMMYYYY } from "../../utils/contants";
import { CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, EyeOutlined } from "@ant-design/icons";
import CommonTable from "../../utils/CommonTable";
import { useAppSelector } from "../../store/hooks";



const TableOrder = ({ valueSearch, setPage, setSize, page, size }: Omit<IFormProps<IFormSearchOrder>, "setValueSearch" | "setSelectedRowKeys" | "selectedRowKeys">) => {
  const [isOpen, setIsOpen] = useState(false)
  const { dataOrder, totalElements, isLoading } = useAppSelector(state => state.orderReducer)
  const columns: ColumnsType<IFormColumnsOrder> = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      render(value) {
        return <span>{moment(value).format(DATE_FORMAT_TYPE_DDMMYYYY)}</span>
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render(value) {
        if (value === 0) {
          return <Tag color="orange">Đang chờ</Tag>
        }
        if (value === 1) {
          return <Tag color="success">Chấp nhận</Tag>
        }
      }
    },
    {
      title: 'Giá trị đơn hàng',
      dataIndex: 'price',
      render(value) {
        return <span>{value}</span>
      }
    },
    {
      title: "Ngày vận chuyển",
      dataIndex: 'deliveryDate',
      render(value) {
        return <span>{moment(value).format(DATE_FORMAT_TYPE_DDMMYYYY)}</span>
      },
    },
    {
      title: 'Phí vận chuyển',
      dataIndex: 'shippingTotal',
      render(value) {
        return <span>${value}</span>
      }
    },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'isPayment',
      render(value) {
        if (value === 0) {
          return <span>Chưa thanh toán</span>
        }
        if (value === 1) {
          return <span>Đã thanh toán</span>
        }
      }
    },
    {
      title: 'Hành động',
      render: () => {
        return <div>
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined style={{cursor: 'pointer'}} />
          </Tooltip>
          <Popconfirm title='Bạn có chắc muốn huỷ đơn hàng?' onConfirm={() => setIsOpen(true)}>
            <Tooltip title='Duyệt đơn hàng'>
              <CheckCircleOutlined style={{color: 'green', margin: '0 8px'}} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Huỷ'>
            <CloseCircleOutlined style={{color: '#f50', cursor: 'pointer'}}  />
          </Tooltip>
        </div>
      }
    }
  ];
  return <div>
    <CommonTable columns={columns} dataSource={dataOrder} total={totalElements} loading={isLoading} pageSize={size} page={page} setPage={setPage} setSize={setSize} />
  </div>;
};

export default TableOrder;
