import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Grid} from '@mui/material';
// import { Verified } from '@mui/icons-material';
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../App";

import AddReport from "./subComponents/AddReport";
import OtherReport from "./subComponents/OtherReport";
import DeathReport from "./subComponents/DeathReport";
import OperationReport from "./subComponents/OperationReport";
import BirthReport from "./subComponents/BirthReport";


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

const Report = () => {

    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        setPageLoading(true);
        setPageLoading(false);
        setPageLoading(false);
    }, [dispatch])


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const renderUserTabs = () => {
        return (
            <div>
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
                    <Tab label="Operation" {...a11yProps(0)} />
                    <Tab label="Birth" {...a11yProps(1)} />
                    <Tab label="Death" {...a11yProps(2)} />
                    <Tab label="Other" {...a11yProps(3)} />
                    <Tab label="Add Report" {...a11yProps(4)} />
                </Tabs>
              </Box>
                <TabPanel value={value} index={0}>
                  <OperationReport />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <BirthReport />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <DeathReport />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <OtherReport />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <AddReport />
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

export default Report;