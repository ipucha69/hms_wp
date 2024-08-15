import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../App";
import { collection, getDocs, query } from "firebase/firestore";

import { Space, Input, Table} from "antd";

import { addAppointments, addFilteredAppointments, selectAppointments, selectFilteredAppointments } from "../../../reducers/doctorSlice";
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
            dataIndex: "appointmentDate",
            key: "appointmentDate",
            render: (_, record) => <p>{moment(record.appointmentDate.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
        },
        {
            title: "Patient Name",
            dataIndex: "patientName",
            key: "patientName",
            render: (text) => <p>{text}</p>,
        }
    ]

const AppointmentList = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const getPatients = async () => {
            let appointmentsArray = [];
            const user = auth.currentUser;

            setPageLoading(true);

            const q = query(
                collection(db, "users", "doctors", user.uid, "public", "appointments"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                appointmentsArray.push(data);
            });

            if (appointmentsArray.length > 0) {
                dispatch(addAppointments(appointmentsArray));
                setPageLoading(false);
            } else {
                dispatch(addAppointments([]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch])


    const appointments = useSelector(selectAppointments);
    const filteredAppointments = useSelector(selectFilteredAppointments);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedPatients = appointments.filter((appointment) => {
                return appointment?.patient?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredAppointments(searchedPatients));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredAppointments([]));
            setFilters(false);
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredAppointments([]));
            setFilters(false);
            setSearchText(value);
        }
    };



    const sortedAppointments = appointments
    .slice()
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
    .map((appointment, index) => ({ ...appointment, key: index + 1 }));


    const sortedFilteredAppointments = filteredAppointments
    .slice()
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
    .map((appointment, index) => ({ ...appointment, key: index + 1 }));



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
                            dataSource={sortedFilteredAppointments}
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
                            dataSource={sortedAppointments}
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

export default AppointmentList