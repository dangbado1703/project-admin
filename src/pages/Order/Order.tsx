import { Key } from "antd/lib/table/interface";
import React, { useState } from "react";
import SearchOrder from "../../component/Order/SearchOrder";
import TableOrder from "../../component/Order/TableOrder";
import { IFormSearchOrder } from "../../model/Order.model";

const Order = () => {
  const [valueSearch, setValueSearch] = useState<IFormSearchOrder>({
    customerId: 1,
    statusOrder: 1,
    fromPrice: 1,
    toPrice: 1,
    fromDate: "",
    toDate: "",
  });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  return (
    <div>
      <SearchOrder
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <TableOrder
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        page={page}
        size={size}
        setPage={setPage}
        setSize={setSize}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </div>
  );
};

export default Order;
