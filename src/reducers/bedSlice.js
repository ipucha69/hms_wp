
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    beds: [],
    bedsAllotments: [],
    filteredBedsAllotments: []

};

const bedSlice = createSlice({
    name: "bed",
    initialState,
    reducers: {
        addBeds(state, action) { 
            state.beds = action.payload;
        },
        addBedsAllotments(state, action) { 
            state.bedsAllotments = action.payload;
        },
        addFilteredBedsAllotments(state, action) { 
            state.filteredBedsAllotments = action.payload;
        },
    },
});

export const { 
    addBeds,
    addBedsAllotments,
    addFilteredBedsAllotments
} = bedSlice.actions;

export const selectBeds = (state) => state.bed.beds;
export const selectBedsAllotments = (state) => state.bed.bedsAllotments;
export const selectFilteredBedsAllotments = (state) => state.bed.filteredBedsAllotments;


export default bedSlice.reducer;
