import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../App";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { Button, TextField } from "@mui/material";

import { colors } from "../../../assets/utils/colors";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import moment from "moment";
import { addPrescriptionDetails, selectPrescriptionDetails } from "../../../reducers/pharmacySlice";


const AddMedication = () => {

    const dispatch = useDispatch();
    const { prescriptionID } = useParams();

    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pharmacyMedication, setPharmacyMedication] = useState("");


    useEffect(() => {
        const getDetails = async () => {
            setPageLoading(true);
            const docRef = doc(db, "prescriptionsBucket", prescriptionID);
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                const data = docSnap.data();
                dispatch(addPrescriptionDetails(data));
                setPageLoading(false);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
                dispatch(addPrescriptionDetails({}));
                setPageLoading(false);
            }
        };

        getDetails();
    }, [dispatch, prescriptionID])


    const prescriptionDetails = useSelector(selectPrescriptionDetails);


    const registerPrescription = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        console.log(user.tenantId);

        if (!prescriptionDetails) {
            toast.error("Please refresh and start again");
        } else if (!pharmacyMedication) {
            toast.error("Please fill status");
        } else {
            try {
                setLoading(true);
                const dataDocRef = doc(db, "prescriptionsBucket", prescriptionDetails?.prescriptionID);
                await updateDoc(dataDocRef, {
                    pharmacyMedication
                })
                setLoading(false);
            } catch (error) {
                toast.error(error.message);
                setLoading(false);
            }
        }
    }


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
                    onClick={(e) => registerPrescription(e)}
                >
                    EDIT PRESCRIPTION
                </Button>
            );
        }
    };

    const prescriptionDate = moment(prescriptionDetails.prescriptionDate.toDate()).format("YYYY-MM-DD HH:mm:ss")

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
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Doctor Name"
                        variant="outlined"
                        className="w-[82%]"
                        value={prescriptionDetails.doctorName}
                        // onChange={(e) => setMedicineName(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Patient Name"
                        variant="outlined"
                        className="w-[82%]"
                        value={prescriptionDetails.patientName}
                        // onChange={(e) => setMedicineName(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        multiline
                        rows={2}
                        label="Case History"
                        variant="outlined"
                        className="w-[82%]"
                        value={prescriptionDetails.caseHistory}
                        // onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        multiline
                        rows={2}
                        label="Medication"
                        variant="outlined"
                        className="w-[82%]"
                        value={prescriptionDetails.medication}
                        // onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        multiline
                        rows={2}
                        label="Medication from Pharmacy"
                        variant="outlined"
                        className="w-[82%]"
                        value={pharmacyMedication}
                        onChange={(e) => setPharmacyMedication(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Description"
                        variant="outlined"
                        className="w-[82%]"
                        value={prescriptionDetails.description}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Prescription Date"
                        variant="outlined"
                        className="w-[82%]"
                        value={prescriptionDate}
                        // type="date"
                    />
                </div>
                <div className="w-full py-2 pt-3 flex justify-center">
                    {renderButton()}
                </div>
            </div>
        </div>
    );
}

export default AddMedication
