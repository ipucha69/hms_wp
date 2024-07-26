import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, IconButton, InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { colors } from "../../../assets/utils/colors";
import { Edit } from "@mui/icons-material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    p: 4,
};

const EditPatient = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userRegistration = async (e) => {
        e.preventDefault();

        if (!firstName.trim() ||!lastName.trim() ||!email.trim() ||!phone.trim() ||!address.trim() ||!gender.trim() ||!dob.trim()) {
            toast.error("Please fill in all required fields.");
        } else {
            // Start registration
            dispatch();
            console.log('Registering patient...');
            setLoading(true);
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
                    UPDATE PATIENT
                </Button>
            );
        }
    };


    return (
        <div className="relative">
            <IconButton onClick={handleOpen} className="flex justify-center">
                <Edit className="text-primaryColor text-xl cursor-pointer" />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="rounded-md">
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
                        </div>

                        <div className="w-full py-2 pt-3 flex justify-center">
                            {renderButton()}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default EditPatient;
