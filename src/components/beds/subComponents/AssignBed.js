import React, { useState } from "react";
import Box from "@mui/material/Box";
import Add from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
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

const AssignBed = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userRegistration = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Please enter manager name");
        } else if (!email) {
            toast.error("Please enter email");
        } else {
            //start registration
            console.log('registering...');
            // setLoading(true);
        }
    };

    const renderButton = () => {
        if (loading) {
            return (
                <>
                <Button
                    size="large"
                    variant="contained"
                    className="w-[82%] cursor-not-allowed"
                    sx={{ background: `${colors.primary}` }}
                    disabled
                >
                    <svg
                    className="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                    ></svg>
                    Loading...
                </Button>
                </>
            );
        } else {
            return (
                <>
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
                    ASSIGN BED
                </Button>
                </>
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
                <p className="py-2">Assign New Bed</p>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="rounded-md">
                <div>
                    <h3 className="text-center text-xl py-4">Assign New Bed</h3>
                    <div>
                    <div className="w-full py-2 flex justify-center">
                        <TextField
                        size="small"
                        id="outlined-basic"
                        label="Bed Name"
                        variant="outlined"
                        className="w-[82%]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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

export default AssignBed;
