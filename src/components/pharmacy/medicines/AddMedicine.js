import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../App";
import { collection, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";

import { Autocomplete, Button, TextField } from "@mui/material";

import { colors } from "../../../assets/utils/colors";
import toast from "react-hot-toast";
import { addCategory, selectCategory } from "../../../reducers/pharmacySlice";


const AddMedicine = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [medicineName, setMedicineName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    const [manufacturingCompany, setManufacturingCompany] = useState("");


    useEffect(() => {
        const getPatients = async () => {
            let categoryArray = [];
            // const user = auth.currentUser;

            setPageLoading(true);

            const q = query(
                collection(db, "medicinesCategories"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                categoryArray.push(data);
            });

            if (categoryArray.length > 0) {
                dispatch(addCategory(categoryArray));
                setPageLoading(false);
            } else {
                dispatch(addCategory([]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch])


    const categories = useSelector(selectCategory);

    const sortedCategories = categories.map((item) => ({
        id: item.categoryID,
        label: item.category,
        data: item,
    }));


    const registerMedicine = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        console.log(user.tenantId);

        if (!category) {
            toast.error("Please fill category");
        } else if (!status) {
            toast.error("Please fill status");
        } else if (!price) {
            toast.error("Please fill price");
        } else if (!medicineName) {
            toast.error("Please fill medicine name");
        } else if (!manufacturingCompany) {
            toast.error("Please fill manufacturing Company");
        } else {
            try {
                setLoading(true);
                const dataRef = doc(collection(db, "medicinesBucket"));
                await setDoc(dataRef, {
                    category: category?.label,
                    categoryID: category?.id,
                    medicineName,
                    manufacturingCompany,
                    price: parseFloat(price),
                    status: parseInt(status),
                    description
                })
                    .then( async () => {
                        const dataDocRef = doc(db, "medicinesBucket", dataRef.id);
                        await updateDoc(dataDocRef, {
                            medicineID: dataRef.id
                        })
                        setLoading(false);
                        setCategory("");
                        setDescription("");
                        setMedicineName("");
                        setManufacturingCompany("");
                        setPrice("");
                        setStatus("");
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


    const categoryOnChange = (e, value) => {
        setCategory(value);
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
                    onClick={(e) => registerMedicine(e)}
                >
                    ADD MEDICINE
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
                        label="Medicine Name"
                        variant="outlined"
                        className="w-[82%]"
                        value={medicineName}
                        onChange={(e) => setMedicineName(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <Autocomplete
                        id="combo-box-demo"
                        options={sortedCategories}
                        size="small"
                        freeSolo
                        className="w-[82%]"
                        value={category}
                        onChange={categoryOnChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Category" />
                        )}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        multiline
                        rows={1}
                        label="Medicine Description"
                        variant="outlined"
                        className="w-[82%]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Price"
                        variant="outlined"
                        className="w-[82%]"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Manufacturing Company"
                        variant="outlined"
                        className="w-[82%]"
                        value={manufacturingCompany}
                        onChange={(e) => setManufacturingCompany(e.target.value)}
                    />
                </div>
                <div className="w-full py-2 flex justify-center">
                    <TextField
                        size="small"
                        id="outlined-complain"
                        label="Status"
                        variant="outlined"
                        className="w-[82%]"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        type="number"
                    />
                </div>
                <div className="w-full py-2 pt-3 flex justify-center">
                    {renderButton()}
                </div>
            </div>
        </div>
    );
}

export default AddMedicine