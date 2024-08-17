import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Login from "./pages/auth/Login";
import AppRoutes from "./routes/App.routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { primaryTheme } from "./assets/utils/themes";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { addUserProfile, changeUser, selectUser } from "./reducers/appSlice";

//initiaizing firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        //check user state
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const getDetails = async () => {
                    const docRef = doc(db, "userBucket", user.uid);
                    const docSnap = await getDoc(docRef);
                
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        dispatch(addUserProfile(data));
                    } else {
                        // docSnap.data() will be undefined in this case
                        console.log("No such document!");
                        dispatch(addUserProfile({}));
                    }
                };
                getDetails();
                dispatch(changeUser(true));

            } else {
                dispatch(addUserProfile({}));
                dispatch(changeUser(false));
                console.log('There is no user so far');
            }
        });
    });

    const user = useSelector(selectUser);

    const renderComponent = () => {
        switch (user) {
            case true:
                return (
                    <React.Fragment>
                        <ThemeProvider theme={primaryTheme}>
                            <CssBaseline />
                            <AppRoutes />
                        </ThemeProvider>
                    </React.Fragment>
                );
            case false:
                return (
                    <React.Fragment>
                        <ThemeProvider theme={primaryTheme}>
                            <CssBaseline />
                            <Login />
                        </ThemeProvider>
                    </React.Fragment>
                );
            default:
                return (
                    <div>
                        <Backdrop
                            sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </div>
                );
        }
    };
  
  
    return (
        <div>
            <>
            <Toaster />
            </>
            {renderComponent()}
        </div>
    );
}

export default App