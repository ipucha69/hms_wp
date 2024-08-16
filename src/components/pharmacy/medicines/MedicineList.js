import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../App";
import { collection, getDocs, query } from "firebase/firestore";

import { Space, Input, Table} from "antd";

import { addFilteredMedicine, addMedicine, selectFilteredMedicine, selectMedicine } from "../../../reducers/pharmacySlice";

const { Search } = Input;

const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Medicine Name",
            dataIndex: "medicineName",
            key: "medicineName",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Manufacturing",
            dataIndex: "manufacturingCompany",
            key: "manufacturingCompany",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => <p>{text}</p>,
        },
    ]

const MedicineList = () => {

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
                collection(db, "medicinesBucket"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                itemsArray.push(data);
            });

            if (itemsArray.length > 0) {
                dispatch(addMedicine(itemsArray));
                setPageLoading(false);
            } else {
                dispatch(addMedicine([]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch])


    const medicines = useSelector(selectMedicine);
    const filteredMedicines = useSelector(selectFilteredMedicine);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedItems = medicines.filter((item) => {
                return item?.medicineName?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredMedicine(searchedItems));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredMedicine([]));
            setFilters(false);
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredMedicine([]));
            setFilters(false);
            setSearchText(value);
        }
    };



    const sortedItems = medicines
    .slice()
    .sort((a, b) => (b.medicineName) - a.medicineName)
    .map((item, index) => ({ ...item, key: index + 1 }));


    const sortedFilteredItems = filteredMedicines
    .slice()
    .sort((a, b) => (b.medicineName) - a.medicineName)
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
                            placeholder="Search Medicine"
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

export default MedicineList