import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Tooltip, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { UserIcon } from 'hugeicons-react';

import ForgotPassword from './subComponents/ForgotPassword';

const Login = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading); // Adjust according to your Redux state structure

    const validatePassword = (_, value) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
        if (!value) {
            return Promise.reject(new Error('Please input your password'));
        } else if (!passwordRegex.test(value)) {
            return Promise.reject(new Error('Password must have at least 6 characters, one uppercase letter, and one special character.'));
        }
        return Promise.resolve();
    };

    const handleSubmit = async (values) => {
        const { email, password } = values;
        if (email && password) {
            try {

            } catch (error) {
                console.log(error);
                message.warning({
                    content: `${error}`,
                    duration: 3,
                }).then(() => null);
            }
        } else {
            message.warning('Fill all required fields').then(() => null);
        }
    };

    return (
        <div className={"signin-container"}>
            <Form
                name="login"
                onFinish={handleSubmit}
                className="signin-form"
                scrollToFirstError
            >
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5px'}}>
                    <h4 style={{color: '#000', fontFamily: 'ramblaBold', fontSize: '25px'}}>HMS</h4>
                </div>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5px'}}>
                    <UserIcon size={50}/>
                </div>

                <Form.Item>
                    <p style={{fontFamily: 'ramblaRegular', fontSize: '18px'}}>Please login</p>
                </Form.Item>
                
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="E-mail" className={"regular"}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        { validator: validatePassword }
                    ]}
                >
                    <Input.Password placeholder="Password" className={"regular"}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: 'green', width: '100%'}}>
                        Log In
                    </Button>
                </Form.Item>

                <div><ForgotPassword/></div>

                <div style={{borderBottom: '1px solid #ccc', borderBottomWidth: '1px', borderBottomColor: 'green'}}></div>

            </Form>
        </div>
    );
};

export default Login;
