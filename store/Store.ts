import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventSlice from "./eventSlice";
import userSlice from "./userSlice";

const Store = configureStore({
  reducer: {
    authSlice,
    userSlice,
    eventSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;
