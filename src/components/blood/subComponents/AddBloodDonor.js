import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../../App";
import { collection, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";

import { Autocomplete, Button, TextField } from "@mui/material";

import { colors } from "../../../assets/utils/colors";
import toast from "react-hot-toast";



const AddBloodDonor = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [blood, setBlood] = useState("");
    const [age, setAge] = useState("");
    const [lastDonationDate, setLastDonationDate] = useState("");
    const [description, setDescription] = useState("");
    

    useEffect(() => {
        setPageLoading(true);
        setPageLoading(false);
        setPageLoading(false);
    }, [dispatch])

    const genders = [
        {label: 'Male', gender: 'M'},
        {label: 'Female', gender: 'F'}
    ];

    const bloodGroups = [
        {label: 'A+', id: 'A+'},
        {label: 'A-', id: 'A-'},
        {label: 'AB+', id: 'AB+'},
        {label: 'B+', id: 'B+'},
        {label: 'B-', id: 'B-'},
        {label: 'O+', id: 'O+'},
        {label: 'O-', id: 'O-'},
    ];


    const registerDonor = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;

        console.log(user.tenantId);

        if (!firstName || !lastName) {
            toast.error("Please fill first name and last name of the donor");
        } else if (!address || !phone) {
            toast.error("Please fill address and phone of the donor");
        } else if (!gender) {
            toast.error("Please select gender");
        } else if (!blood) {
            toast.error("Please select blood group");
        } else if (!age) {
            toast.error("Please fill age");
        } else {
            try {
                setLoading(true);
                const dataRef = doc(collection(db, "bloodDonors"));
                await setDoc(dataRef, {
                    email,
                    phone,
                    address,
                    age,
                    bloodGroup: blood?.id,
                    gender: gender?.gender,
                    description,
                    firstName,
                    lastName,
                    lastDonationDate: lastDonationDate ? Timestamp.fromDate(new Date(lastDonationDate)) : '',
                })
                    .then( async () => {
                        const dataDocRef = doc(db, "bloodDonors", dataRef.id);
                        await updateDoc(dataDocRef, {
                            donorID: dataRef.id
                        })
                        
                        setLoading(false);
                        setFirstName("")
                        setLastName("")
                        setAddress("")
                        setEmail("")
                        setPhone("")
                        setGender("")
                        setBlood("")
                        setAge("")
                        setLastDonationDate("")
                        setDescription("")
                        toast.success("Donor is saved successfully");
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


    const bloodOnChange = (e, value) => {
        setBlood(value);
    };


    const genderOnChange = (e, value) => {
        setGender(value);
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
                    onClick={(e) => registerDonor(e)}
                >
                    ADD DONOR
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
                    <TextField
                        size="small"
                        id="outlined-complain"
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
                        id="outlined-complain"
                        label="Last Name"
                        variant="outlined"
                        className="w-[82%]"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="E-mail"
                        variant="outlined"
                        className="w-[82%]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Phone Number"
                        variant="outlined"
                        className="w-[82%]"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Address"
                        variant="outlined"
                        className="w-[82%]"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Age"
                        variant="outlined"
                        className="w-[82%]"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <Autocomplete
                        id="combo-box-demo"
                        options={genders}
                        size="small"
                        freeSolo
                        className="w-[82%]"
                        value={gender}
                        onChange={genderOnChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Gender" />
                        )}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <Autocomplete
                        id="combo-box-demo"
                        options={bloodGroups}
                        size="small"
                        freeSolo
                        className="w-[82%]"
                        value={blood}
                        onChange={bloodOnChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Blood" />
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
                        value={lastDonationDate}
                        onChange={(e) => setLastDonationDate(e.target.value)}
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

export default AddBloodDonor