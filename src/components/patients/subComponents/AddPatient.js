import React, { useState } from "react";
import Box from "@mui/material/Box";
import Add from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { colors } from "../../../assets/utils/colors";
import { useParams } from "react-router-dom";

const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    p: 4,
};

const AddPatient = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState(""); // Assuming dob stands for Date of Birth
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userRegistration = async (e) => {
        e.preventDefault();

        if (!firstName.trim() ||!lastName.trim() ||!email.trim() ||!phone.trim() ||!address.trim() ||!gender.trim() ||!dob.trim()) {
            toast.error("Please fill in all required fields.");
        } else {
            // Start registration
            console.log('Registering patient...');
            // setLoading(true);
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

    return (
        <div>
            <div
                onClick={handleOpen}
                className="h-10 w-56 bg-primaryColor cursor-pointer rounded-xl flex flex-row gap-1 justify-center text-white"
            >
                <Add className="mt-2 py-0.5" />{" "}
                <p className="py-2">Create New Patient</p>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="rounded-md">
                    <div>
                        <h3 className="text-center text-xl py-4">Add New Patient</h3>
                        <div>
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
                                    id="outlined-last-name"
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
                                    id="outlined-phone"
                                    label="Phone Number"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                            <div className="w-full py-2 flex justify-center">
                                <Select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    label="Gender"
                                    id="outlined-gender"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </div>
                            <div className="w-full py-2 flex justify-center">
                                <TextField
                                    id="outlined-dob"
                                    size="small"
                                    variant="outlined"
                                    className="w-[82%]"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    type="date"
                                />
                            </div>
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

export default AddPatient;
