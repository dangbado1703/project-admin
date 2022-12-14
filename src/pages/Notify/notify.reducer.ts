import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    console.log("result", result);
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
