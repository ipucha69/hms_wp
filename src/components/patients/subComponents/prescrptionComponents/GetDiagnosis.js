import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Space, Input } from "antd";

import { colors } from "../../../../assets/utils/colors";

const { Search } = Input;
const GetDiagnosis = () => {
    // Initial array of symptoms
    const initialSymptoms = [
        'Fever', 'Cough', 'Headache', 'Fatigue', 'Sore Throat',
        'Nausea', 'Dizziness', 'Rash', 'Itching', 'Abdominal Pain',
        'Constipation', 'Diarrhea', 'Vomiting', 'Muscle Aches', 'Chills'
    ];
    

    // State to keep track of checked symptoms
    const [checkedSymptoms, setCheckedSymptoms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState(false);
    const [filteredSymptoms, setFilteredSymptoms] = useState([]);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedSymptoms = initialSymptoms.filter((symptom) => {
                return symptom.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            setFilteredSymptoms(searchedSymptoms);
            setFilters(true);
        } else {
            // Update state with filtered patients
            setFilteredSymptoms([]);
            setFilters(false);
        }
    };

    // Handler function to update checked symptoms array
    const handleCheckChange = (symptom) => (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add symptom to array if checked
            setCheckedSymptoms([...checkedSymptoms, symptom]);
        } else {
            // Remove symptom from array if unchecked
            setCheckedSymptoms(checkedSymptoms.filter((s) => s !== symptom));
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            setFilteredSymptoms([]);
            setFilters(false);
            setSearchText(value);
        }
    };
    


    const getDiagnosis = () => {
        setLoading(true);
        console.log('getting diagnosis :', checkedSymptoms);
        setLoading(false);
    }


    const renderButton = () => {
        return (
            <Button
                size="large"
                variant="contained"
                sx={{
                    width: '60%', // Match the Box width
                    margin: '20px auto', // Center the button with automatic margins
                    background: `${colors.primary}`,
                    "&:hover": {
                        background: `${colors.bgColor6}`,
                    },
                    display: 'block', // Ensures the button behaves as a block-level element
                }}
                onClick={(e) => getDiagnosis(e)}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'GET DIAGNOSIS'}
            </Button>
        );
    };


    return (
        <div className="flex flex-col gap-8 justify-center items-center py-4 px-2">
            <div>
                <Space.Compact size="large">
                    <Search
                        placeholder="Search Symptom"
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
                    width: '60%',
                    padding: 2,
                    borderRadius: 1,
                }}>
                    {filteredSymptoms.map((symptom) => (
                        <FormControlLabel
                            control={<Checkbox checked={checkedSymptoms.includes(symptom)} onChange={handleCheckChange(symptom)} />}
                            label={symptom}
                            key={symptom}
                        />
                    ))}
                </Box> :
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                    overflowY: 'auto',
                    maxHeight: '300px', // Adjust based on your needs
                    width: '60%',
                    padding: 2,
                    borderRadius: 1,
                }}>
                    {initialSymptoms.map((symptom) => (
                        <FormControlLabel
                            control={<Checkbox checked={checkedSymptoms.includes(symptom)} onChange={handleCheckChange(symptom)} />}
                            label={symptom}
                            key={symptom}
                        />
                    ))}
                </Box>
            }
            <div className="w-full py-2 pt-3 flex justify-center">
                {renderButton()}
            </div>
        </div>
    );
};

export default GetDiagnosis;
