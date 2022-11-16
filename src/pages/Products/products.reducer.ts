import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";

const initState = {
  dataProducts: [],
};

export const getDataProducts = createAsyncThunk("products/getDataProducts",async (data:any) => {
    const result = await instance.post('')
})

const productsSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {},
});
const productsReducer = productsSlice.reducer
export default productsReducer
