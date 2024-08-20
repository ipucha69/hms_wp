import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { colors } from "../../../../../assets/utils/colors";

const AddPatientInfo = () => {

    const [complain, setComplain] = useState("");
    const [duration, setDuration] = useState("");
    const [hpi, setHPI] = useState("");
    const [ros, setROS] = useState("");
    const [pms, setPMS] = useState("");
    const [fsh, setFSH] = useState("");
    const [fda, setFDA] = useState("");
    const [gynocology, setGynocology] = useState("");
    const [generalExamination, setGeneralExamination] = useState("");
    const [localExamination, setLocalExamination] = useState("");
    const [otherExamination, setOtherExamination] = useState("");
    const [provisionalDiagnosis, setProvisionalDiagnosis] = useState("");
    const [differentDiagnosis, setDifferentDiagnosis] = useState("");
    const [finalDiagnosis, setFinalDiagnosis] = useState("");
    const [labolatory, setLabolatory] = useState("");
    const [radiology, setRadiology] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userRegistration = async (e) => {
        e.preventDefault();

        if (labolatory.trim()) {
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
                    SAVE
                </Button>
            );
        }
    };


    return (
        <div className="relative">
            {/* <h3 className="font-bold mx-12 text-xl py-4">PATIENT HISTORY</h3> */}
            <div className="space-y-4 text-center divide-y divide-gray-250">
                <div className="my-2 space-y-1">
                    <div className="flex flex-row gap-8 justify-end items-end py-4 px-2">
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                size="small"
                                id="outlined-complain"
                                multiline
                                rows={1}
                                label="Complain"
                                variant="outlined"
                                className="w-[88%]"
                                value={complain}
                                onChange={(e) => setComplain(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                size="small"
                                id="outlined-duration"
                                multiline
                                rows={1}
                                label="Duration"
                                variant="outlined"
                                className="w-[88%]"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-8 justify-end items-end py-4 px-2">
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="History of presenting illness(HPI)"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={hpi}
                                onChange={(e) => setHPI(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Review of other systems (ROS)"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={ros}
                                onChange={(e) => setROS(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Past medical history & Surgical history"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={pms}
                                onChange={(e) => setPMS(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-8 justify-end items-end py-4 px-2">
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Family & Social History"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={fsh}
                                onChange={(e) => setFSH(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Food & Drug Allergy"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={fda}
                                onChange={(e) => setFDA(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Gynocology History"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={gynocology}
                                onChange={(e) => setGynocology(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="my-2 space-y-1">
                    <h3 className="font-bold mx-10 text-xl text-pretty py-4">Examination</h3>
                    <div className="flex flex-row gap-8 justify-end items-end py-4 px-2">
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="General Examination"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={generalExamination}
                                onChange={(e) => setGeneralExamination(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Local Examination"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={localExamination}
                                onChange={(e) => setLocalExamination(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Other system Examination"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={otherExamination}
                                onChange={(e) => setOtherExamination(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="my-2 space-y-1">
                <h3 className="font-bold mx-10 text-xl py-4">Diagnosis</h3>
                    <div className="flex flex-row gap-8 justify-end items-end py-4 px-2">
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Provisional Diagnosis"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={provisionalDiagnosis}
                                onChange={(e) => setProvisionalDiagnosis(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Different Diagnosis"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={differentDiagnosis}
                                onChange={(e) => setDifferentDiagnosis(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Final Diagnosis"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[82%]"
                                value={finalDiagnosis}
                                onChange={(e) => setFinalDiagnosis(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="my-2 space-y-1">
                <h3 className="font-bold mx-10 text-xl py-4">Investigation</h3>
                    <div className="flex flex-row gap-8 justify-end items-end py-4 px-2">
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Labolatory"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[88%]"
                                value={labolatory}
                                onChange={(e) => setLabolatory(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 flex justify-center">
                            <TextField
                                id="outlined-multiline-static"
                                label="Radiology"
                                multiline
                                rows={1}
                                variant="outlined"
                                className="w-[88%]"
                                value={radiology}
                                onChange={(e) => setRadiology(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full py-2 pt-3 flex justify-center">
                {renderButton()}
            </div>
        </div>
    );
};

export default AddPatientInfo;
