import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../pages/Login/login.reducer";
import registerReducer from "../pages/Register/Register.reducer";
import clientReducer from "../pages/Client/client.reducer";
import productReducer from "../pages/Product/product.reducer";
import staffReducer from "../pages/Staff/staff.reducer";
import danhMucReducer from "../pages/DanhMuc/danhmuc.reducer";
import voucherReducer from "../pages/Voucher/voucher.reducer";
import orderReducer from "../pages/Order/order.reducer";
import orderCancelReducer from "../pages/OrderCancel/order_cancel.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  clientReducer,
  productReducer,
  staffReducer,
  danhMucReducer,
  voucherReducer,
  orderReducer,
  orderCancelReducer
});

export default rootReducer;
