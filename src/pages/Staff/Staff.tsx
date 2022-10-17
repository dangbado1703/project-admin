import { Key } from "antd/lib/table/interface";
import React, { useEffect, useState } from "react";
import SearchStaff from "../../component/Staff/SearchStaff";
import TableStaff from "../../component/Staff/TableStaff";
import { IFormSearchStaff } from "../../model/Staff.model";
import { useAppDispatch } from "../../store/hooks";
import {
  getEmail,
  getFullName,
  getPhone,
  getUser,
  getUsername,
} from "./staff.reducer";

const Staff = () => {
  const [valueSearch, setValueSearch] = useState<IFormSearchStaff>({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    status: 1,
  });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    Promise.any([
      dispatch(getUser({ ...valueSearch, page, size })),
      dispatch(getUsername()),
      dispatch(getFullName()),
      dispatch(getPhone()),
      dispatch(getEmail()),
    ]);
  }, [dispatch, valueSearch, page, size]);
  return (
    <div>
      <SearchStaff
        selectedRowKeys={selectedRowKeys}
        setValueSearch={setValueSearch}
        setSelectedRowKeys={setSelectedRowKeys}
        valueSearch={valueSearch}
      />
      <TableStaff
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

export default Staff;
