import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import instance from "../../contants/axios.config";

const initState = {
  dataStatistic: {} as Record<string, any>[],
};

export const getDataStatistic = createAsyncThunk(
  "home/getDataStatistic",
  async (data: { fromDate: string; toDate: string }) => {
    const fromDate = dayjs(data.fromDate, "DD/MM/YYYY").month() + 1 || 1;
    const toDate = dayjs(data.toDate, "DD/MM/YYYY").month() + 1 || 12;
    const result = await instance.post("/api/v1/statistic", data);
    const newArr = Array.from(
      { length: toDate - fromDate + 1 },
      (_, index) => fromDate + index
    );
    const arr: any[] = [];
    newArr.forEach((item) => {
      if (result.data.data.length) {
        result.data.data.forEach((value: any) => {
          if (value.monthStatistic && value.monthStatistic === item) {
            arr.push({
              type: `Tháng ${item}`,
              sales: value.saleTotal,
            });
          } else {
            arr.push({
              type: `Tháng ${item}`,
              sales: 0,
            });
          }
        });
      } else {
        arr.push({
          type: `Tháng ${item}`,
          sales: 0,
        });
      }
    });
    return arr;
  }
);

export const getDataStatisticProducts = createAsyncThunk(
  "home/getDataStatisticProducts",
  async (data: { fromDate: string; toDate: string }) => {
    const result = await instance.post("/api/v1/statistic/product", data);
    const arr: any[] = [];
    if (result.data.data.length) {
      result.data.data.forEach((value: any) => {
        arr.push({
          type: `Tên sản phẩm ${value.name}`,
          sales: value.saleTotal,
        });
      });
    }
    return arr;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDataStatistic.fulfilled, (state, action) => {
      state.dataStatistic = action.payload;
    });
  },
});
const homeReducer = homeSlice.reducer;
export default homeReducer;
