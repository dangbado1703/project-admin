import { Key } from "antd/lib/table/interface";
import React, { useState, useEffect } from "react";
import SearchProduct from "../../component/Product/SearchProduct";
import TableProduct from "../../component/Product/TableProduct";
import { IFormSearchProduct } from "../../model/Product.model";
import { useAppDispatch } from "../../store/hooks";
import {
  getAllProduct,
  getListCode,
  getListCreated,
  getListMake,
  getListName,
  getListProductType,
} from "./product.reducer";
import './products.scss'

const Product = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [valueSearch, setValueSearch] = useState<IFormSearchProduct>({
    name: "",
    code: "",
    productTypeId: "",
    makeId: "",
    fromPrice: "",
    status: "",
    toPrice: "",
    createdBy: "",
    expiredDate: "",
    fromDate: "",
    toDate: "",
    fromStockQty: "",
    toStockQty: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProduct({ ...valueSearch, page, size }));
  }, [dispatch, valueSearch, page, size]);
  useEffect(() => {
    Promise.all([
      dispatch(getListMake()),
      dispatch(getListProductType()),
      dispatch(getListName()),
      dispatch(getListCode()),
      dispatch(getListCreated()),
    ]);
  }, [dispatch]);
  return (
    <div>
      <SearchProduct
        setValueSearch={setValueSearch}
        page={page}
        size={size}
        selectedRowKeys={selectedRowKeys}
      />
      <TableProduct
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

export default Product;
