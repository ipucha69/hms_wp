import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Grid, Chip, Divider} from '@mui/material';
// import { Verified } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../App";

import Consumables from "./visits/Consumables";
import Documents from "./visits/Documents";
import HealthDetails from "./visits/HealthDetails";
import LabTest from "./visits/LabTest";
import OtherCharges from "./visits/OtherCharges";
import Prescription from "./visits/prescription";
import PreviousHistory from "./visits/PreviousHistory";
import Procedures from "./visits/Procedures";

import { addPatientDetails, selectPatientDetails } from "../../../../reducers/patientSlice";
import moment from "moment";


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  
  const primary = "#0A365C";

const OPDPatient = () => {

    const [pageLoading, setPageLoading] = useState(false);
    const [value, setValue] = useState(0);

    const dispatch = useDispatch();
    const { patientID } = useParams();

    useEffect(() => {
        setPageLoading(true);
        const getPatientDetails = async () => {
          setPageLoading(true);
          const docRef = doc(db, "patientsBucket", patientID);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            const data = docSnap.data();
            dispatch(addPatientDetails(data));
            setPageLoading(false);
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            dispatch(addPatientDetails({}));
            setPageLoading(false);
          }
        };

        getPatientDetails();

    }, [dispatch, patientID])

    
    const patient = useSelector(selectPatientDetails);
    console.log('patient', patient);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const renderUserTabs = () => {
        return (
            <div>
              <div className="my-4">
                <Divider>
                  <Chip
                    label={`Patient ID: ${patient?.patientID}`}
                  />{" "}
                  <Chip
                    label={`Patient Name: ${patient?.firstName} ${patient?.lastName}`}
                  />{" "}
                  <Chip
                    label={`Created AT: ${moment(patient?.created_at.toDate()).format("YYYY-MM-DD HH:mm:ss")}`}
                  />{" "}
                  <Chip
                    label={`Gender: ${patient?.gender}`}
                  />{" "}
                  <Chip
                    label={`Age: ${patient?.age}`}
                  />{" "}
                  <Chip
                    label={`Doctor Name: ${patient?.doctorName ? patient?.doctorName : "-"}`}
                  />{" "}
                  <Chip
                    label={`Specialization: ${patient?.specialization ? patient?.specialization : "-"}`}
                  />{" "}
                  <Chip
                    label={`Blood Group: ${patient?.bloodGroup ? patient?.bloodGroup : "-"}`}
                  />{" "}
                </Divider>
              </div>

              <Box
                sx={{
                    width: "100%",
                    borderBottom: 1,
                    borderColor: "divider",
                }}
                className="flex flex-row justify-between"
                >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    textColor={`${primary}`}
                    indicatorColor="primary"
                    sx={{ color: "#0A365C" }}
                >
                    <Tab label="PREVIOUS HISTORY" {...a11yProps(0)} />
                    <Tab label="HEALTH DETAILS" {...a11yProps(1)} />
                    <Tab label="DOCUMENTS" {...a11yProps(2)} />
                    <Tab label="PRESCRIPTION" {...a11yProps(3)} />
                    <Tab label="LAB TEST" {...a11yProps(4)} />
                    <Tab label="PROCEDURES" {...a11yProps(5)} />
                    <Tab label="CONSUMABLES" {...a11yProps(6)} />
                    <Tab label="OTHER CHARGES" {...a11yProps(7)} />
                </Tabs>
              </Box>
                <TabPanel value={value} index={0}>
                  <PreviousHistory />
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <HealthDetails />
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <Documents />
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <Prescription />
                </TabPanel>
                
                <TabPanel value={value} index={4}>
                  <LabTest />
                </TabPanel>

                <TabPanel value={value} index={5}>
                  <Procedures />
                </TabPanel>

                <TabPanel value={value} index={6}>
                  <Consumables />
                </TabPanel>

                <TabPanel value={value} index={7}>
                  <OtherCharges />
                </TabPanel>
            </div>
        );
    };


    return (
        <Grid container sx={{ px: 2 }}>
          <Grid item sm={12}>
            <div className="relative">
              {pageLoading ? (
                <div className="py-4 w-full flex justify-center items-center overflow-hidden">
                  <div className="absolute bg-white bg-opacity-70 z-10 h-[300vh] w-full flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"></div>
                  </div>
                </div>
              ) : null}
            </div>
            {renderUserTabs()}
          </Grid>
        </Grid>
      );
}

export default OPDPatient