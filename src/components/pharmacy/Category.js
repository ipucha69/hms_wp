import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Grid} from '@mui/material';
// import { Verified } from '@mui/icons-material';
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../App";

import CategoryList from "./categories/CategoryList";
import AddCategory from "./categories/AddCategory";



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

const Category = () => {

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
                    <Tab label="Medicine Category List" {...a11yProps(0)} />
                    <Tab label="Add Medicine Category" {...a11yProps(1)} />
                </Tabs>
              </Box>
                <TabPanel value={value} index={0}>
                  <CategoryList />
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <AddCategory />
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

export default Category;