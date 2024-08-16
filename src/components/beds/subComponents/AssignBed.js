import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../App";
import { collection, doc, getDocs, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";

import { Autocomplete, Button, TextField } from "@mui/material";

import { colors } from "../../../assets/utils/colors";
import toast from "react-hot-toast";

import { addBeds, selectBeds } from "../../../reducers/bedSlice";
import { addPatients, selectPatients } from "../../../reducers/patientSlice";


const AssignBed = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [patient, setPatient] = useState("");
    const [bed, setBed] = useState("");
    const [bedAllotmentDate, setBedAllotmentDate] = useState("");
    const [bedAllotmentDischargeDate, setBedAllotmentDischargeDate] = useState("");


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

        const getBeds = async () => {
            let bedsArray = [];

            // setPageLoading(true);

            const q = query(
                collection(db, "bedsBucket"),
                where("occupied", "==", false)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                bedsArray.push(data);
            });

            if (bedsArray.length > 0) {
                dispatch(addBeds(bedsArray));
                // setPageLoading(false);
            } else {
                dispatch(addBeds([]));
                // setPageLoading(false);
            }
        };

        getPatients();
        getBeds();

    }, [dispatch])


    const patients = useSelector(selectPatients);
    const beds = useSelector(selectBeds);

    const sortedPatients = patients.map((patient) => ({
        id: patient.patientID,
        label: `${patient.firstName} ${patient.lastName}`,
        data: patient,
    }));

    const sortedBeds = beds.map((bed) => ({
        id: bed.bedID,
        label: `${bed.number} - ${bed.type}`,
        data: bed,
    }));


    const registerBed = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;

        if (!patient) {
            toast.error("Please select patient");
        } else if (!bed) {
            toast.error("Please select bed");
        } else if (!bedAllotmentDate) {
            toast.error("Please select allotment date");
        } else if (!bedAllotmentDischargeDate) {
            toast.error("Please select discharge date");
        } else {
            try {
                setLoading(true);
                const dataRef = doc(collection(db, "bedAllotmentsBucket"));
                await setDoc(dataRef, {
                    patientID: patient?.id,
                    patientName: patient?.label,
                    age: patient?.data?.age,
                    gender: patient?.data?.gender,
                    bloodGroup: patient?.data?.bloodGroup,
                    doctorID: user.uid,
                    bedKeep: true,
                    number: bed?.data?.number,
                    type: bed?.data?.type,
                    bedAllotmentDate: Timestamp.fromDate(new Date(bedAllotmentDate)),
                    bedAllotmentDischargeDate: Timestamp.fromDate(new Date(bedAllotmentDischargeDate)),
                })
                    .then( async () => {
                        const dataDocRef = doc(db, "bedAllotmentsBucket", dataRef.id);
                        await updateDoc(dataDocRef, {
                            bedAllotmentID: dataRef.id
                        })
                        .then( async () => {
                            const bedDocRef = doc(db, "bedsBucket", bed.id);
                            await updateDoc(bedDocRef, {
                                occupied: true,
                            })

                            setLoading(false);
                            setPatient("");
                            setBed("");
                            setBedAllotmentDate("");
                            setBedAllotmentDischargeDate("");
                            toast.success("bed is assigned successfully");
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


    const bedOnChange = (e, value) => {
        setBed(value);
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
                    onClick={(e) => registerBed(e)}
                >
                    ASSIGN BED ALLOTMENT
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
                        options={sortedBeds}
                        size="small"
                        freeSolo
                        className="w-[82%]"
                        value={bed}
                        onChange={bedOnChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Bed" />
                        )}
                    />
                </div>
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
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        id="outlined-dob"
                        size="small"
                        variant="outlined"
                        className="w-[82%]"
                        value={bedAllotmentDate}
                        onChange={(e) => setBedAllotmentDate(e.target.value)}
                        type="date"
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        id="outlined-dob"
                        size="small"
                        variant="outlined"
                        className="w-[82%]"
                        value={bedAllotmentDischargeDate}
                        onChange={(e) => setBedAllotmentDischargeDate(e.target.value)}
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

export default AssignBed