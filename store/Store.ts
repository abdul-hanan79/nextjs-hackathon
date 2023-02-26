import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventSlice from "./eventSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    authSlice,
    userSlice,
    eventSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
