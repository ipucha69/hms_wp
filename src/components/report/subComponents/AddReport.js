import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../App";
import { collection, doc, getDocs, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";

import { Autocomplete, Button, TextField } from "@mui/material";

import { colors } from "../../../assets/utils/colors";
import toast from "react-hot-toast";

import { addPatients, selectPatients } from "../../../reducers/patientSlice";
import { addReports, selectReports } from "../../../reducers/reportSlice";
import { addDoctors, selectDoctors } from "../../../reducers/doctorSlice";


const AddReport = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [patient, setPatient] = useState("");
    const [doctor, setDoctor] = useState("");
    const [report, setReport] = useState("");
    const [reportDate, setReportDate] = useState("");
    const [description, setDescription] = useState("");
    

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

        const getReports = async () => {
            let reportsArray = [];

            // setPageLoading(true);

            const q = query(
                collection(db, "reportsBucket"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                reportsArray.push(data);
            });

            if (reportsArray.length > 0) {
                dispatch(addReports(reportsArray));
                // setPageLoading(false);
            } else {
                dispatch(addReports([]));
                // setPageLoading(false);
            }
        };

        const getDoctors = async () => {
            let doctorsArray = [];

            // setPageLoading(true);

            const q = query(
                collection(db, "userBucket"),
                where("role", "==", "doctor")
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                doctorsArray.push(data);
            });

            if (doctorsArray.length > 0) {
                dispatch(addDoctors(doctorsArray));
                // setPageLoading(false);
            } else {
                dispatch(addDoctors([]));
                // setPageLoading(false);
            }
        };

        getPatients();
        getReports();
        getDoctors()

    }, [dispatch])


    const patients = useSelector(selectPatients);
    const reports = useSelector(selectReports);
    const doctors = useSelector(selectDoctors);

    const sortedPatients = patients.map((patient) => ({
        id: patient.patientID,
        label: `${patient.firstName} ${patient.lastName}`,
        data: patient,
    }));

    const sortedReports = reports.map((report) => ({
        id: report.reportID,
        label: report.reportName,
        data: report,
    }));


    const sortedDoctors = doctors.map((doctor) => ({
        id: doctor.id,
        label: `${doctor.firstName} ${doctor.lastName}`,
        data: doctor,
    }));


    const registerReport = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;

        console.log(user.tenantId);

        if (!patient) {
            toast.error("Please select patient");
        } else if (!report) {
            toast.error("Please select report");
        } else if (!doctor) {
            toast.error("Please select doctor");
        } else if (!reportDate) {
            toast.error("Please select report date");
        } else {
            try {
                setLoading(true);
                const dataRef = doc(collection(db, "reportsGenerated"));
                await setDoc(dataRef, {
                    patientID: patient?.id,
                    patientName: patient?.label,
                    age: patient?.data?.age,
                    gender: patient?.data?.gender,
                    bloodGroup: patient?.data?.bloodGroup,
                    doctorID: doctor?.id,
                    description,
                    doctorName: doctor?.label,
                    reportName: report?.label,
                    reportDate: Timestamp.fromDate(new Date(reportDate)),
                })
                    .then( async () => {
                        const dataDocRef = doc(db, "reportsGenerated", dataRef.id);
                        await updateDoc(dataDocRef, {
                            reportID: dataRef.id
                        })
                        
                        setLoading(false);
                        setPatient("");
                        setReport("");
                        setDoctor("");
                        setReportDate("");
                        setDescription("");
                        toast.success("report is saved successfully");
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


    const reportOnChange = (e, value) => {
        setReport(value);
    };

    const doctorOnChange = (e, value) => {
        setDoctor(value);
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
                    onClick={(e) => registerReport(e)}
                >
                    AASIGN REPORT
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
                        options={sortedReports}
                        size="small"
                        freeSolo
                        className="w-[82%]"
                        value={report}
                        onChange={reportOnChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Report" />
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
                    <Autocomplete
                        id="combo-box-demo"
                        options={sortedDoctors}
                        size="small"
                        freeSolo
                        className="w-[82%]"
                        value={doctor}
                        onChange={doctorOnChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Doctor" />
                        )}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        multiline
                        rows={1}
                        label="Description"
                        variant="outlined"
                        className="w-[82%]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        id="outlined-dob"
                        size="small"
                        variant="outlined"
                        className="w-[82%]"
                        value={reportDate}
                        onChange={(e) => setReportDate(e.target.value)}
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

export default AddReport