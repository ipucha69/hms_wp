import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../App";
import { collection, getDocs, query, where } from "firebase/firestore";

import { Space, Input, Table} from "antd";

import { addFilteredPrescriptions, addPrescriptions, selectFilteredPrescriptions, selectPrescriptions } from "../../../reducers/doctorSlice";
import moment from "moment";

const { Search } = Input;

const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Date",
            dataIndex: "prescriptionDate",
            key: "prescriptionDate",
            render: (_, record) => <p>{moment(record.prescriptionDate.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
        },
        {
            title: "Patient Name",
            dataIndex: "patientName",
            key: "patientName",
            render: (text) => <p>{text}</p>,
        }
    ]

const PrescriptionList = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const getPatients = async () => {
            let prescriptionsArray = [];
            const user = auth.currentUser;

            setPageLoading(true);

            const q = query(
                collection(db, "prescriptionsBucket"),
                where("doctorID", "==", user.uid)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                prescriptionsArray.push(data);
            });

            if (prescriptionsArray.length > 0) {
                dispatch(addPrescriptions(prescriptionsArray));
                setPageLoading(false);
            } else {
                dispatch(addPrescriptions([]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch])


    const prescriptions = useSelector(selectPrescriptions);
    const filteredPrescriptions = useSelector(selectFilteredPrescriptions);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedPatients = prescriptions.filter((prescription) => {
                return prescription?.patientName?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredPrescriptions(searchedPatients));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredPrescriptions([]));
            setFilters(false);
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredPrescriptions([]));
            setFilters(false);
            setSearchText(value);
        }
    };



    const sortedPrescriptions = prescriptions
    .slice()
    .sort((a, b) => new Date(b.prescriptionDate) - new Date(a.prescriptionDate))
    .map((prescription, index) => ({ ...prescription, key: index + 1 }));


    const sortedFilteredPrescriptions = filteredPrescriptions
    .slice()
    .sort((a, b) => new Date(b.prescriptionDate) - new Date(a.prescriptionDate))
    .map((prescription, index) => ({ ...prescription, key: index + 1 }));



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
                            placeholder="Search patientID"
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
                            dataSource={sortedFilteredPrescriptions}
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
                            dataSource={sortedPrescriptions}
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

export default PrescriptionList