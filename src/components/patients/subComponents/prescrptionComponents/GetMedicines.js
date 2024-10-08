import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { Space, Input } from "antd";

import { colors } from "../../../../assets/utils/colors";

const { Search } = Input;
const GetMedicines = () => {
    // Initial array of symptoms
    const initialDiagnosis = [
        'Fever', 'Cough', 'Headache', 'Fatigue', 'Sore Throat',
        'Nausea', 'Dizziness', 'Rash', 'Itching', 'Abdominal Pain',
        'Constipation', 'Diarrhea', 'Vomiting', 'Muscle Aches', 'Chills'
    ];
    

    // State to keep track of checked symptoms
    const [checkedDiagnosis, setCheckedDiagnosis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState(false);
    const [filteredMedicines, setFilteredMedicines] = useState([]);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedDiagnosis = initialDiagnosis.filter((symptom) => {
                return symptom.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            setFilteredMedicines(searchedDiagnosis);
            setFilters(true);
        } else {
            // Update state with filtered patients
            setFilteredMedicines([]);
            setFilters(false);
        }
    };

    // Handler function to update checked symptoms array
    const handleCheckChange = (diagnosis) => (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add symptom to array if checked
            setCheckedDiagnosis([...checkedDiagnosis, diagnosis]);
        } else {
            // Remove symptom from array if unchecked
            setCheckedDiagnosis(checkedDiagnosis.filter((s) => s !== diagnosis));
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            setFilteredMedicines([]);
            setFilters(false);
            setSearchText(value);
        }
    };
    


    const getMedicines = () => {
        setLoading(true);
        console.log('getting medicines :', checkedDiagnosis);
        setLoading(false);
    }


    const renderButton = () => {
        return (
            <Button
                size="large"
                variant="contained"
                sx={{
                    width: '80%', // Match the Box width
                    margin: '20px auto', // Center the button with automatic margins
                    background: `${colors.primary}`,
                    "&:hover": {
                        background: `${colors.bgColor6}`,
                    },
                    display: 'block', // Ensures the button behaves as a block-level element
                }}
                onClick={(e) => getMedicines(e)}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'GET MEDICINES'}
            </Button>
        );
    };


    return (
        <div className="flex flex-col gap-8 justify-center items-center py-4 px-2">
            <div>
                <Space.Compact size="large">
                    <Search
                        placeholder="Search Diagnosis"
                        allowClear
                        onChange={(e) => handleSearchText(e.target.value)}
                        onSearch={() => handleOnSearchChange()}
                    />
                </Space.Compact>
            </div>
            {
                filters ?
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                    overflowY: 'auto',
                    maxHeight: '300px', // Adjust based on your needs
                    width: '80%',
                    padding: 2,
                    borderRadius: 1,
                }}>
                    {
                        filteredMedicines.length > 0 ?
                        filteredMedicines.map((diagnosis) => (
                            <FormControlLabel
                                control={<Checkbox checked={checkedDiagnosis.includes(diagnosis)} onChange={handleCheckChange(diagnosis)} />}
                                label={diagnosis}
                                key={diagnosis}
                            />
                        )) :
                        <TextField
                            id="outlined-basic"
                            size="small"
                            variant="outlined"
                            value={'No Data'}
                            InputProps={{
                                readOnly: true, // Make the TextField read-only
                            }}
                        />
                    }
                </Box> :
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                    overflowY: 'auto',
                    maxHeight: '300px', // Adjust based on your needs
                    width: '80%',
                    padding: 2,
                    borderRadius: 1,
                }}>
                    {
                        initialDiagnosis.length > 0 ?
                        initialDiagnosis.map((diagnosis) => (
                            <FormControlLabel
                                control={<Checkbox checked={checkedDiagnosis.includes(diagnosis)} onChange={handleCheckChange(diagnosis)} />}
                                label={diagnosis}
                                key={diagnosis}
                            />
                        )) :
                        <TextField
                            id="outlined-basic"
                            size="small"
                            variant="outlined"
                            value={'No Data'}
                            InputProps={{
                                readOnly: true, // Make the TextField read-only
                            }}
                        />
                    }
                </Box>
            }
            <div className="w-full py-2 pt-3 flex justify-center">
                {renderButton()}
            </div>
        </div>
    );
};

export default GetMedicines;
