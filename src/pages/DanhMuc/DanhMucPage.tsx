import { Key } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import FormSearch from "../../component/DanhMuc/FormSearch";
import FormTable from "../../component/DanhMuc/FormTable";
import { IFormSearchDanhMuc } from "../../model/DanhMuc.model";
import { useAppDispatch } from "../../store/hooks";
import {
  getName,
  getCode,
  getCreatedBy,
  getDanhMuc,
  getParent,
} from "./danhmuc.reducer";

const DanhMucPage = () => {
  const [valueSearch, setValueSearch] = useState<IFormSearchDanhMuc>({
    name: "",
    code: "",
    createdBy: "",
  });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDanhMuc({ ...valueSearch, page, size }));
  }, [dispatch, valueSearch, page, size]);
  useEffect(() => {
    Promise.any([
      dispatch(getCode()),
      dispatch(getName()),
      dispatch(getCreatedBy()),
      dispatch(getParent()),
    ]);
  }, [dispatch]);
  return (
    <div>
      <FormSearch
        selectedRowKeys={selectedRowKeys}
        setValueSearch={setValueSearch}
        setSelectedRowKeys={setSelectedRowKeys}
        valueSearch={valueSearch}
      />
      <FormTable
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

export default DanhMucPage;
