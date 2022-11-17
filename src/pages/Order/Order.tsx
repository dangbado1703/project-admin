import { Key } from "antd/lib/table/interface";
import moment from "moment";
import React, { useState, useEffect } from "react";
import SearchOrder from "../../component/Order/SearchOrder";
import TableOrder from "../../component/Order/TableOrder";
import { IFormSearchOrder } from "../../model/Order.model";
import { useAppDispatch } from "../../store/hooks";
import { getDataSearch } from "./order.reducer";

const Order = () => {
  const [valueSearch, setValueSearch] = useState<IFormSearchOrder>({
    customerId: null,
    status: null,
    fromPrice: '',
    toPrice: '',
    fromDate: null,
    toDate: null
  });
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getDataSearch({
      ...valueSearch,
      fromDate: valueSearch.fromDate ? moment(valueSearch.fromDate).format('YYYY-MM-DD') : null,
      toDate: valueSearch.toDate ? moment(valueSearch.toDate).format('YYYY-MM-DD') : null,
      page,
      size: pageSize
    }))
  }, [valueSearch, dispatch, page, pageSize])
  return (
    <div>
      <SearchOrder
        setValueSearch={setValueSearch}
      />
      {/* <TableOrder
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
      /> */}
    </div>
  );
};

export default Order;
