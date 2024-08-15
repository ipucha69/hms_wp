import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../App";
import { collection, getDocs, query } from "firebase/firestore";
import { Space, Input, Table} from "antd";

import { addBloodBank, addFilteredBloodBank, selectBloodBank, selectFilteredBloodBank } from "../../../reducers/bloodSlice";

const { Search } = Input;

const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Blood Group",
            dataIndex: "bloodGroup",
            key: "bloodGroup",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => <p>{text}</p>,
        }
    ]

const BloodBank = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const getDonors = async () => {
            let bloodBankArray = [];
            // const user = auth.currentUser;

            setPageLoading(true);

            const q = query(
                collection(db, "bloodBank"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                bloodBankArray.push(data);
            });

            if (bloodBankArray.length > 0) {
                dispatch(addBloodBank(bloodBankArray));
                setPageLoading(false);
            } else {
                dispatch(addBloodBank([]));
                setPageLoading(false);
            }
        };

        getDonors();
    }, [dispatch])


    const bloodBank = useSelector(selectBloodBank);
    const filteredBloodBank = useSelector(selectFilteredBloodBank);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedDonors = bloodBank.filter((donor) => {
                return donor?.bloodGroup?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredBloodBank(searchedDonors));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredBloodBank([]));
            setFilters(false);
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredBloodBank([]));
            setFilters(false);
            setSearchText(value);
        }
    };


    const sortedBloodBank = bloodBank
    .slice()
    .sort((a, b) => (b.bloodGroup) - (a.bloodGroup))
    .map((donor, index) => ({ ...donor, key: index + 1 }));

    const sortedFilteredBloodBank = filteredBloodBank
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
                            placeholder="Search Blood Group"
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
                            dataSource={sortedFilteredBloodBank}
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
                            dataSource={sortedBloodBank}
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

export default BloodBank