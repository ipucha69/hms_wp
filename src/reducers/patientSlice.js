
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patients: [],
    filteredPatients: []
};

const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        addPatients(state, action) { 
            state.patients = action.payload;
        },
        addFilteredPatients(state, action) {
            state.filteredPatients = action.payload;
        }
    },
});


export const { 
    addPatients,
    addFilteredPatients
} = patientSlice.actions;

export const selectPatients = (state) => state.patient.patients;
export const selectFilteredPatients = (state) => state.patient.filteredPatients;

export default patientSlice.reducer;