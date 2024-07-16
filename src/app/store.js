import { configureStore } from "@reduxjs/toolkit";
import appReducers from "../reducers/appSlice";
import doctorSlice from "../reducers/doctorSlice";
import patientSlice from "../reducers/patientSlice";

export const store = configureStore({
    reducer: {
        app: appReducers,
        doctor: doctorSlice,
        patient: patientSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
        },
    }),
});
