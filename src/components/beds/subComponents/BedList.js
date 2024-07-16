import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import Description from "../../common/Description";
import AssignBed from "./AssignBed";

const columns = [
    {
        title: "#",
        dataIndex: "key",
        key: "key",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Bed Name",
        dataIndex: "name",
        key: "name",
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
        render: (_, manager) => (
        <p className="flex flex-row gap-1 justify-start">
            <Description data={manager} title={"Bed Descriptions"} />
        </p>
        ),
    }
];

const BedList = () => {
  const dispatch = useDispatch();

  const managers = [];

    return (
        <div className="">
            <div className="flex flex-row justify-end">
                <AssignBed />
            </div>
            <div className="pt-4">
                <Table
                    columns={columns}
                    dataSource={managers}
                    size="middle"
                    pagination={{ defaultPageSize: 10, size: "middle" }}
                />
            </div>
        </div>
    );
};

export default BedList;
