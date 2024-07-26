import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import { Modal } from "antd";

const Description = ({ data, title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <IconButton variant="outlined" onClick={showModal}>
            <RemoveRedEye className="text-[#0A365C] cursor-pointer" />
        </IconButton>

        <Modal
            title={`${title}`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            zIndex={800}
            okType="default"
            cancelButtonProps={{
            className: "hidden",
            }}
        >
            <div className="flex flex-col">
                <p>
                    Description :{" "}
                    {data?.description ? <span>{data?.description}</span> : null}
                </p>
                <br />
            </div>
        </Modal>
        </>
    );
};

export default Description;
