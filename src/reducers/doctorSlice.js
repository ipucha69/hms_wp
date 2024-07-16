
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctors: [],
    filteredDoctors: []
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
        }
    },
});

export const { 
    addDoctors,
    addFilteredDoctors
} = doctorSlice.actions;

export const selectDoctors = (state) => state.doctor.doctors;
export const selectFilteredDoctors = (state) => state.doctor.filteredDoctors;

export default doctorSlice.reducer;
