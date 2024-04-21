import { configureStore } from "@reduxjs/toolkit";
import appointmentSlice from "./features/appointmentSlice";

export const store = configureStore({
    reducer: {
        appointmentSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;