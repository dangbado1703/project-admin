import { Key } from "antd/lib/table/interface";
import React, { useState, useEffect } from "react";
import SearchClient from "../../component/Client/Search";
import TableClient from "../../component/Client/Table";
import { useAppDispatch } from "../../store/hooks";
import {
  getAllEmail,
  getAllPhone,
  getAllUsername,
  getClient,
} from "./client.reducer";

// đây là page KHÁCH HÀNG
const Client = () => {
  const [valueSearch, setValueSearch] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    // birthday: null,
    status: null,
  });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getClient({ ...valueSearch, page, size }));
  }, [valueSearch, dispatch, page, size]);
  useEffect(() => {
    Promise.all([
      dispatch(getAllUsername()),
      dispatch(getAllPhone()),
      dispatch(getAllEmail()),
    ]);
  }, [dispatch]);

  return (
    <div>
      <SearchClient
        setValueSearch={setValueSearch}
        selectedRowKeys={selectedRowKeys}
        valueSearch={{ ...valueSearch, page, size }}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <TableClient
        page={page}
        size={size}
        setPage={setPage}
        setSize={setSize}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        valueSearch={{ ...valueSearch, page, size }}
      />
    </div>
  );
};

export default Client;
