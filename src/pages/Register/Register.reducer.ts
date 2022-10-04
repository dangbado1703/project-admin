import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormRegister } from "../../model/Register.model";

export const register = createAsyncThunk(
  "Register/register",
  async (data: IFormRegister) => {
    const result = await instance.post("/api/v1/user/register", data);
    return result;
  }
);
const initState = {};
const registerSlice = createSlice({
  name: "Register",
  initialState: initState,
  reducers: {},
});

const registerReducer = registerSlice.reducer;

export default registerReducer;
