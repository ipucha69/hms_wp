import React from 'react';
import GetDiagnosis from '../prescrptionComponents/GetDiagnosis';
import GetMedicines from '../prescrptionComponents/GetMedicines';
import Grid from '@mui/material/Grid';
import SelectMedicines from '../prescrptionComponents/SelectMedicines';

const Prescription = () => {
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={4}>
                <GetDiagnosis />
            </Grid>
            <Grid item xs={12} sm={4}>
                <GetMedicines />
            </Grid>
            <Grid item xs={12} sm={4}>
                <SelectMedicines />
            </Grid>
        </Grid>
    );
};

export default Prescription;
