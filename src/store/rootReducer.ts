import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../pages/Login/login.reducer";
import registerReducer from "../pages/Register/Register.reducer";
import clientReducer from "../pages/Client/client.reducer";
import productReducer from "../pages/Product/product.reducer";
import staffReducer from "../pages/Staff/staff.reducer";
import danhMucReducer from "../pages/DanhMuc/danhmuc.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  clientReducer,
  productReducer,
  staffReducer,
  danhMucReducer
});

export default rootReducer;
