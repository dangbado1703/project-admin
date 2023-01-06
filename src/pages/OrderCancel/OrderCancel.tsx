import { useEffect, useState } from "react";
import SearchOrder from "../../component/Order/SearchOrder";
import TableOrder from "../../component/Order/TableOrder";
import TableOrderCancel from "../../component/OrderCancel/TableOrderCancel";
import { IFormSearchOrder } from "../../model/Order.model";
import { useAppDispatch } from "../../store/hooks";
import { getOrderCancel } from "../Order/order.reducer";

const OrderCancel = () => {
  const [valueSearch, setValueSearch] = useState<IFormSearchOrder>({
    customerId: null,
    status: null,
    fromPrice: "",
    toPrice: "",
    fromDate: null,
    toDate: null,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getOrderCancel({
        ...valueSearch,
        page,
        size: pageSize,
      })
    );
  }, [valueSearch, dispatch, page, pageSize]);
  return (
    <div>
      <TableOrderCancel
        page={page}
        size={pageSize}
        setPage={setPage}
        setSize={setPageSize}
        valueSearch={valueSearch}
      />
    </div>
  );
};

export default OrderCancel;
