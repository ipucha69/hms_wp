import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../App";
import { collection, doc, getDocs, query, setDoc, Timestamp, updateDoc } from "firebase/firestore";

import { Autocomplete, Button, TextField } from "@mui/material";

import { colors } from "../../../assets/utils/colors";
import { addPatients, selectPatients } from "../../../reducers/patientSlice";
import toast from "react-hot-toast";


const AddAppointment = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [patient, setPatient] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");


    useEffect(() => {
        const getPatients = async () => {
            let patientsArray = [];

            setPageLoading(true);

            const q = query(
                collection(db, "patientsBucket"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                patientsArray.push(data);
            });

            if (patientsArray.length > 0) {
                dispatch(addPatients(patientsArray));
                setPageLoading(false);
            } else {
                dispatch(addPatients([
                    { firstName: 'Rashid', middleName: 'Seif', lastName: 'Iddi', email: 'ipucha69@gmail.com', age: 28, patientID: 'cc1', phone: '0679329802', gender: 'M', address: 'Kawe-Dar-es-Salaam', bloodGroup: 'A+'},
                    { firstName: 'Rachel', middleName: 'Joseph', lastName: 'Hezron', email: 'hezronrachel100@gmail.com', age: 25, patientID: 'cc2', phone: '0788858654', gender: 'F', address: 'Kinondoni-Dar-es-Salaam', bloodGroup: 'O'}
                ]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch])


    const patients = useSelector(selectPatients);

    const sortedPatients = patients.map((patient) => ({
        id: patient.patientID,
        label: `${patient.firstName} ${patient.lastName}`,
        data: patient,
    }));


    
    const registerAppointment = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;

        if (!patient) {
            toast.error("Please select patient");
        } else if (!appointmentDate) {
            toast.error("Please select appointment date");
        } else {
            try {
                setLoading(true);
                const dataRef = doc(collection(db, "appointmentsBucket"));
                await setDoc(dataRef, {
                    patientID: patient?.id,
                    patientName: patient?.label,
                    doctorID: user.uid,
                    appointmentDate: Timestamp.fromDate(new Date(appointmentDate)),
                })
                    .then( async () => {
                        const dataDocRef = doc(db, "appointmentsBucket", dataRef.id);
                        await updateDoc(dataDocRef, {
                            appointmentID: dataRef.id
                        })
                        .then( async () => {
                            const dataDocRef = doc(db, "users", "doctors", user.uid, "public", "appointments", dataRef.id);
                            await setDoc(dataDocRef, {
                                appointmentID: dataRef.id,
                                patientID: patient?.id,
                                patientName: patient?.label,
                                appointmentDate: Timestamp.fromDate(new Date(appointmentDate)),
                            })

                            setLoading(false);
                            setPatient("");
                            setAppointmentDate("");
                            toast.success("Appointment is saved successfully");
                        })
                        .catch((error) => {
                            toast.error(error.message);
                            setLoading(false);
                        });
                    })
                    .catch((error) => {
                        toast.error(error.message);
                        setLoading(false);
                    });
            } catch (error) {
                toast.error(error.message);
                setLoading(false);
            }
        }
    }


    const patientOnChange = (e, value) => {
        setPatient(value);
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
                    onClick={(e) => registerAppointment(e)}
                >
                    ADD APPOINMENT
                </Button>
            );
        }
    };

    return (
        <div className="relative">
            {pageLoading ? (
                <div className="py-4 w-full flex justify-center items-center overflow-hidden">
                <div className="absolute bg-white bg-opacity-70 z-10 min-h-screen w-full flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"></div>
                </div>
                </div>
            ) : null}
            <div className="flex flex-col">
                <div className="w-full py-2 flex justify-center">
                    <Autocomplete
                        id="combo-box-demo"
                        options={sortedPatients}
                        size="small"
                        freeSolo
                        className="w-[82%]"
                        value={patient}
                        onChange={patientOnChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Patient" />
                        )}
                    />
                    {/* <FormControl variant="outlined" size="small" className="w-[82%]">
                        <InputLabel id="Patient-label">Select Patient</InputLabel>
                        <Select
                            labelId="patient-label"
                            id="patient-select"
                            value={patient}
                            label="Select Patient"
                            size="small"
                            variant="outlined"
                            className="w-[100%]"
                            onChange={(e) => setPatient(e.target.value)}
                        >
                            {patients.map((spec) => (
                                <MenuItem key={spec.id} value={`${spec.firstName} ${spec.lastName}`}>
                                    {`${spec.firstName} ${spec.lastName}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        id="outlined-dob"
                        size="small"
                        variant="outlined"
                        className="w-[82%]"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        type="date"
                    />
                </div>
                <div className="w-full py-2 pt-3 flex justify-center">
                    {renderButton()}
                </div>
            </div>
        </div>
    );
}

export default AddAppointment