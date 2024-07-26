import React, { useEffect, useState } from "react";
import { db } from "../../../App";
import { collection, getDocs, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Space, Input, Table} from "antd";

import { addFilteredPatientsQueue, addPatientDetails, addPatientsQueue, selectFilteredPatientsQueue, selectPatientsQueue } from "../../../reducers/patientSlice";
import { IconButton } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
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
        title: "Doctor Name",
        dataIndex: "doctorName",
        key: "doctorName",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Process",
        key: "process",
        render: (_, record) => (
            <div className="flex flex-row gap-1 justify-start">
                <ViewPatient patient={record} />
            </div>
        ),
    }
];


const ViewPatient = ({ patient }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleQueuePatient = () => {
        dispatch(addPatientDetails(patient));
        navigate(`/patients-queue/${patient?.patientID}`);
    };
  
    return (
      <p className="mt-1">
        <IconButton onClick={() => handleQueuePatient()}>
          <RemoveRedEye className="text-[#0A365C] text-xl cursor-pointer" />
        </IconButton>
      </p>
    );
};

const PatientQueue = () => {
  const dispatch = useDispatch();

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
                dispatch(addPatientsQueue(patientsArray));
                setPageLoading(false);
            } else {
                dispatch(addPatientsQueue([
                    { firstName: 'Rashid', middleName: 'Seif', lastName: 'Iddi', doctorName: 'Rashid', patientID: 'cc1', status: 'WAITING FOR BILL'},
                    { firstName: 'Rachel', middleName: 'Joseph', lastName: 'Hezron', doctorName: 'Luqman', patientID: 'cc2', status: 'WAITING FOR DOCTOR'}
                ]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch]);

    const patients = useSelector(selectPatientsQueue);

    const sortedPatients = patients
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((patient, index) => ({ ...patient, key: index + 1 }));


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedPatients = patients.filter((patient) => {
                return patient?.patientID?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredPatientsQueue(searchedPatients));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredPatientsQueue([]));
            setFilters(false);
        }
    };
    
    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredPatientsQueue([]));
            setFilters(false);
            setSearchText(value);
        }
    };

    const filteredPatients = useSelector(selectFilteredPatientsQueue);

    const sortedFilteredCustomers = filteredPatients
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((patient, index) => ({ ...patient, key: index + 1 }));
  

    return (
        <div className="relative">
            {pageLoading ? (
                <div className="py-4 w-full flex justify-center items-center overflow-hidden">
                <div className="absolute bg-white bg-opacity-70 z-10 min-h-screen w-full flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"></div>
                </div>
                </div>
            ) : null}
            <div><h3 className="flex justify-center text-center font-bold mx-0 text-xl py-4">PATIENTS QUEUE</h3></div>
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

export default PatientQueue;
