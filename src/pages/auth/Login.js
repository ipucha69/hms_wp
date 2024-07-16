import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth();

    const signInUser = () => {
        if (!email || !password) {
            toast.error("Please fill in all required fields.");
        } else {

            setLoading(true);

            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success("Logged in");
                setLoading(false);
                navigate(`/`);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                toast.error("Failed to log in");
            });
        }
    };

    const renderButton = () => {
        if (loading) {
            return (
            <button
                type="button"
                className="bg-[#0A365C]  opacity-25 cursor-not-allowed w-full px-8 py-3 font-semibold rounded-md text-white"
            >
                Loading...
            </button>
            );
        } else {
            return (
            <button
                type="button"
                onClick={() => signInUser()}
                className="bg-[#0A365C] hover:bg-[#54728D] w-full h-14 px-8 py-3 rounded-md text-white"
            >
                Sign in
            </button>
            );
        }
    };

    return (
        <div className="w-screen h-screen bg-[#121213] flex justify-center items-center">
            <div className="w-[30%] h-[80%] rounded-lg bg-white flex flex-col">
                <div className="flex-grow p-6 sm:p-10">
                    <div className="text-center">
                        <h1 className="my-3 text-4xl font-bold">HMS</h1>
                        <AccountCircle sx={{ fontSize: '100px' }}/>
                        <p className="text-sm dark:text-gray-400">
                            Please sign in to access your account
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <div>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Username"
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    autoFocus
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className="cursor-pointer text-[#0A365C] text-right hover:underline text-sm">Forgot Password?</p>
                            </div>
                        </div>
                        <div className="">
                            <div>{renderButton()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );    
};

export default Login;
