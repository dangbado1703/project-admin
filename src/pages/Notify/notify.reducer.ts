import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../contants/axios.config";

const initState = {
  dataNotify: [],
  dataComment: null,
};

export const getDataNotify = createAsyncThunk(
  "notify/getDataNotify",
  async () => {
    const result = await instance.get("/api/v1/notification");
    return result;
  }
);

export const getDetailNotify = createAsyncThunk(
  "notify/getDetailNotify",
  async (id: string) => {
    const result = await instance.get(`/api/v1/notification/detail/${id}`);
    const result2 = await axios.post("localhost:8082/api/v1/customer/product", {
      enums: "PRODUCT_MULTI_SEARCH",
      brandId: [],
      categoryId: [],
      price: null,
      star: null,
    });
    console.log("result2", result2);
    return result;
  }
);

const notifySlice = createSlice({
  name: "notify",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDataNotify.fulfilled, (state, action) => {
        state.dataNotify = action.payload.data.data;
      })
      .addCase(getDetailNotify.fulfilled, (state, action) => {
        state.dataComment = action.payload.data.data;
      });
  },
});

const notifyReducer = notifySlice.reducer;
export default notifyReducer;
