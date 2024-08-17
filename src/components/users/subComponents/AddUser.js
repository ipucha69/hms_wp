import React, { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../../App";

import Box from "@mui/material/Box";
import Add from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
// import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { colors } from "../../../assets/utils/colors";

const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    p: 4,
};

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

const roles = ["Doctor", "Nurse", "Pharmacist", "Accountant", "Lab Technician"];


const AddUser = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [availability, setAvailability] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const userRegistration = async (e) => {
        e.preventDefault();

        if (!firstName ||!lastName ||!email || !phone || !address) {
            toast.error("Please fill in all fields.");
        } else if (!role) {
            toast.error("Please select role.");
        } else {
            try {
                setLoading(true);
                const password = `${lastName}123`;
                const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Ensure you have a password field in your form
                const user = userCredential.user;

                // Add user to Firestore collections
                await Promise.all([
                    setDoc(doc(db, "users", "doctors", user.uid, "public", "account", "info"), {
                        firstName,
                        lastName,
                        email,
                        phone,
                        role: role?.label,
                        address,
                        specialization: specialization.label? specialization.label: "",
                        availability
                    }),
                    setDoc(doc(db, "userBucket", user.uid), {
                        firstName,
                        lastName,
                        email,
                        userID: user.uid,
                        role,
                        phone,
                        address,
                        specialization: specialization.label? specialization.label: "",
                        availability,
                    }),
                ]);

                toast.success("User created successfully!");
                setLoading(false);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setAddress("");
                setSpecialization("");
                setAvailability("");
                setRole("");
            } catch (error) {
                console.error("Error creating doctor:", error);
                toast.error("Failed to register doctor.");
                setLoading(false);
            }
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
                    CREATE USER
                </Button>
            );
        }
    };

    const sortedRoles = roles.map((item) => ({
        id: item,
        label: item,
        data: item,
    }));


    const sortedSpecs = specializations.map((item) => ({
        id: item,
        label: item,
        data: item,
    }));

    const roleOnChange = (e, value) => {
        setRole(value);
    };


    const specOnChange = (e, value) => {
        setSpecialization(value);
    };

    return (
        <div>
            <div
                onClick={handleOpen}
                className="h-10 w-56 bg-primaryColor cursor-pointer rounded-xl flex flex-row gap-1 justify-center text-white"
            >
                <Add className="mt-2 py-0.5" />{" "}
                <p className="py-2">Create New User</p>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="rounded-md">
                    <div>
                        <h3 className="text-center text-xl py-4">Add User</h3>
                        <div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="First Name"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-basic"
                                    label="Last Name"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-basic"
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
                                    id="outlined-basic"
                                    label="Phone Number"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="number"
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-basic"
                                    label="Address"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={sortedRoles}
                                    size="small"
                                    freeSolo
                                    className="w-[82%]"
                                    value={role}
                                    onChange={roleOnChange}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select role" />
                                    )}
                                />
                            </div>
                            {
                                role?.label === "Doctor" ?
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
                                </div> : null
                            }
                            {
                                role?.label === "Doctor" ?
                                <div className="w-full py-2 flex justify-center">
                                    <TextField
                                        id="outlined-basic"
                                        label="Availability"
                                        size="small"
                                        variant="outlined"
                                        className="w-[82%]"
                                        value={availability}
                                        onChange={(e) => setAvailability(e.target.value)}
                                    />
                                </div> : null
                            }

                            <div className="w-full py-2 pt-3 flex justify-center">
                                {renderButton()}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddUser;
