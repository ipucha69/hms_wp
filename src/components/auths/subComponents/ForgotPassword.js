import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
// import firebase from 'firebase';

const ForgotPassword = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        form.resetFields();
        setVisible(false);
    };

    const handleForgotPassword = async () => {
        try {
            const { email } = await form.validateFields();
            console.log(email)
            // setLoading(true);

            // await firebase.auth().sendPasswordResetEmail(email);

            message.success('Password reset email sent. Please check your inbox.');

            // setLoading(false);
            // hideModal();
        } catch (error) {
            setLoading(false);
            message.error('Failed to send password reset email. Please try again.');
        }
    };

    return (
        <div>
            <p onClick={showModal} style={{ cursor: "pointer", width: '100%'}}>
                <span style={{ fontFamily: "ramblaBold", color: "#000", fontSize: "14px" }}>Forgot Password</span>
            </p>
            <Modal
                title="Forgot Password"
                open={visible}
                onCancel={hideModal}
                footer={[
                    <Button key="cancel" onClick={hideModal} className={"regular"}>
                        Cancel
                    </Button>,
                    <Button key="submit" loading={loading} onClick={handleForgotPassword} className={"regular"}>
                        <span>Reset Password</span>
                    </Button>
                ]}
            >
                {/* <p style={{fontFamily: 'ramblaBold', color: '#000', fontSize: '16px'}}>Forgot Password</p> */}
                
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                        fieldContext={form}
                    >
                        <Input placeholder="Enter your email" className={"regular"} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ForgotPassword;