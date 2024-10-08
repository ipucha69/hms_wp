import * as React from "react";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import { colors } from "../assets/utils/colors";
import {
    Backdrop,
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
    PersonPin,
    PersonOff,
    Timeline,
    MeetingRoom,
    PrecisionManufacturingSharp,
    NotesOutlined,
    BedSharp,
    LocalHospitalOutlined,
    HomeOutlined,
    MessageOutlined,
    Bloodtype,
    ReportOff,
    MedicalInformation,
    Medication,
    MedicalServices
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../reducers/appSlice";

const drawerWidth = 237;

const SideNavListItem = styled(ListItem)(({ theme }) => ({
    paddingTop: 0,
    transition: "all ease-in-out 0.3s",
    "&::before": {
        content: '""',
        position: "absolute",
        height: 0,
        bottom: "50%",
        width: 4,
        transition: "all ease-in-out 0.3s",
        backgroundColor: colors.primary,
    },
    "&:hover": {
        backgroundColor: 'green',
    },
    "&.icon": {
        minWidth: 0,
        justifyContent: "center",
        color: colors.dark,
        opacity: 0.9,
        fontSize: 33,
    },
    "&.name": {
        color: colors.dark,
    },
}));

const SideBar = ({ handleDrawerToggle }) => {
    const [open] = React.useState(false);

    const profile = useSelector(selectUserProfile);


    const links = [
        {
            id: 1,
            name: "Dashboard",
            icon: <HomeOutlined className="icon" />,
            url: "/",
            tooltip: "Dashboard",
        },
        {
            id: 2,
            name: "Patients",
            icon: <PersonOff className="icon" />,
            url: "/patients",
            tooltip: "Patients",
        },
        {
            id: 3,
            name: "Schedule",
            icon: <Timeline className="icon" />,
            url: "/schedule",
            tooltip: "Schedule",
        },
        {
            id: 4,
            name: "Appointment",
            icon: <MeetingRoom className="icon" />,
            url: "/appointment",
            tooltip: "Appointment",
        },
        {
            id: 5,
            name: "Prescription",
            icon: <PrecisionManufacturingSharp className="icon" />,
            url: "/prescription",
            tooltip: "Prescription",
        },
        {
            id: 6,
            name: "Notice Board",
            icon: <NotesOutlined className="icon" />,
            url: "/notice-board",
            tooltip: "Notice Board",
        },
        {
            id: 7,
            name: "Bed",
            icon: <BedSharp className="icon" />,
            url: "/bed",
            tooltip: "Bed",
        },
        {
            id: 8,
            name: "Hospital Activities",
            icon: <LocalHospitalOutlined className="icon" />,
            url: "/hospital-activities",
            tooltip: "Hospital Activities",
        },
        {
            id: 9,
            name: "Messages",
            icon: <MessageOutlined className="icon" />,
            url: "/message",
            tooltip: "Messages",
        },
        {
            id: 10,
            name: "Users",
            icon: <PersonPin className="icon" />,
            url: "/users",
            tooltip: "Users",
        },
    ];

    const doctorLinks = [
        {
            id: 1,
            name: "Dashboard",
            icon: <HomeOutlined className="icon" />,
            url: "/",
            tooltip: "Dashboard",
        },
        {
            id: 2,
            name: "Patients",
            icon: <PersonOff className="icon" />,
            url: "/patients",
            tooltip: "Patients",
        },
        {
            id: 3,
            name: "Appointment",
            icon: <MeetingRoom className="icon" />,
            url: "/appointment",
            tooltip: "Appointment",
        },
        {
            id: 4,
            name: "Prescription",
            icon: <PrecisionManufacturingSharp className="icon" />,
            url: "/prescription",
            tooltip: "Prescription",
        },
        {
            id: 5,
            name: "Bed",
            icon: <BedSharp className="icon" />,
            url: "/bed",
            tooltip: "Bed",
        },
        {
            id: 6,
            name: "Blood Bank",
            icon: <Bloodtype className="icon" />,
            url: "/blood-bank",
            tooltip: "Blood Bank",
        },
        {
            id: 7,
            name: "Report",
            icon: <ReportOff className="icon" />,
            url: "/report",
            tooltip: "Report",
        }
    ];


    const nurseLinks = [
        {
            id: 1,
            name: "Dashboard",
            icon: <HomeOutlined className="icon" />,
            url: "/",
            tooltip: "Dashboard",
        },
        {
            id: 2,
            name: "Patients",
            icon: <PersonOff className="icon" />,
            url: "/patients",
            tooltip: "Patients",
        },
        {
            id: 3,
            name: "Bed",
            icon: <BedSharp className="icon" />,
            url: "/bed",
            tooltip: "Bed",
        },
        {
            id: 4,
            name: "Blood Bank",
            icon: <Bloodtype className="icon" />,
            url: "/blood-bank",
            tooltip: "Blood Bank",
        },
        {
            id: 5,
            name: "Report",
            icon: <ReportOff className="icon" />,
            url: "/report",
            tooltip: "Report",
        }
    ];


    const pharmacyLinks = [
        {
            id: 1,
            name: "Dashboard",
            icon: <HomeOutlined className="icon" />,
            url: "/",
            tooltip: "Dashboard",
        },
        {
            id: 2,
            name: "Category",
            icon: <MedicalInformation className="icon" />,
            url: "/medicine-category",
            tooltip: "medicine-category",
        },
        {
            id: 3,
            name: "Medicine",
            icon: <MedicalServices className="icon" />,
            url: "/manage-medicine",
            tooltip: "manage-medicine",
        },
        {
            id: 4,
            name: "Medication",
            icon: <Medication className="icon" />,
            url: "/medication",
            tooltip: "medication",
        },
    ];


    if (!profile) {
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


    if (profile?.role === "Admin") {
        return (
            <>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        display: { xs: "none", sm: "block" },
                        [`&.MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            whiteSpace: "nowrap",
                        },
                        [`&.MuiPaper-root`]: { backgroundColor: colors.default },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: "auto" }}>
                        <List>
                            {links.map((link) =>
                                <NavLink
                                    style={{ color: "inherit", textDecoration: "inherit" }}
                                    to={link.url}
                                    key={link.id}
                                >
                                    {({ isActive }) => (
                                    <SideNavListItem
                                        disablePadding
                                        sx={{
                                            display: "block",
                                            my: 2,
                                            bgcolor: isActive && {
                                                background: 'green',
                                            },
                                            "&:hover": !isActive && {
                                                transition: "all ease-in-out 0.3s",
                                                "&::before": {
                                                    transition: "all ease-in-out 0.3s",
                                                    height: "100%",
                                                    bottom: 0,
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>{link.icon}</ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </SideNavListItem>
                                    )}
                                </NavLink>
                            )}
                        </List>
                    </Box>
                </Drawer>
            </>
        );
    }

    if (profile?.role === "Doctor") {
        return (
            <>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        display: { xs: "none", sm: "block" },
                        [`&.MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            whiteSpace: "nowrap",
                        },
                        [`&.MuiPaper-root`]: { backgroundColor: colors.default },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: "auto" }}>
                        <List>
                            {doctorLinks.map((link) =>
                                <NavLink
                                    style={{ color: "inherit", textDecoration: "inherit" }}
                                    to={link.url}
                                    key={link.id}
                                >
                                    {({ isActive }) => (
                                    <SideNavListItem
                                        disablePadding
                                        sx={{
                                            display: "block",
                                            my: 2,
                                            bgcolor: isActive && {
                                                background: 'green',
                                            },
                                            "&:hover": !isActive && {
                                                transition: "all ease-in-out 0.3s",
                                                "&::before": {
                                                    transition: "all ease-in-out 0.3s",
                                                    height: "100%",
                                                    bottom: 0,
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>{link.icon}</ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </SideNavListItem>
                                    )}
                                </NavLink>
                            )}
                        </List>
                    </Box>
                </Drawer>
            </>
        );
    }

    if (profile?.role === "Nurse") {
        return (
            <>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        display: { xs: "none", sm: "block" },
                        [`&.MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            whiteSpace: "nowrap",
                        },
                        [`&.MuiPaper-root`]: { backgroundColor: colors.default },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: "auto" }}>
                        <List>
                            {nurseLinks.map((link) =>
                                <NavLink
                                    style={{ color: "inherit", textDecoration: "inherit" }}
                                    to={link.url}
                                    key={link.id}
                                >
                                    {({ isActive }) => (
                                    <SideNavListItem
                                        disablePadding
                                        sx={{
                                            display: "block",
                                            my: 2,
                                            bgcolor: isActive && {
                                                background: 'green',
                                            },
                                            "&:hover": !isActive && {
                                                transition: "all ease-in-out 0.3s",
                                                "&::before": {
                                                    transition: "all ease-in-out 0.3s",
                                                    height: "100%",
                                                    bottom: 0,
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>{link.icon}</ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </SideNavListItem>
                                    )}
                                </NavLink>
                            )}
                        </List>
                    </Box>
                </Drawer>
            </>
        );
    }

    if (profile?.role === "Pharmacist") {
        return (
            <>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        display: { xs: "none", sm: "block" },
                        [`&.MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            whiteSpace: "nowrap",
                        },
                        [`&.MuiPaper-root`]: { backgroundColor: colors.default },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: "auto" }}>
                        <List>
                            {pharmacyLinks.map((link) =>
                                <NavLink
                                    style={{ color: "inherit", textDecoration: "inherit" }}
                                    to={link.url}
                                    key={link.id}
                                >
                                    {({ isActive }) => (
                                    <SideNavListItem
                                        disablePadding
                                        sx={{
                                            display: "block",
                                            my: 2,
                                            bgcolor: isActive && {
                                                background: 'green',
                                            },
                                            "&:hover": !isActive && {
                                                transition: "all ease-in-out 0.3s",
                                                "&::before": {
                                                    transition: "all ease-in-out 0.3s",
                                                    height: "100%",
                                                    bottom: 0,
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>{link.icon}</ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </SideNavListItem>
                                    )}
                                </NavLink>
                            )}
                        </List>
                    </Box>
                </Drawer>
            </>
        );
    }
};

export default SideBar;
