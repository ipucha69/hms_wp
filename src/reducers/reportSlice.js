
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reports: [],

    birthReport: [],
    filteredBirthReport: [],

    deathReports: [],
    filteredDeathReports: [],

    operationReports: [],
    filteredOperationReports: [],

    otherReports: [],
    filteredOtherReports: []
};

const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        addReports(state, action) { 
            state.reports = action.payload;
        },
        addBirthReport(state, action) { 
            state.birthReport = action.payload;
        },
        addFilteredBirthReport(state, action) { 
            state.filteredBirthReport = action.payload;
        },
        addDeathReport(state, action) { 
            state.deathReports = action.payload;
        },
        addFilteredDeathReport(state, action) { 
            state.filteredDeathReports = action.payload;
        },
        addOperationReport(state, action) { 
            state.operationReports = action.payload;
        },
        addFilteredOperationReport(state, action) { 
            state.filteredOperationReports = action.payload;
        },
        addOtherReport(state, action) { 
            state.otherReports = action.payload;
        },
        addFilteredOtherReport(state, action) { 
            state.filteredOtherReports = action.payload;
        },
    },
});

export const { 
    addReports,
    addBirthReport,
    addFilteredBirthReport,
    addDeathReport,
    addFilteredDeathReport,
    addOperationReport,
    addFilteredOperationReport,
    addOtherReport,
    addFilteredOtherReport
} = reportSlice.actions;

export const selectReports = (state) => state.report.reports;
export const selectBirthReports = (state) => state.report.birthReport;
export const selectFilteredBirthReports = (state) => state.report.filteredBirthReport;
export const selectDeathReports = (state) => state.report.deathReports;
export const selectFilteredDeathReports = (state) => state.report.filteredDeathReports;
export const selectOperationReports = (state) => state.report.operationReports;
export const selectFilteredOperationReports = (state) => state.report.filteredOtherReports;
export const selectOtherReports = (state) => state.report.operationReports;
export const selectFilteredOtherReports = (state) => state.report.filteredOtherReports;

export default reportSlice.reducer;
