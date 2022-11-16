import { Key } from "antd/lib/table/interface";
import React, { useState, useEffect } from "react";
import SearchVoucher from "../../component/Voucher/SearchVoucher";
import TableVoucher from "../../component/Voucher/TableVoucher";
import { IFormSearchVoucher } from "../../model/Voucher.model";
import { useAppDispatch } from "../../store/hooks";
import {
  getAllVoucher
} from "./voucher.reducer";

const Voucher = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [valueSearch, setValueSearch] = useState<IFormSearchVoucher>({
    code: "",
    // fromPrice: "",
    status: "",
    // toPrice: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllVoucher({ ...valueSearch, page, size }));
  }, [dispatch, valueSearch, page, size]);
  return (
    <div>
      <SearchVoucher
        setValueSearch={setValueSearch}
        page={page}
        size={size}
        selectedRowKeys={selectedRowKeys}
      />
      <TableVoucher
        page={page}
        size={size}
        setPage={setPage}
        setSize={setSize}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        valueSearch={valueSearch}
      />
    </div>
  );
};

export default Voucher;
