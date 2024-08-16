import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../App";
import { collection, getDocs, query } from "firebase/firestore";

import { Space, Input, Table} from "antd";

import { addFilteredPrescription, addPrescription, selectFilteredPrescription, selectPrescription } from "../../../reducers/pharmacySlice";
import moment from "moment";
import { RemoveRedEye } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const columns = [
    {
        title: "#",
        dataIndex: "key",
        key: "key",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Prescription Date",
        dataIndex: "prescriptionDate",
        key: "prescriptionDate",
        render: (_, record) => <p>{moment(record.prescriptionDate.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
    },
    {
        title: "Patient",
        dataIndex: "patientName",
        key: "patientName",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Doctor",
        dataIndex: "doctorName",
        key: "doctorName",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
            <div className="flex flex-row gap-1 justify-start">
                <ViewPatient prescription={record} />
            </div>
        ),
    }
]

const ViewPatient = ({ prescription }) => {
    const navigate = useNavigate();
    
    const handleQueuePatient = () => {
        navigate(`/medication/${prescription?.prescriptionID}`);
    };
    
    return (
        <p className="mt-1">
        <IconButton onClick={() => handleQueuePatient()}>
            <RemoveRedEye className="text-[#0A365C] text-xl cursor-pointer" />
        </IconButton>
        </p>
    );
};

const MedicationList = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const getPatients = async () => {
            let itemsArray = [];
            // const user = auth.currentUser;

            setPageLoading(true);

            const q = query(
                collection(db, "prescriptionsBucket"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                itemsArray.push(data);
            });

            if (itemsArray.length > 0) {
                dispatch(addPrescription(itemsArray));
                setPageLoading(false);
            } else {
                dispatch(addPrescription([]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch])


    const prescriptions = useSelector(selectPrescription);
    const filteredPrescriptions = useSelector(selectFilteredPrescription);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedItems = prescriptions.filter((item) => {
                return item?.patientName?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredPrescription(searchedItems));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredPrescription([]));
            setFilters(false);
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredPrescription([]));
            setFilters(false);
            setSearchText(value);
        }
    };



    const sortedItems = prescriptions
    .slice()
    .sort((a, b) => new Date(b.prescriptionDate) - new Date(a.prescriptionDate))
    .map((item, index) => ({ ...item, key: index + 1 }));


    const sortedFilteredItems = filteredPrescriptions
    .slice()
    .sort((a, b) => new Date(b.prescriptionDate) - new Date(a.prescriptionDate))
    .map((item, index) => ({ ...item, key: index + 1 }));



    return (
        <div className="relative">
            {pageLoading ? (
                <div className="py-4 w-full flex justify-center items-center overflow-hidden">
                <div className="absolute bg-white bg-opacity-70 z-10 min-h-screen w-full flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"></div>
                </div>
                </div>
            ) : null}
            <div className="flex flex-row gap-8 justify-end items-end py-4 px-2">
                <div>
                    <Space.Compact size="large">
                        <Search
                            placeholder="Search Patient"
                            allowClear
                            onChange={(e) => handleSearchText(e.target.value)}
                            onSearch={() => handleOnSearchChange()}
                        />
                    </Space.Compact>
                </div>
            </div>
            <div className="pt-4">
                {filters ? (
                <>
                    <div className="pt-4">
                        <Table
                            columns={columns}
                            dataSource={sortedFilteredItems}
                            size="middle"
                            pagination={{ defaultPageSize: 30, size: "middle" }}
                        />
                    </div>
                </>
                ) : (
                <>
                    <div className="pt-4">
                        <Table
                            columns={columns}
                            dataSource={sortedItems}
                            size="middle"
                            pagination={{ defaultPageSize: 30, size: "middle" }}
                        />
                    </div>
                </>
                )}
            </div>
        </div>
    )
}

export default MedicationList