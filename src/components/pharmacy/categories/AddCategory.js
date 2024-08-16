import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../../App";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

import { Button, TextField } from "@mui/material";

import { colors } from "../../../assets/utils/colors";
import toast from "react-hot-toast";


const AddCategory = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");


    useEffect(() => {
        setPageLoading(true);
        setPageLoading(false);
        setPageLoading(false);
    }, [dispatch])


    const registerCategory = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        console.log(user.tenantId);

        if (!category) {
            toast.error("Please fill category");
        } else {
            try {
                setLoading(true);
                const dataRef = doc(collection(db, "medicinesCategories"));
                await setDoc(dataRef, {
                    category,
                    description
                })
                    .then( async () => {
                        const dataDocRef = doc(db, "medicinesCategories", dataRef.id);
                        await updateDoc(dataDocRef, {
                            categoryID: dataRef.id
                        })
                        setLoading(false);
                        setCategory("");
                        setDescription("");
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
                    onClick={(e) => registerCategory(e)}
                >
                    ADD CATEGORY
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
                        label="Category Name"
                        variant="outlined"
                        className="w-[82%]"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        multiline
                        rows={1}
                        label="Category Description"
                        variant="outlined"
                        className="w-[82%]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 pt-3 flex justify-center">
                    {renderButton()}
                </div>
            </div>
        </div>
    );
}

export default AddCategory