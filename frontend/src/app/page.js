"use client";

import { useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import GroupIcon from "@mui/icons-material/Group";
import TaskIcon from "@mui/icons-material/Task";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import PersonIcon from "@mui/icons-material/Person";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import LogoutIcon from "@mui/icons-material/Logout";
import UpgradeIcon from "@mui/icons-material/Upgrade";

import { useGetUsersQuery } from "./store/features/userApiSlice";

import { useSession, signOut, getSession } from "next-auth/react";

import Dialog from "@mui/material/Dialog";

import * as Forms from "../../Components/Forms";

import {
  DataGridPremium,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid-premium";

const actions = [
  { icon: <LogoutIcon />, name: "Log Out" },
  { icon: <UpgradeIcon />, name: "Upgrade Info" },
];

const drawerWidth = 240;

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const [selection, setselection] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [whichForm, setWhichForm] = React.useState();

  const { isFetching, isLoading, refetch, data } = useGetUsersQuery();
  console.log(data);

  const { data: session } = useSession();
  console.log(session);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport
        csvOptions={{
          fileName: "MalwaLogExport_",
        }}
      />
      <GridToolbarDensitySelector />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );

  const [cols] = useState({
    columns: [
      {
        field: "idx",
        headerName: "S.N.",
        width: 50,
        editable: false,
      },
      {
        field: "name",
        headerName: "Name",
        width: 125,
        editable: false,
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        editable: false,
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 225,
        editable: false,
      },
      {
        field: "role",
        headerName: "Role",
        width: 125,
        editable: false,
      },
      {
        field: "active",
        headerName: "Active",
        width: 125,
        editable: false,
      },
    ],
  });

  const drawer = (
    <div>
      <Toolbar className="logo">MALWATİON</Toolbar>
      <Divider />
      <List>
        {["Users", "Tasks", "Mail", "Others"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text == "Users" ? (
                  <GroupIcon />
                ) : text == "Tasks" ? (
                  <TaskIcon />
                ) : text == "Mail" ? (
                  <MailIcon />
                ) : (
                  <CalendarViewMonthIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Tasks", "Mail", "Others"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          height: "100%",
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <SpeedDial
          className="translate-x-[-50%]"
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, left: "50%" }}
          icon={<PersonIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
      <div className="h-full relative bg-[#F0F2F5]">
        <span className="absolute top-6 text-slate-400/80 left-[50%] translate-x-[-50%]">
          @hkyilmaz
        </span>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <main className="h-[100vh]">
      <Box className="h-[85vh]" sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar className="bg-[#f0f2f5] relative">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className="text-transparent bg-clip-text bg-gradient-to-r from-black to-cyan-700 font-bold"
              variant="h6"
              noWrap
              component="div"
            >
              Users
            </Typography>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-black to-cyan-700 font-bold absolute flex right-3">
              <span className="capitalize flex mr-5">
                {session ? `Welcome, ${session.user.name.split(" ")[0]} !` : ""}
              </span>
            </div>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          className="h-full"
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <div className="mt-2 mb-3  flex justify-end">
            <button
              onClick={() => {
                setWhichForm("Active");
                setOpen(true);
              }}
              className="btn bg-green-500/75 hover:bg-green-500"
            >
              <CheckIcon className="text-white" />
            </button>
            <button
              onClick={() => {
                setWhichForm("DeActive");
                setOpen(true);
              }}
              className="btn bg-orange-400/75 hover:bg-orange-400"
            >
              <ClearIcon className="text-white" />
            </button>
            <button
              onClick={() => {
                setWhichForm("Update");
                setOpen(true);
              }}
              className="btn bg-blue-600/75 hover:bg-blue-600"
            >
              <EditIcon className="text-white" />
            </button>
            <button
              onClick={() => {
                setWhichForm("Delete");
                setOpen(true);
              }}
              className="btn bg-red-700/75 hover:bg-red-700"
            >
              <DeleteForeverIcon className="text-white" />
            </button>
          </div>
          <DataGridPremium
            className="h-full"
            getDetailPanelContent={({ row }) => (
              <div className="master-container">
                <p className="font-bold">hello master info</p>
              </div>
            )}
            getDetailPanelHeight={({ row }) => 300} // Optional, default is 500px
            {...cols}
            {...{ rows: data ? [...data.users] : [] }}
            getRowId={(row) => row._id}
            checkboxSelection
            components={{
              Toolbar: CustomToolbar,
            }}
            onRowSelectionModelChange={(newSelection) => {
              console.log(newSelection);
              setselection(newSelection);
            }}
            selectionModel={selection}
          />
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        {whichForm == "Active" ? (
          <Forms.ActiveDialog />
        ) : whichForm == "DeActive" ? (
          <Forms.DeActiveDialog />
        ) : whichForm == "Update" ? (
          <Forms.updateDialog />
        ) : whichForm == "Delete" ? (
          <Forms.deleteDialog />
        ) : (
          <p>Opss, There is a Problem !!!!</p>
        )}
      </Dialog>
    </main>
  );
}
