import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../App";
import { collection, getDocs, query } from "firebase/firestore";
// import moment from "moment";

import { IconButton } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import { Modal } from "antd";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";

import { colors } from "../../../assets/utils/colors";
import { addDoctors, selectDoctors } from "../../../reducers/doctorSlice";


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

const AssignDoctorToPatient = ({ patient, title }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [specialization, setSpecialization] = useState('');
    const [doctor, setDoctor] = useState({});


    useEffect(() => {
        const getDoctors = async () => {
            let patientsArray = [];

            setPageLoading(true);

            const q = query(
                collection(db, "userBucket"),
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
                dispatch(addDoctors([
                    {firstName: 'Rashid', lastName: 'Iddi', specialization: 'Oncology'},
                    {name: 'Luqman', lastName: 'Humud', specialization: 'Pulmonology'}
                ]));
                setPageLoading(false);
            }
        };

        getDoctors();
    }, [dispatch]);

    const doctorsArray = useSelector(selectDoctors);
    const doctors = doctorsArray.filter(doctor => doctor.specialization === specialization);

    console.log(doctorsArray);
    console.log(doctors);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const AssignDoctor = () => {
        setLoading(true);
        console.log('assigning doctor ..... for :', patient.email);
        setLoading(false);
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

    return (
        <div className="relative">
            {pageLoading ? (
                <div className="py-4 w-full flex justify-center items-center overflow-hidden">
                <div className="absolute bg-white bg-opacity-70 z-10 min-h-screen w-full flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"></div>
                </div>
                </div>
            ) : null}
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
                        <FormControl variant="outlined" size="small" className="w-[82%]">
                            <InputLabel id="specialization-label">Specialization</InputLabel>
                            <Select
                                labelId="specialization-label"
                                id="specialization-select"
                                value={specialization}
                                label="Specialization"
                                size="small"
                                variant="outlined"
                                className="w-[100%]"
                                onChange={(e) => setSpecialization(e.target.value)}
                            >
                                {specializations.map((spec) => (
                                    <MenuItem key={spec} value={spec}>
                                        {spec}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    {
                        specialization ?
                        <div className="w-full py-2 flex justify-center">
                            <FormControl variant="outlined" size="small" className="w-[82%]">
                                <InputLabel id="doctor-label">Select Doctor</InputLabel>
                                <Select
                                    labelId="doctor-label"
                                    id="doctor-select"
                                    value={doctor}
                                    label="Select Doctor"
                                    size="small"
                                    variant="outlined"
                                    className="w-[100%]"
                                    onChange={(e) => setDoctor(e.target.value)}
                                >
                                    {doctors.map((spec) => (
                                        <MenuItem key={spec.id} value={`${spec.firstName} ${spec.lastName}`}>
                                            {`${spec.firstName} ${spec.lastName}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
