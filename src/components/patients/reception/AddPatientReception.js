import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel } from "@mui/material";
// import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { colors } from "../../../assets/utils/colors";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../App";

// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "75%",
//     maxHeight: "90vh",
//     overflowY: "auto",
//     bgcolor: "background.paper",
//     p: 4,
// };

const chronics = ['Diabtices', 'Low blood pressure', 'Viral fever', 'bp', 'High BP fever', 'Low sugar'];
const allergies = ['Zink', 'Paracemol', 'crocine', 'Combilam', 'D-Cold 1', 'Dcoldlotal', 'Azithromycine', 'Paramol']

const AddPatientReception = () => {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [status, setStatus] = useState("");
    const [next_of_Kin, setNext_Kin] = useState("");
    const [kin_phone, setKin_Phone] = useState("");
    const [kin_address, setKin_Address] = useState("");
    const [goverment_personnel, setGov_personnel] = useState("");
    const [employment_status, setEmp_status] = useState("");
    const [education_status, setEdu_status] = useState("");
    const [relationship, setRelationship] = useState("");
    const [kin_status, setKin_Status] = useState("");
    const [sponsorship, setSponsorship] = useState("");
    const [reception_department, setRecep_department] = useState("");
    const [checkedChronics, setCheckedChronics] = useState([]);
    const [checkedAllergies, setCheckedAllergies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [age, setAge] = useState(""); // State to hold the calculated age

    // const dispatch = useDispatch();

    useEffect(() => {
        const today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
    
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        setAge(age);
    }, [dob]);


    const generateUniqueTimestamp = () => {
        // Get the current time in milliseconds
        const currentTimeMillis = Date.now();
        
        // Convert to seconds
        const currentTimeSeconds = Math.floor(currentTimeMillis / 1000);
        
        return currentTimeSeconds;
    }
    
    const getCurrentYear = () => {
        return new Date().getFullYear();
    }


    const createMRN = () => {
        const timestamp = generateUniqueTimestamp();
        const year = getCurrentYear();
        
        // Format the MRN as 'timestamp/Year'
        const mrn = `${timestamp}-${year}`;
        
        return mrn;
    }
    

    const userRegistration = async (e) => {
        e.preventDefault();

        if (!firstName.trim() ||!lastName.trim() ||!email.trim() ||!phone.trim() ||!address.trim() ||!gender.trim() ||!dob.trim()) {
            toast.error("Please fill in all required fields.");
        } else {
            try {
                
                const mrn = createMRN();
                const docRef = doc(db, "patientsBucket", mrn);
                const docSnap = await getDoc(docRef);
            
                if (docSnap.exists()) {
                    toast.info("Try Again");
                } else {
                    setLoading(true);
                    await setDoc(doc(db, "patientsBucket", mrn), {
                        firstName,middleName,lastName,email,phone,address,gender,dob,status,next_of_Kin,kin_phone,kin_address,goverment_personnel,age,
                        employment_status,education_status,relationship,kin_status,sponsorship,reception_department,checkedChronics,checkedAllergies,
                        mrn, patientID: mrn, bloodGroup: ''
                    })
                    .then(async() => {
                        await setDoc(doc(db, "patients", mrn, "public", "info"), {
                            firstName,middleName,lastName,email,phone,address,gender,dob,status,next_of_Kin,kin_phone,kin_address,goverment_personnel,age,
                            employment_status,education_status,relationship,kin_status,sponsorship,reception_department,checkedChronics,checkedAllergies,
                            mrn, patientID: mrn, bloodGroup: ''
                        })
                        toast.success("updated successfull");
                        setFirstName("");
                        setMiddleName("");
                        setLastName("");
                        setEmail("");
                        setPhone("");
                        setAddress("");
                        setGender("");
                        setDob("");
                        setStatus("");
                        setNext_Kin("");
                        setKin_Phone("");
                        setKin_Address("");
                        setGov_personnel("");
                        setEmp_status("");
                        setEdu_status("");
                        setRelationship("");
                        setKin_Status("");
                        setSponsorship("");
                        setRecep_department("");
                        setCheckedChronics("");
                        setCheckedAllergies("");
                        setAge("");
                        setLoading(false);
    
                    })
                    .catch((error) => {
                        toast.error(error.message);
                        setLoading(false);
                    })
                }
            } catch (error) {
                toast.error(error.message);
                setLoading(false);
            }
        }
    };


    const handleChronicCheckChange = (chronic) => (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add symptom to array if checked
            setCheckedChronics([...checkedChronics, chronic]);
        } else {
            // Remove symptom from array if unchecked
            setCheckedChronics(checkedChronics.filter((s) => s !== chronic));
        }
    };

    const handleAllergyCheckChange = (allergy) => (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add symptom to array if checked
            setCheckedAllergies([...checkedAllergies, allergy]);
        } else {
            // Remove symptom from array if unchecked
            setCheckedAllergies(checkedAllergies.filter((s) => s !== allergy));
        }
    };

    const renderButton = () => {
        if (loading) {
            return (
                <Button
                    size="large"
                    variant="contained"
                    className="w-[82%] cursor-not-allowed"
                    sx={{ background: `${colors.primary}` }}
                    disabled
                >
                    Loading...
                </Button>
            );
        } else {
            return (
                <Button
                    size="large"
                    variant="contained"
                    className="w-[82%]"
                    sx={{
                        background: `${colors.primary}`,
                        "&:hover": {
                            background: `${colors.bgColor6}`,
                        },
                    }}
                    onClick={(e) => userRegistration(e)}
                >
                    SAVE PATIENT
                </Button>
            );
        }
    };


    console.log('chronics', checkedChronics);
    console.log('allergies', checkedAllergies);


    return (
        <div className="relative">
            <div>
                <div className="flex flex-row gap-8 justify-between px-12">
                    <div><h3 className="flex justify-center text-center font-bold mx-0 text-xl py-4">RECEPTION</h3></div>
                    <div className="w-40 h-45 flex justify-center bg-gray-500 py-4 aspect-square"><p className="text-center text-white">Profile Picture</p></div>
                </div>
                <div className="space-y-4 text-center divide-y divide-gray-250">
                    <div className="my-2 space-y-1">
                        <div className="flex flex-row gap-8 justify-end items-end py-4 px-2">
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    size="small"
                                    id="outlined-first-name"
                                    label="First Name"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    size="small"
                                    id="outlined-middle-name"
                                    label="Middle Name"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-last-name"
                                    label="Last Name"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-row gap-8 justify-end items-end py-4 px-2">
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-dob"
                                    size="small"
                                    // label="Date of Birth"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    type="date"
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <FormControl variant="outlined" size="small" className="w-[82%]">
                                <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        label="Gender"
                                        id="outlined-gender"
                                        size="small"
                                        variant="outlined"
                                        className="w-[100%]"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <FormControl variant="outlined" size="small" className="w-[82%]">
                                <InputLabel id="status-label">Status</InputLabel>
                                    <Select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        id="outlined-status"
                                        label="Status"
                                        size="small"
                                        variant="outlined"
                                        className="w-[100%]"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Married">Married</MenuItem>
                                        <MenuItem value="Single">Single</MenuItem>
                                        <MenuItem value="Divorced">Divorced</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="flex flex-row gap-8 justify-end space-x-4 items-end py-4 px-2">
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-phone"
                                    label="Phone Number"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-email"
                                    label="Email"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-address"
                                    label="Address"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-2 space-y-1">
                        <div className="flex flex-row gap-8 justify-end space-x-4 items-end py-4 px-2">
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    size="small"
                                    id="outlined-kin-name"
                                    label="Next of Kin"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={next_of_Kin}
                                    onChange={(e) => setNext_Kin(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-kin-phone"
                                    label="Kin Phone Number"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    type="number"
                                    value={kin_phone}
                                    onChange={(e) => setKin_Phone(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-kin-address"
                                    label="Kin Address"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={kin_address}
                                    onChange={(e) => setKin_Address(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-8 justify-end space-x-4 items-end py-4 px-2">
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    size="small"
                                    id="outlined-gov-personnel"
                                    label="Goverment personnel"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={goverment_personnel}
                                    onChange={(e) => setGov_personnel(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-edu-status"
                                    label="Education status"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={education_status}
                                    onChange={(e) => setEdu_status(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-emp-status"
                                    label="Employment status"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={employment_status}
                                    onChange={(e) => setEmp_status(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-8 justify-end space-x-4 items-end py-4">
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    size="small"
                                    id="outlined-relation-ship"
                                    label="Relationship"
                                    variant="outlined"
                                    className="w-[85%]"
                                    value={relationship}
                                    onChange={(e) => setRelationship(e.target.value)}
                                />
                            </div>
                            <div></div>
                            <div className="w-full py-2 flex justify-center">
                                <FormControl variant="outlined" size="small" className="w-[85%]">
                                    <InputLabel id="kin-status-label">Kin Status</InputLabel>
                                    <Select
                                        labelId="kin-status-label"
                                        id="outlined-kin-status"
                                        value={kin_status}
                                        onChange={(e) => setKin_Status(e.target.value)}
                                        label="Kin Status"
                                        className="w-[100%]"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Married">Married</MenuItem>
                                        <MenuItem value="Single">Single</MenuItem>
                                        <MenuItem value="Divorced">Divorced</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 space-y-1">
                        <div className="flex flex-row gap-10 justify-end space-x-4 items-end py-4)">
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    size="small"
                                    id="outlined-dep-reception"
                                    label="Department for reception"
                                    variant="outlined"
                                    className="w-[85%]"
                                    value={reception_department}
                                    onChange={(e) => setRecep_department(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    size="small"
                                    id="outlined-sponsor"
                                    label="Sponsorship"
                                    variant="outlined"
                                    className="w-[85%]"
                                    value={sponsorship}
                                    onChange={(e) => setSponsorship(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-6 space-y-1">
                        <div className="flex flex-row gap-8 justify-between space-x-4 items-end)">
                            <div><h3 className="flex justify-center text-center mx-0 text-xl py-4">Chronics</h3></div>
                            <div><h3 className="flex justify-center text-center mx-0 text-xl py-4">Allergies</h3></div>
                        </div>
                        <div className="flex flex-row gap-8 justify-end space-x-4 items-end)">
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: 3,
                                overflowY: 'auto',
                                maxHeight: '300px', // Adjust based on your needs
                                width: '50%',
                                padding: 2,
                                borderRadius: 1,
                            }}>
                                {
                                    chronics.map((chronic) => (
                                        <FormControlLabel
                                            control={<Checkbox checked={checkedChronics.includes(chronic)} onChange={handleChronicCheckChange(chronic)} />}
                                            label={chronic}
                                            key={chronic}
                                        />
                                    ))
                                }
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: 3,
                                overflowY: 'auto',
                                maxHeight: '300px', // Adjust based on your needs
                                width: '50%',
                                padding: 2,
                                borderRadius: 1,
                            }}>
                                {
                                    allergies.map((allergy) => (
                                        <FormControlLabel
                                            control={<Checkbox checked={checkedAllergies.includes(allergy)} onChange={handleAllergyCheckChange(allergy)} />}
                                            label={allergy}
                                            key={allergy}
                                        />
                                    ))
                                }
                            </Box>
                        </div>
                    </div>
                </div>

                <div className="w-full py-2 pt-3 flex justify-center">
                    {renderButton()}
                </div>
            </div>
        </div>
    );
};

export default AddPatientReception;
