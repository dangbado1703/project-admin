import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormSearchOrder } from "../../model/Order.model";

const initState = {
  dataOrder: [],
  isLoading: false,
  totalElements: 0
};

export const getDataSearch = createAsyncThunk(
  "Order/getDataSearch",
  async (data: IFormSearchOrder) => {
    const result = await instance.post("/api/v1/order/search", data);
    console.log("result", result);
    return result;
  }
);

const orderSlice = createSlice({
  name: "Order",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDataSearch.fulfilled, (state, action) => {
      state.dataOrder = action.payload.data.data.content;
      state.totalElements = action.payload.data.data.totalElements;
    });
  },
});

const orderReducer = orderSlice.reducer;
export default orderReducer;
