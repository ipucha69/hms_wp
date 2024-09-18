import React, { useEffect, useState } from "react";
import { db } from "../../../App";
import { collection, getDocs, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Space, Input, Table} from "antd";

// import { useNavigate } from "react-router-dom";
// import { Queue } from "@mui/icons-material";

import { selectPatients, addPatients, addFilteredPatients, selectFilteredPatients, addPatientDetails } from "../../../reducers/patientSlice";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import { IconButton } from "@mui/material";


const { Search } = Input;

const columns = [
    {
        title: "#",
        dataIndex: "key",
        key: "key",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Patient ID",
        dataIndex: "patientID",
        key: "patientID",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Patient Name",
        dataIndex: ["firstName", "middleName", "lastName"],
        key: "name",
        render: (_, record) => <p>{record.firstName} {record.middleName} {record.lastName}</p>,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Blood Group",
        dataIndex: "bloodGroup",
        key: "bloodGroup",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        render: (_, record) => <p>{moment(record.created_at.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
    },
    {
        title: "Actions",
        key: "action",
        render: (_, patient) => (
            <div className="flex flex-row gap-1 justify-start">
                <ViewPatient patient={patient} />
            </div>
        ),
    },
];


const ViewPatient = ({ patient }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleViewPatient = () => {
      dispatch(addPatientDetails(patient));
      navigate(`/patients/ipd/${patient?.patientID}`);
    };
  
    return (
      <p className="mt-1">
        <IconButton onClick={() => handleViewPatient()}>
          <Settings className="text-[#0A365C] text-xl cursor-pointer" />
        </IconButton>
      </p>
    );
};

const IPDList = () => {
  const dispatch = useDispatch();
    // const navigate = useNavigate();

  const [pageLoading, setPageLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(false);

    useEffect(() => {
        const getPatients = async () => {
            let patientsArray = [];

            setPageLoading(true);

            const q = query(
                collection(db, "patientsQueue"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                patientsArray.push(data);
            });

            if (patientsArray.length > 0) {
                dispatch(addPatients(patientsArray));
                setPageLoading(false);
            } else {
                dispatch(addPatients([]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch]);

    const patients = useSelector(selectPatients);
    console.log(patients)

    const sortedPatients = patients
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((patient, index) => ({ ...patient, key: index + 1 }));


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedItems = patients.filter((item) => {
                const name = `${item.firstName} ${item.lastName}`;
                return item?.patientID?.toLocaleLowerCase()?.includes(text) || name.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredPatients(searchedItems));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredPatients([]));
            setFilters(false);
        }
    };
    
    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredPatients([]));
            setFilters(false);
            setSearchText(value);
        }
    };

    const filteredPatients = useSelector(selectFilteredPatients);

    const sortedFilteredCustomers = filteredPatients
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((patient, index) => ({ ...patient, key: index + 1 }));


    // const handleQueuePatient = () => {
    //     navigate('/patients-queue');
    // }
  

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
                        placeholder="Search MRN/NAME"
                        allowClear
                        onChange={(e) => handleSearchText(e.target.value)}
                        onSearch={() => handleOnSearchChange()}
                    />
                </Space.Compact>
            </div>
            {/* <AddPatientReception />
            <AddPatientInfo /> */}
            {/* <PatientQueue /> */}
            {/* <div onClick={() => handleQueuePatient()}
                className="h-10 w-56 bg-primaryColor cursor-pointer rounded-xl flex flex-row gap-1 justify-center text-white"
            >
                <Queue className="mt-2 py-0.5" />{" "}
                <p className="py-2">Patients Queue</p>
            </div> */}
        </div>
        <div className="pt-4">
            {filters ? (
            <>
                <div className="pt-4">
                <Table
                    columns={columns}
                    dataSource={sortedFilteredCustomers}
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
                    dataSource={sortedPatients}
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

export default IPDList;
