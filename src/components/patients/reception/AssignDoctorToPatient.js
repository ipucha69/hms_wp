import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../App";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
// import moment from "moment";

import { Autocomplete, IconButton, TextField } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import { Modal } from "antd";

import { Button } from "@mui/material";

import { colors } from "../../../assets/utils/colors";
import { addDoctors, selectDoctors } from "../../../reducers/doctorSlice";
import toast from "react-hot-toast";


const specializations = [
    "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology", "Hematology", 
    "Immunology", "Nephrology", "Neurology", "Obstetrics & Gynecology", "Ophthalmology", 
    "Orthopedics", "Otolaryngology", "Pathology", "Pediatrics", "Pharmacology", 
    "Plastic Surgery", "Pulmonology", "Radiology", "Urology", "Allergy & Immunology", 
    "Anesthesiology", "Colon & Rectal Surgery", "Dentistry", "Emergency Medicine", 
    "Family Practice", "General Surgery", "Geriatric Medicine", "Internal Medicine", 
    "Medical Genetics", "Microbiology", "Molecular Biology", "Nuclear Medicine", 
    "Obstetrics", "Oncology", "Oral & Maxillofacial Surgery", "Osteopathic Medicine", 
    "Otorhinolaryngology", "Pathology", "Physical Medicine & Rehabilitation", 
    "Preventive Medicine", "Proctology", "Psychiatry", "Radiology", "Rheumatology", 
    "Thoracic Surgery", "Transplantation", "Tropical Medicine", "Vascular Surgery"
];

const clinics = [
    { id: '1', label: 'OPD'},
    { id: '2', label: 'CTC'},
    { id: '3', label: 'DENTAL'},
    { id: '4', label: 'EYE'},
    { id: '5', label: 'TB'},
    { id: '6', label: 'VCT'},
]

const AssignDoctorToPatient = ({ patient, title }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [specialization, setSpecialization] = useState("");
    const [doctor, setDoctor] = useState("");
    const [clinic, setClinic] = useState("");


    useEffect(() => {
        const getDoctors = async () => {
            let patientsArray = [];

            setPageLoading(true);

            const q = query(
                collection(db, "userBucket"),
                where("role", "==", "Doctor")
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                patientsArray.push(data);
            });

            if (patientsArray.length > 0) {
                dispatch(addDoctors(patientsArray));
                setPageLoading(false);
            } else {
                dispatch(addDoctors([]));
                setPageLoading(false);
            }
        };

        getDoctors();
    }, [dispatch]);

    const doctorsArray = useSelector(selectDoctors);
    const doctors = doctorsArray.filter(doctor => doctor.specialization === specialization.label);

    console.log(pageLoading, doctors);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const AssignDoctor = async () => {
        if (!clinic) {
            toast.error("Please select clinic");
        } else {
            try {
                setLoading(true);
                await setDoc(doc(db, "patientsQueue", patient.patientID), {
                    clinicID: clinic.id,
                    clinic: clinic.label,
                    specialization: specialization ? specialization.label: "",
                    doctorName: doctor ? doctor.label: "",
                    doctorID: doctor ? doctor.id: "",
                    ...patient
                })

                setLoading(false);
                setDoctor("");
                setClinic("");
                setSpecialization("");
                toast.success("Clinic is assigned successfully");
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
                    onClick={(e) => AssignDoctor(e)}
                >
                    ASSIGN
                </Button>
            );
        }
    };


    const sortedDoctors = doctors.map((item) => ({
        id: item.userID,
        label: `${item.firstName} ${item.lastName}`,
        data: item,
    }));

    const doctorOnChange = (e, value) => {
        setDoctor(value);
    };

    const sortedSpecs = specializations.map((item) => ({
        id: item,
        label: item,
        data: item,
    }));

    const specOnChange = (e, value) => {
        setSpecialization(value);
    };

    const clinicOnChange = (e, value) => {
        setClinic(value)
    }

    return (
        <div className="relative">
            {/* {pageLoading ? (
                <div className="py-4 w-full flex justify-center items-center overflow-hidden">
                <div className="absolute bg-white bg-opacity-70 z-10 min-h-screen w-full flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"></div>
                </div>
                </div>
            ) : null} */}
            <IconButton variant="outlined" onClick={showModal}>
                <RemoveRedEye className="text-[#0A365C] cursor-pointer" />
            </IconButton>

            <Modal
                title={<h3 style={{textAlign: 'center'}}>{title}</h3>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                zIndex={800}
                okType="default"
                cancelButtonProps={{
                className: "hidden",
                }}
            >
                <div className="flex flex-col">
                    <div className="w-full py-2 flex justify-center">
                        <Autocomplete
                            id="combo-box-demo"
                            options={clinics}
                            size="small"
                            freeSolo
                            className="w-[82%]"
                            value={clinic}
                            onChange={clinicOnChange}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Clinic" />
                            )}
                        />
                    </div>
                    <div className="w-full py-2 flex justify-center">
                        <Autocomplete
                            id="combo-box-demo"
                            options={sortedSpecs}
                            size="small"
                            freeSolo
                            className="w-[82%]"
                            value={specialization}
                            onChange={specOnChange}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Specialization" />
                            )}
                        />
                    </div>
                    {
                        specialization ?
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
                        </div> : null
                    }
                    <div className="w-full py-2 pt-3 flex justify-center">
                        {renderButton()}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AssignDoctorToPatient;
