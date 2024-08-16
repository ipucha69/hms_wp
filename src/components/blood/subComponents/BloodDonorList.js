import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../App";
import { collection, getDocs, query } from "firebase/firestore";
import { Space, Input, Table} from "antd";

import moment from "moment";

import { addDonors, addFilteredDonors, selectDonors, selectFilteredDonors } from "../../../reducers/bloodSlice";

const { Search } = Input;

const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Donor Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => <p>{record.firstName} {record.lastName}</p>,
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Sex",
            dataIndex: "gender",
            key: "gender",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Blood Group",
            dataIndex: "bloodGroup",
            key: "bloodGroup",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Last Donation Date",
            dataIndex: "lastDonationDate",
            key: "lastDonationDate",
            render: (_, record) => <p>{ record.lastDonationDate ? moment(record.lastDonationDate.toDate()).format("YYYY-MM-DD HH:mm:ss") : "-"}</p>
        },
    ]

const BloodDonorList = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const getDonors = async () => {
            let donorsArray = [];
            // const user = auth.currentUser;

            setPageLoading(true);

            const q = query(
                collection(db, "bloodDonors"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                donorsArray.push(data);
            });

            if (donorsArray.length > 0) {
                dispatch(addDonors(donorsArray));
                setPageLoading(false);
            } else {
                dispatch(addDonors([]));
                setPageLoading(false);
            }
        };

        getDonors();
    }, [dispatch])


    const donors = useSelector(selectDonors);
    const filteredDonors = useSelector(selectFilteredDonors);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedDonors = donors.filter((donor) => {
                return donor?.bloodGroup?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredDonors(searchedDonors));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredDonors([]));
            setFilters(false);
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredDonors([]));
            setFilters(false);
            setSearchText(value);
        }
    };


    const sortedDonors = donors
    .slice()
    .sort((a, b) => (b.bloodGroup) - (a.bloodGroup))
    .map((donor, index) => ({ ...donor, key: index + 1 }));

    const sortedFilteredDonors = filteredDonors
    .slice()
    .sort((a, b) => (b.bloodGroup) - (a.bloodGroup))
    .map((donor, index) => ({ ...donor, key: index + 1 }));

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
                            dataSource={sortedFilteredDonors}
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
                            dataSource={sortedDonors}
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

export default BloodDonorList