
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patients: [],
    patient: {},
    patientsQueue: [],
    filteredPatients: [],
    filteredPatientsQueue: [],
    symptoms: []
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
        },
        addSymptoms(state, action) {
            state.symptoms = action.payload
        }
    },
});


export const { 
    addPatients,
    addPatientDetails,
    addPatientsQueue,
    addFilteredPatients,
    addFilteredPatientsQueue,
    addSymptoms
} = patientSlice.actions;

export const selectPatients = (state) => state.patient.patients;
export const selectPatientDetails = (state) => state.patient.patient;
export const selectPatientsQueue = (state) => state.patient.patientsQueue;
export const selectFilteredPatients = (state) => state.patient.filteredPatients;
export const selectFilteredPatientsQueue = (state) => state.patient.filteredPatientsQueue;
export const selectSymptoms = (state) => state.patient.symptoms;

export default patientSlice.reducer;