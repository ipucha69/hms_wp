import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../reducers/appSlice";
import doctorSlice from "../reducers/doctorSlice";
import patientSlice from "../reducers/patientSlice";
import bedSlice from "../reducers/bedSlice";
import bloodSlice from "../reducers/bloodSlice";
import reportSlice from "../reducers/reportSlice";

export const store = configureStore({
    reducer: {
        app: appSlice,
        bed: bedSlice,
        blood: bloodSlice,
        doctor: doctorSlice,
        patient: patientSlice,
        report: reportSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
        },
    }),
});
