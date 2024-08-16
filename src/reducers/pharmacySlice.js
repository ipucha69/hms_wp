
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: [],
    filteredCategory: [],
    medicine: [],
    filteredMedicine: [],
    prescriptions: [],
    filteredPrescriptions: [],
    prescriptionDetails: {}
};

const pharmacySlice = createSlice({
    name: "pharmacy",
    initialState,
    reducers: {
        addCategory(state, action) { 
            state.category = action.payload;
        },
        addFilteredCategory(state, action) { 
            state.filteredCategory = action.payload;
        },
        addMedicine(state, action) { 
            state.medicine = action.payload;
        },
        addFilteredMedicine(state, action) { 
            state.filteredMedicine = action.payload;
        },
        addPrescription(state, action) { 
            state.prescriptions = action.payload;
        },
        addFilteredPrescription(state, action) { 
            state.filteredPrescriptions = action.payload;
        },
        addPrescriptionDetails(state, action) { 
            state.prescriptionDetails = action.payload;
        },
    },
});

export const { 
    addCategory,
    addFilteredCategory,
    addMedicine,
    addFilteredMedicine,
    addPrescription,
    addFilteredPrescription,
    addPrescriptionDetails
 } = pharmacySlice.actions;

export const selectCategory = (state) => state.pharmacy.category;
export const selectFilteredCategory = (state) => state.pharmacy.filteredCategory;
export const selectMedicine = (state) => state.pharmacy.medicine;
export const selectFilteredMedicine = (state) => state.pharmacy.filteredMedicine;
export const selectPrescription = (state) => state.pharmacy.prescriptions;
export const selectFilteredPrescription = (state) => state.pharmacy.filteredPrescriptions;
export const selectPrescriptionDetails = (state) => state.pharmacy.prescriptionDetails;


export default pharmacySlice.reducer;
