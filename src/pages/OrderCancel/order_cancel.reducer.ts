import { IFormDataOrderCancel, IFormSearchOrderCancel } from './../../model/OrderCancel.model';
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { Key } from "antd/es/table/interface";
const initState = {
  dataOrderCancel: [] as IFormDataOrderCancel[],
  action: ""
};

export const getAllOrderCancel = createAsyncThunk(
  "voucher/searchVoucher",
  async (data: IFormSearchOrderCancel) => {
    const result = await instance.post("/api/v1/order/cancel-list",data);
    return result;
  }
);

const orderCancelSlice = createSlice({
  name: "voucher",
  initialState: initState,
  reducers: {
    changeAction: (state, action) => {
      state.action = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllOrderCancel.fulfilled, (state, action) => {
        state.dataOrderCancel = action.payload.data.data.content;
      });
  },
});

const orderCancelReducer = orderCancelSlice.reducer;
export const { changeAction } = orderCancelSlice.actions;
export default orderCancelReducer;
