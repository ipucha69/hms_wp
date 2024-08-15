
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctors: [],
    filteredDoctors: [],
    appointments: [],
    filteredAppointments: [],
    prescriptions: [],
    filteredprescriptions: []
};

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        addDoctors(state, action) { 
            state.doctors = action.payload;
        },

        addFilteredDoctors(state, action) {
            state.filteredDoctors = action.payload
        },

        addAppointments(state, action) {
            state.appointments = action.payload;
        },

        addFilteredAppointments(state, action) {
            state.filteredAppointments = action.payload;
        },

        addPrescriptions(state, action) {
            state.prescriptions = action.payload;
        },

        addFilteredPrescriptions(state, action) {
            state.filteredprescriptions = action.payload;
        }
    },
});

export const { 
    addDoctors,
    addFilteredDoctors,
    addAppointments,
    addFilteredAppointments,
    addPrescriptions,
    addFilteredPrescriptions
} = doctorSlice.actions;

export const selectDoctors = (state) => state.doctor.doctors;
export const selectFilteredDoctors = (state) => state.doctor.filteredDoctors;
export const selectAppointments = (state) => state.doctor.appointments;
export const selectFilteredAppointments = (state) => state.doctor.filteredAppointments;
export const selectPrescriptions = (state) => state.doctor.prescriptions;
export const selectFilteredPrescriptions = (state) => state.doctor.filteredprescriptions;

export default doctorSlice.reducer;
