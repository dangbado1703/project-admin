import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormLogin } from "../../model/Login.model";

const initState = {};
export const LoginAPI = createAsyncThunk(
  "Login/Login",
  async (data: IFormLogin) => {
    const result = await instance.post("/api/auth/user", data);
    localStorage.setItem("auth", result.data.token);
  }
);

const loginSlice = createSlice({
  name: "Login",
  initialState: initState,
  reducers: {},
});

const loginReducer = loginSlice.reducer;
export default loginReducer;
