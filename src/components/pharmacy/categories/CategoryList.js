import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../App";
import { collection, getDocs, query } from "firebase/firestore";

import { Space, Input, Table} from "antd";

import { addCategory, addFilteredCategory, selectCategory, selectFilteredCategory } from "../../../reducers/pharmacySlice";

const { Search } = Input;

const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
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
        }
    ]

const CategoryList = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [filters, setFilters] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const getPatients = async () => {
            let categoryArray = [];
            // const user = auth.currentUser;

            setPageLoading(true);

            const q = query(
                collection(db, "medicinesCategories"),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //set data
                const data = doc.data();
                categoryArray.push(data);
            });

            if (categoryArray.length > 0) {
                dispatch(addCategory(categoryArray));
                setPageLoading(false);
            } else {
                dispatch(addCategory([]));
                setPageLoading(false);
            }
        };

        getPatients();
    }, [dispatch])


    const category = useSelector(selectCategory);
    const filteredCategory = useSelector(selectFilteredCategory);


    const handleOnSearchChange = () => {
        if (searchText) {
            const text = searchText.toLocaleLowerCase();
            const searchedItems = category.filter((item) => {
                return item?.category?.toLocaleLowerCase()?.includes(text);
            });
    
            // Update state with filtered patients
            dispatch(addFilteredCategory(searchedItems));
            setFilters(true);
        } else {
            // Update state with filtered patients
            dispatch(addFilteredCategory([]));
            setFilters(false);
        }
    };


    const handleSearchText = (value) => {
        if (value) {
            setSearchText(value);
        } else {
            // Update state with filtered customers
            dispatch(addFilteredCategory([]));
            setFilters(false);
            setSearchText(value);
        }
    };



    const sortedItems = category
    .slice()
    .sort((a, b) => (b.category) - a.category)
    .map((item, index) => ({ ...item, key: index + 1 }));


    const sortedFilteredItems = filteredCategory
    .slice()
    .sort((a, b) => (b.category) - a.category)
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
                            placeholder="Search Category"
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

export default CategoryList