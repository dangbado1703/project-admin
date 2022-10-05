import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormLogin } from "../../model/Login.model";

const initState = {
  isLoading: false,
};
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
  extraReducers(builder) {
    builder
      .addCase(LoginAPI.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(LoginAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginAPI.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const loginReducer = loginSlice.reducer;
export default loginReducer;
