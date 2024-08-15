
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    donors: [],
    filteredDonors: [],

    bloodBank: [],
    filteredBloodBank: []

};

const bloodSlice = createSlice({
    name: "blood",
    initialState,
    reducers: {
        addDonors(state, action) { 
            state.donors = action.payload;
        },
        addFilteredDonors(state, action) { 
            state.filteredDonors = action.payload;
        },
        addBloodBank(state, action) { 
            state.bloodBank = action.payload;
        },
        addFilteredBloodBank(state, action) { 
            state.filteredBloodBank = action.payload;
        },
    },
});

export const { 
    addDonors,
    addFilteredDonors,
    addBloodBank,
    addFilteredBloodBank
} = bloodSlice.actions;

export const selectDonors = (state) => state.blood.donors;
export const selectFilteredDonors = (state) => state.blood.filteredDonors;
export const selectBloodBank = (state) => state.blood.bloodBank;
export const selectFilteredBloodBank = (state) => state.blood.filteredBloodBank;


export default bloodSlice.reducer;
