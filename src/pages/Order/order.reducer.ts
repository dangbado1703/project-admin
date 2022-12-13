import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../contants/axios.config";
import { IFormDetailOrder, IFormSearchOrder } from "../../model/Order.model";

const initState = {
  dataOrder: [],
  isLoading: false,
  totalElements: 0,
  dataDetailOrder: {} as IFormDetailOrder,
  dataUserOrder: [],
};

export const getDataSearch = createAsyncThunk(
  "Order/getDataSearch",
  async ({ page, size, ...rest }: IFormSearchOrder) => {
    const result = await instance.post(
      `/api/v1/order/search?page=${Number(page) - 1}&size=${size}`,
      rest
    );
    return result;
  }
);

export const acceptOrder = createAsyncThunk(
  "order/acceptOrder",
  async (data: any) => {
    const result = await instance.get(`/api/v1/order/accept?orderId=${data}`);
    toast.success("Xác nhận đơn hàng thành công");
    return result;
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (data: any) => {
    const result = await instance.post(`/api/v1/order/denied`, data);
    toast.success("Huỷ đơn hàng thành công");
    return result;
  }
);

export const getDetailOrder = createAsyncThunk(
  "order/detailOrder",
  async (id: string | undefined) => {
    const result = await instance.get(`/api/v1/order/detail/${id}`);
    console.log("result", result);
    return result;
  }
);

export const getUserOrder = createAsyncThunk("order/getUserOrder", async () => {
  const result = await instance.get(
    "/api/v1/order/suggestion?enums=ORDER_CUSTOMER&keySearch="
  );
  const newArr = result.data.data.customer.map((item: any) => {
    return {
      label: item.fullName,
      value: item.customerId,
    };
  });
  return newArr;
});

const orderSlice = createSlice({
  name: "Order",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDataSearch.fulfilled, (state, action) => {
        state.dataOrder = action.payload.data.data.content;
        state.totalElements = action.payload.data.data.totalElements;
      })
      .addCase(getDetailOrder.fulfilled, (state, action) => {
        state.dataDetailOrder = action.payload.data.data;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.dataUserOrder = action.payload;
      });
  },
});

const orderReducer = orderSlice.reducer;
export default orderReducer;
