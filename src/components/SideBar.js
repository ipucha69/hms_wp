import * as React from "react";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import { colors } from "../assets/utils/colors";
import {
    Box,
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
    MessageOutlined
} from "@mui/icons-material";

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
    const [submenuOpen, setSubmenuOpen] = React.useState(null);

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
            name: "Doctors",
            icon: <PersonPin className="icon" />,
            url: "/doctor",
            tooltip: "Doctor",
        },
        {
            id: 3,
            name: "Patients",
            icon: <PersonOff className="icon" />,
            url: "/patients",
            tooltip: "Patients",
        },
        {
            id: 4,
            name: "Schedule",
            icon: <Timeline className="icon" />,
            url: "/schedule",
            tooltip: "Schedule",
        },
        {
            id: 5,
            name: "Appointment",
            icon: <MeetingRoom className="icon" />,
            url: "/appointment",
            tooltip: "Appointment",
        },
        {
            id: 6,
            name: "Prescription",
            icon: <PrecisionManufacturingSharp className="icon" />,
            url: "/prescription",
            tooltip: "Prescription",
        },
        {
            id: 7,
            name: "Notice Board",
            icon: <NotesOutlined className="icon" />,
            url: "/notice-board",
            tooltip: "Notice Board",
        },
        {
            id: 8,
            name: "Bed",
            icon: <BedSharp className="icon" />,
            url: "/bed",
            tooltip: "Bed",
        },
        {
            id: 9,
            name: "Hospital Activities",
            icon: <LocalHospitalOutlined className="icon" />,
            url: "/hospital-activities",
            tooltip: "Hospital Activities",
        },
        {
            id: 10,
            name: "Messages",
            icon: <MessageOutlined className="icon" />,
            url: "/message",
            tooltip: "Messages",
        }
    ];

    const handleClick = (id) => {
        if (submenuOpen!== id) {
            setSubmenuOpen(id);
        } else {
            setSubmenuOpen(null);
        }
    };

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
                            link.children? (
                                <React.Fragment key={link.id}>
                                    <SideNavListItem onClick={() => handleClick(link.id)} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>{link.icon}</ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </SideNavListItem>
                                    {submenuOpen === link.id && (
                                        <List>
                                            {link.children.map(childLink => (
                                                <NavLink
                                                    style={{ color: "inherit", textDecoration: "inherit" }}
                                                    to={childLink.url}
                                                    key={childLink.id}
                                                >
                                                    {({ isActive }) => (
                                                        <SideNavListItem
                                                            disablePadding
                                                            sx={{
                                                                display: "block",
                                                                my: 2,
                                                                bgcolor: isActive? 'green' : undefined,
                                                                "&:hover": {
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
                                                                <ListItemIcon>{childLink.icon}</ListItemIcon>
                                                                <ListItemText primary={childLink.name} />
                                                            </ListItemButton>
                                                        </SideNavListItem>
                                                    )}
                                                </NavLink>
                                            ))}
                                        </List>
                                    )}
                                </React.Fragment>
                            ) : (
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
                            )
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default SideBar;
