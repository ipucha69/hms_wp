
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patients: [],
    patient: {},
    patientsQueue: [],
    filteredPatients: [],
    filteredPatientsQueue: []
};

const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        addPatients(state, action) { 
            state.patients = action.payload;
        },
        addPatientDetails(state, action) {
            state.patient = action.payload;
        },
        addPatientsQueue(state, action) { 
            state.patientsQueue = action.payload;
        },
        addFilteredPatients(state, action) {
            state.filteredPatients = action.payload;
        },
        addFilteredPatientsQueue(state, action) {
            state.filteredPatientsQueue = action.payload
        }
    },
});


export const { 
    addPatients,
    addPatientDetails,
    addPatientsQueue,
    addFilteredPatients,
    addFilteredPatientsQueue
} = patientSlice.actions;

export const selectPatients = (state) => state.patient.patients;
export const selectPatientDetails = (state) => state.patient.patient;
export const selectPatientsQueue = (state) => state.patient.patientsQueue;
export const selectFilteredPatients = (state) => state.patient.filteredPatients;
export const selectFilteredPatientsQueue = (state) => state.patient.filteredPatientsQueue;

export default patientSlice.reducer;