import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../pages/Login/login.reducer";
import registerReducer from "../pages/Register/Register.reducer";
import clientReducer from "../pages/Client/client.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  clientReducer,
});

export default rootReducer;
