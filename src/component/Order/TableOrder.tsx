import { Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { IFormColumnsOrder, IFormSearchOrder } from "../../model/Order.model";
import { IFormProps } from "../../model/utils";

const TableOrder = ({
  valueSearch,
}: { valueSearch: IFormSearchOrder }) => {
  const columns: ColumnsType<IFormColumnsOrder> = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Confirm",
      dataIndex: "statusConfirm",
      render(value, record, index) {
        if (value === 1) {
          return <Tag></Tag>;
        }
      },
    },
  ];
  return <div>TableOrder</div>;
};

export default TableOrder;
