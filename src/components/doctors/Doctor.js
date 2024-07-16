import React, { useEffect, useState } from "react";
import { db } from "../../App";
import { collection, getDocs, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Space, Input, Table} from "antd";

import AddDoctor from "./subComponents/AddDoctor";
import Description from "../common/Description";
import { addDoctors, selectDoctors, addFilteredDoctors, selectFilteredDoctors } from "../../reducers/doctorSlice";

const { Search } = Input;

const columns = [
    {
        title: "#",
        dataIndex: "key",
        key: "key",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Doctor Name",
        dataIndex: ["firstName", "lastName"],
        key: "name",
        render: (_, record) => <p>{record.firstName} {record.lastName}</p>,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Description",
        key: "view",
        render: (_, record) => (
        <p className="flex flex-row gap-1 justify-start">
            <Description data={record} title={"Doctor Descriptions"} />
        </p>
        ),
    },
    {
        title: "Specialization",
        dataIndex: "specialization",
        key: "specialization",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
        render: (text) => <p>{text}</p>,
    }
];

const Doctor = () => {
    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState(false);

    useEffect(() => {
        const getDoctors = async () => {
        let patientsArray = [];

        setPageLoading(true);

        const q = query(
            collection(db, "userBucket"),
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            //set data
            const data = doc.data();
            patientsArray.push(data);
        });

        if (patientsArray.length > 0) {
            dispatch(addDoctors(patientsArray));
            setPageLoading(false);
        } else {
            dispatch(addDoctors([]));
            setPageLoading(false);
        }
        };

        getDoctors();
    }, [dispatch]);

    const doctors = useSelector(selectDoctors);

    const sortedDoctors = doctors
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((doctor, index) => ({ ...doctor, key: index + 1 }));

    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedDoctors = doctors.filter((doctor) => {
                return doctor?.firstName?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredDoctors(searchedDoctors));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredDoctors([]));
            setFilters(false);
        }
    };
    
    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredDoctors([]));
            setFilters(false);
            setSearchText(value);
        }
    };

    const filteredDoctors = useSelector(selectFilteredDoctors);

    const sortedFilteredDoctors = filteredDoctors
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((doctor, index) => ({ ...doctor, key: index + 1 }));
  

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
                            placeholder="Search patient name"
                            allowClear
                            onChange={(e) => handleSearchText(e.target.value)}
                            onSearch={() => handleOnSearchChange()}
                        />
                    </Space.Compact>
                </div>
                <AddDoctor />
            </div>
            <div className="pt-4">
                {filters ? (
                <>
                    <div className="pt-4">
                    <Table
                        columns={columns}
                        dataSource={sortedFilteredDoctors}
                        size="middle"
                        pagination={{ defaultPageSize: 10, size: "middle" }}
                    />
                    </div>
                </>
                ) : (
                <>
                    <div className="pt-4">
                    <Table
                        columns={columns}
                        dataSource={sortedDoctors}
                        size="middle"
                        pagination={{ defaultPageSize: 10, size: "middle" }}
                    />
                    </div>
                </>
                )}
            </div>
        </div>
    );
};

export default Doctor;
