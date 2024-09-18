import React from 'react';
import GetDiagnosis from '../../../subComponents/prescrptionComponents/GetDiagnosis';
import GetMedicines from '../../../subComponents/prescrptionComponents/GetMedicines';
import SelectMedicines from '../../../subComponents/prescrptionComponents/SelectMedicines';
import Grid from '@mui/material/Grid';

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
