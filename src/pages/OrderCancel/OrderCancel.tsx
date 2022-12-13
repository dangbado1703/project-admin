import { Key } from "antd/es/table/interface";
import moment from "moment";
import React, { useState, useEffect } from "react";
import SearchOrder from "../../component/Order/SearchOrder";
import TableOrder from "../../component/Order/TableOrder";
import FormSearchCancel from "../../component/OrderCancel/FormSearchCancel";
import FormTableCancel from "../../component/OrderCancel/FormTableCancel";
import { IFormSearchOrder } from "../../model/Order.model";
import { IFormSearchOrderCancel } from "../../model/OrderCancel.model";
import { useAppDispatch } from "../../store/hooks";
import {
  getAllOrderCancel
} from "./order_cancel.reducer";
const OrderCancel = () => {
  const [valueSearch, setValueSearch] = useState<IFormSearchOrderCancel>({
    customerName:""
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllOrderCancel({ ...valueSearch, page, size }));
  }, [dispatch, valueSearch, page, size]);
  return (
    <div>
      <FormSearchCancel
        selectedRowKeys={selectedRowKeys}
        setValueSearch={setValueSearch}
        setSelectedRowKeys={setSelectedRowKeys}
        valueSearch={valueSearch}
      />
      <FormTableCancel
        page={page}
        size={size}
        valueSearch={valueSearch}
        setPage={setPage}
        setSize={setSize}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
      />
    </div>
  );
};

export default OrderCancel;
