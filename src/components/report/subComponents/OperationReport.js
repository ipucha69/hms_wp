import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../App";
import { collection, getDocs, query, where } from "firebase/firestore";

import { Space, Input, Table} from "antd";

import moment from "moment";
import { addFilteredOperationReport, addOperationReport, selectFilteredOperationReports, selectOperationReports } from "../../../reducers/reportSlice";

const { Search } = Input;

const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => <p>{text}</p>,
        },
        {
          title: "Report Date",
          dataIndex: "reportDate",
          key: "reportDate",
          render: (_, record) => <p>{moment(record.reportDate.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
      },
      {
          title: "Patient Name",
          dataIndex: "patientName",
          key: "patientName",
          render: (text) => <p>{text}</p>,
      },
      {
        title: "Doctor Name",
        dataIndex: "doctorName",
        key: "doctorName",
        render: (text) => <p>{text}</p>,
    },
    ]

const OperationReport = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const getPatients = async () => {
            let reportsArray = [];
            // const user = auth.currentUser;

            setPageLoading(true);

            const q = query(
                collection(db, "reportsGenerated"),
                where("reportName", "==", "Operation")
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                reportsArray.push(data);
            });

            if (reportsArray.length > 0) {
                dispatch(addOperationReport(reportsArray));
                setPageLoading(false);
            } else {
                dispatch(addOperationReport([]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch])


    const operationReports = useSelector(selectOperationReports);
    const filteredOperationReport = useSelector(selectFilteredOperationReports);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedReport = operationReports.filter((report) => {
                return report?.patientName?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredOperationReport(searchedReport));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredOperationReport([]));
            setFilters(false);
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredOperationReport([]));
            setFilters(false);
            setSearchText(value);
        }
    };



    const sortedOperationReports = operationReports
    .slice()
    .sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate))
    .map((report, index) => ({ ...report, key: index + 1 }));


    const sortedFilteredOperationReport = filteredOperationReport
    .slice()
    .sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate))
    .map((report, index) => ({ ...report, key: index + 1 }));



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
                            placeholder="Search patient"
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
                            dataSource={sortedFilteredOperationReport}
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
                            dataSource={sortedOperationReports}
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

export default OperationReport