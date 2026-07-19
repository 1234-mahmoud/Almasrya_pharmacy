import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import medicineReducer from "./slices/medicineSlice";
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicine: medicineReducer,
    cart:cartReducer

  },
});
