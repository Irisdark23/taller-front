import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboardSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        auth: authReducer
    }
})