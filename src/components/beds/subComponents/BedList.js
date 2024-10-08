import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../App";
import { collection, getDocs, query, where } from "firebase/firestore";

import { Space, Input, Table} from "antd";

import moment from "moment";
import { addBedsAllotments, addFilteredBedsAllotments, selectBedsAllotments, selectFilteredBedsAllotments } from "../../../reducers/bedSlice";

const { Search } = Input;

const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Bed Number",
            dataIndex: "number",
            key: "number",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Bed Type",
            dataIndex: "type",
            key: "type",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Patient Name",
            dataIndex: "patientName",
            key: "patientName",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Allotment Date",
            dataIndex: "bedAllotmentDate",
            key: "bedAllotmentDate",
            render: (_, record) => <p>{moment(record.bedAllotmentDate.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
        },
        {
            title: "Discharge Date",
            dataIndex: "bedAllotmentDischargeDate",
            key: "bedAllotmentDischargeDate",
            render: (_, record) => <p>{moment(record.bedAllotmentDischargeDate.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
        },
    ]

const BedList = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const getPatients = async () => {
            let bedsAllotmentArray = [];
            // const user = auth.currentUser;

            setPageLoading(true);

            const q = query(
                collection(db, "bedAllotmentsBucket"),
                where("bedKeep", "==", true)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                bedsAllotmentArray.push(data);
            });

            if (bedsAllotmentArray.length > 0) {
                dispatch(addBedsAllotments(bedsAllotmentArray));
                setPageLoading(false);
            } else {
                dispatch(addBedsAllotments([]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch])


    const bedAllotments = useSelector(selectBedsAllotments);
    const filteredBedsAllotments = useSelector(selectFilteredBedsAllotments);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedBeds = bedAllotments.filter((allotment) => {
                return allotment?.number?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredBedsAllotments(searchedBeds));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredBedsAllotments([]));
            setFilters(false);
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredBedsAllotments([]));
            setFilters(false);
            setSearchText(value);
        }
    };



    const sortedBedAllotments = bedAllotments
    .slice()
    .sort((a, b) => new Date(b.bedAllotmentDate) - new Date(a.bedAllotmentDate))
    .map((allotment, index) => ({ ...allotment, key: index + 1 }));


    const sortedFilteredBedAllotments = filteredBedsAllotments
    .slice()
    .sort((a, b) => new Date(b.bedAllotmentDate) - new Date(a.bedAllotmentDate))
    .map((allotment, index) => ({ ...allotment, key: index + 1 }));



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
                            dataSource={sortedFilteredBedAllotments}
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
                            dataSource={sortedBedAllotments}
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

export default BedList