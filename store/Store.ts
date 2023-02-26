import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventSlice from "./eventSlice";
import userSlice from "./userSlice";
export const store = configureStore({
    reducer: {
        authSlice,
        userSlice,
        eventSlice,
    },
});


