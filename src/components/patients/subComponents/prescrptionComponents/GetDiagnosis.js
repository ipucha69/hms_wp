import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { Space, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../../App";

import { colors } from "../../../../assets/utils/colors";
import { addSymptoms, selectSymptoms } from '../../../../reducers/patientSlice';

const initialSymptoms = [
    { id: 1, title: "Fever" },
    { id: 2, title: "Cough" },
    { id: 3, title: "Shortness of breath" },
    { id: 4, title: "Fatigue" },
    { id: 5, title: "Headache" },
    { id: 6, title: "Sore throat" },
    { id: 7, title: "Runny nose" },
    { id: 8, title: "Nausea" },
    { id: 9, title: "Vomiting" },
    { id: 10, title: "Diarrhea" },
    { id: 11, title: "Muscle pain" },
    { id: 12, title: "Joint pain" },
    { id: 13, title: "Chills" },
    { id: 14, title: "Sweating" },
    { id: 15, title: "Loss of appetite" },
    { id: 16, title: "Weight loss" },
    { id: 17, title: "Rash" },
    { id: 18, title: "Itching" },
    { id: 19, title: "Swelling" },
    { id: 20, title: "Redness" },
    { id: 21, title: "Blurred vision" },
    { id: 22, title: "Dizziness" },
    { id: 23, title: "Tingling" },
    { id: 24, title: "Numbness" },
    { id: 25, title: "Chest pain" },
    { id: 26, title: "Palpitations" },
    { id: 27, title: "Difficulty swallowing" },
    { id: 28, title: "Dry mouth" },
    { id: 29, title: "Abdominal pain" },
    { id: 30, title: "Bloating" },
    { id: 31, title: "Constipation" },
    { id: 32, title: "Heartburn" },
    { id: 33, title: "Frequent urination" },
    { id: 34, title: "Painful urination" },
    { id: 35, title: "Blood in urine" },
    { id: 36, title: "Back pain" },
    { id: 37, title: "Neck pain" },
    { id: 38, title: "Shoulder pain" },
    { id: 39, title: "Knee pain" },
    { id: 40, title: "Foot pain" },
    { id: 41, title: "Hand pain" },
    { id: 42, title: "Elbow pain" },
    { id: 43, title: "Hip pain" },
    { id: 44, title: "Allergies" },
    { id: 45, title: "Sneezing" },
    { id: 46, title: "Wheezing" },
    { id: 47, title: "Difficulty breathing" },
    { id: 48, title: "Hives" },
    { id: 49, title: "Anxiety" },
    { id: 50, title: "Depression" },
    { id: 51, title: "Insomnia" },
    { id: 52, title: "Memory loss" },
    { id: 53, title: "Concentration problems" },
    { id: 54, title: "Mood swings" },
    { id: 55, title: "Irritability" },
    { id: 56, title: "Restlessness" },
    { id: 57, title: "Panic attacks" },
    { id: 58, title: "Hair loss" },
    { id: 59, title: "Dry skin" },
    { id: 60, title: "Brittle nails" },
    { id: 61, title: "Sweaty palms" },
    { id: 62, title: "Swollen lymph nodes" },
    { id: 63, title: "Enlarged spleen" },
    { id: 64, title: "Enlarged liver" },
    { id: 65, title: "Jaundice" },
    { id: 66, title: "Cyanosis" },
    { id: 67, title: "Clubbing" },
    { id: 68, title: "Night sweats" },
    { id: 69, title: "Daytime sleepiness" },
    { id: 70, title: "Snoring" },
    { id: 71, title: "Sleep apnea" },
    { id: 72, title: "Loss of smell" },
    { id: 73, title: "Loss of taste" },
    { id: 74, title: "Ear pain" },
    { id: 75, title: "Hearing loss" },
    { id: 76, title: "Ringing in ears" },
    { id: 77, title: "Tooth pain" },
    { id: 78, title: "Bleeding gums" },
    { id: 79, title: "Mouth sores" },
    { id: 80, title: "Voice changes" },
    { id: 81, title: "Hoarseness" },
    { id: 82, title: "Coughing up blood" },
    { id: 83, title: "Excessive thirst" },
    { id: 84, title: "Excessive hunger" },
    { id: 85, title: "Increased sweating" },
    { id: 86, title: "Decreased sweating" },
    { id: 87, title: "Heat intolerance" },
    { id: 88, title: "Cold intolerance" },
    { id: 89, title: "Flushing" },
    { id: 90, title: "Facial swelling" },
    { id: 91, title: "Unintentional weight loss" },
    { id: 92, title: "Unintentional weight gain" },
    { id: 93, title: "Abnormal heart rate" },
    { id: 94, title: "High blood pressure" },
    { id: 95, title: "Low blood pressure" },
    { id: 96, title: "Anemia" },
    { id: 97, title: "Bruising" },
    { id: 98, title: "Bleeding" },
    { id: 99, title: "Pale skin" },
    { id: 100, title: "Dark urine" },
    { id: 101, title: "Light-colored stool" },
    { id: 102, title: "Abnormal vaginal bleeding" },
    { id: 103, title: "Abnormal discharge" },
    { id: 104, title: "Pain during intercourse" },
    { id: 105, title: "Impotence" },
    { id: 106, title: "Infertility" },
    { id: 107, title: "Low libido" },
    { id: 108, title: "Missed periods" },
    { id: 109, title: "Heavy periods" },
    { id: 110, title: "Irregular periods" },
    { id: 111, title: "Frequent infections" },
    { id: 112, title: "Slow healing" },
    { id: 113, title: "Persistent fatigue" },
    { id: 114, title: "Swollen joints" },
    { id: 115, title: "Stiff joints" },
    { id: 116, title: "Red, swollen eyes" },
    { id: 117, title: "Watery eyes" },
    { id: 118, title: "Dry eyes" },
    { id: 119, title: "Double vision" },
    { id: 120, title: "Blind spots" },
    { id: 121, title: "Partial blindness" },
    { id: 122, title: "Color blindness" },
    { id: 123, title: "Light sensitivity" },
    { id: 124, title: "Seizures" },
    { id: 125, title: "Tremors" },
    { id: 126, title: "Paralysis" },
    { id: 127, title: "Balance problems" },
    { id: 128, title: "Coordination problems" },
    { id: 129, title: "Speech problems" },
    { id: 130, title: "Memory problems" },
    { id: 131, title: "Disorientation" },
    { id: 132, title: "Confusion" },
    { id: 133, title: "Unconsciousness" },
    { id: 134, title: "Coma" },
    { id: 135, title: "Stupor" },
    { id: 136, title: "Drowsiness" },
    { id: 137, title: "Light-headedness" },
    { id: 138, title: "Delirium" },
    { id: 139, title: "Hallucinations" },
    { id: 140, title: "Delusions" },
    { id: 141, title: "Obsessions" },
    { id: 142, title: "Compulsions" },
    { id: 143, title: "Aggressiveness" },
    { id: 144, title: "Violence" },
    { id: 145, title: "Homicidal thoughts" },
    { id: 146, title: "Suicidal thoughts" },
    { id: 147, title: "Low self-esteem" },
    { id: 148, title: "Guilt" },
    { id: 149, title: "Shame" },
    { id: 150, title: "Hopelessness" },
    { id: 151, title: "Helplessness" },
    { id: 152, title: "Worthlessness" },
    { id: 153, title: "Self-harm" },
    { id: 154, title: "Mood changes" },
    { id: 155, title: "Fatigue" },
    { id: 156, title: "Muscle weakness" },
    { id: 157, title: "Joint stiffness" },
    { id: 158, title: "Bone pain" },
    { id: 159, title: "Muscle cramps" },
    { id: 160, title: "Dehydration" },
    { id: 161, title: "Electrolyte imbalance" },
    { id: 162, title: "Overhydration" },
    { id: 163, title: "Hyponatremia" },
    { id: 164, title: "Hypernatremia" },
    { id: 165, title: "Hypokalemia" },
    { id: 166, title: "Hyperkalemia" },
    { id: 167, title: "Hypocalcemia" },
    { id: 168, title: "Hypercalcemia" },
    { id: 169, title: "Hypomagnesemia" },
    { id: 170, title: "Hypermagnesemia" },
    { id: 171, title: "Anorexia" },
    { id: 172, title: "Bulimia" },
    { id: 173, title: "Binge eating" },
    { id: 174, title: "Orthorexia" },
    { id: 175, title: "Avoidant/restrictive food intake" },
    { id: 176, title: "Pica" },
    { id: 177, title: "Rumination disorder" },
    { id: 178, title: "Night eating syndrome" },
    { id: 179, title: "Sleepwalking" },
    { id: 180, title: "Sleep talking" },
    { id: 181, title: "Restless legs syndrome" },
    { id: 182, title: "Narcolepsy" },
    { id: 183, title: "Sleep paralysis" },
    { id: 184, title: "Hypnagogic hallucinations" },
    { id: 185, title: "Hypnopompic hallucinations" },
    { id: 186, title: "Periodic limb movement disorder" },
    { id: 187, title: "Confusional arousals" },
    { id: 188, title: "Night terrors" },
    { id: 189, title: "Nightmares" },
    { id: 190, title: "REM sleep behavior disorder" },
    { id: 191, title: "Shift work disorder" },
    { id: 192, title: "Jet lag" },
    { id: 193, title: "Advanced sleep phase disorder" },
    { id: 194, title: "Delayed sleep phase disorder" },
    { id: 195, title: "Irregular sleep-wake rhythm" },
    { id: 196, title: "Non-24-hour sleep-wake rhythm" },
    { id: 197, title: "Circadian rhythm sleep disorders" },
    { id: 198, title: "Seasonal affective disorder" },
    { id: 199, title: "Hyperactivity" },
    { id: 200, title: "Inattention" },
  ];

const { Search } = Input;
const GetDiagnosis = () => {
    const dispatch = useDispatch();
    const [checkedSymptoms, setCheckedSymptoms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState(false);
    const [filteredSymptoms, setFilteredSymptoms] = useState([]);

    useEffect(() => {

        const fetchSymptoms = async () => {
            try {
                setPageLoading(true);
                const querySnapshot = await getDocs(collection(db, "symptoms"));
                const symptomsFromDb = querySnapshot.docs.map(doc => doc.data());
                addSymptoms(symptomsFromDb); // Ensure this function exists and works as expected
                setPageLoading(false);
            } catch (error) {
                console.error("Error fetching symptoms:", error);
                setPageLoading(false);
            }
        };
    
        fetchSymptoms();
    }, [dispatch]);


    const symptoms = useSelector(selectSymptoms);
    console.log(symptoms.length);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedSymptoms = initialSymptoms.filter((symptom) => {
                return symptom.title.toLocaleLowerCase()?.includes(text);
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
            setCheckedSymptoms(checkedSymptoms.filter((s) => s.id !== symptom.id));
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
        try {
            setLoading(true);

            console.log('get diagnosis');
            setLoading(false);
        
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
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
                onClick={(e) => getDiagnosis(e)}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'GET DIAGNOSIS'}
            </Button>
        );
    };


    console.log(pageLoading)


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
                    width: '80%',
                    padding: 2,
                    borderRadius: 1,
                }}>
                    {
                        filteredSymptoms.length > 0 ?
                        filteredSymptoms.map((symptom) => (
                            <FormControlLabel
                                control={<Checkbox checked={checkedSymptoms.includes(symptom)} onChange={handleCheckChange(symptom)} />}
                                label={symptom.title}
                                key={symptom.id}
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
                        initialSymptoms.length > 0 ?
                        initialSymptoms.map((symptom) => (
                            <FormControlLabel
                                control={<Checkbox checked={checkedSymptoms.includes(symptom)} onChange={handleCheckChange(symptom)} />}
                                label={symptom.title}
                                key={symptom.id}
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

export default GetDiagnosis;
