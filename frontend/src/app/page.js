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
import SpeedDialAction from "@mui/material/SpeedDialAction";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import LogoutIcon from "@mui/icons-material/Logout";
import UpgradeIcon from "@mui/icons-material/Upgrade";

import { useGetUsersQuery } from "./store/features/userApiSlice";

import { useSession, signOut, getSession } from "next-auth/react";

import Dialog from "@mui/material/Dialog";

import man from "../../assets/man3.png";
import women from "../../assets/women3.png";
import unknown from "../../assets/unknown.png";

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
  { icon: <LogoutIcon onClick= {()=> signOut()} />, name: "Log Out" },
  { icon: <UpgradeIcon />, name: "Upgrade Info" },
];

const drawerWidth = 240;

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const [selection, setselection] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [whichForm, setWhichForm] = React.useState();

  const { isFetching, isLoading, refetch, data } = useGetUsersQuery();

  const { data: session } = useSession();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport csvOptions={{   fileName: "MalwaLogExport_",  }}/>
      <GridToolbarDensitySelector />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );

  const [cols] = useState({
    columns: [
      {
        field: "id__",
        headerName: "S.N.",
        width: 50,
        editable: false,
      },
      {
        field: "imageAvatar",
        headerName: "Avatar",
        width: 100,
        editable: false,
        renderCell: (params) => (
          <Image
            width={50}
            height={50}
            alt="User"
            src={
              params.row.gender == "Male"
                ? man
                : params.row.gender == "Female"
                ? women
                : unknown
            }
          />
        ),
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        editable: false,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        editable: false,
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 150,
        editable: false,
      },
      {
        field: "role",
        headerName: "Role",
        width: 125,
        editable: false,
      },
      {
        field: "status",
        headerName: "Status",
        width: 125,
        editable: false,
        renderCell: (params) => (
        <div className={`w-[20px] h-[20px] ml-1 p-0 m-0 inline-block ${params.row.status == "Active" ? "bg-green-600" :"bg-red-700" } rounded-[50%]`}></div> 
        ),
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
          icon={<PersonIcon sx={{ fontSize: "30px" }} />}
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
          sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }}} >
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
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }}}
        >
          <Toolbar />
          <div className="mt-2 mb-3  flex justify-end">
            <button
              disabled={selection.length !== 1 ? true : false}
              onClick={() => { setWhichForm("Active"); setOpen(true); }}           
              className="btn bg-green-500/75 hover:bg-green-500"
            >
              <CheckIcon className="text-white" />
            </button>
            <button
              disabled={selection.length !== 1 ? true : false}
              onClick={() => {  setWhichForm("DeActive"); setOpen(true);}}
              className="btn bg-orange-400/75 hover:bg-orange-400"
            >
              <ClearIcon className="text-white" />
            </button>
            <button
              disabled={selection.length !== 1 ? true : false}
              onClick={() => {  setWhichForm("Update"); setOpen(true); }}
              className="btn bg-blue-600/75 hover:bg-blue-600"
            >
              <EditIcon className="text-white" />
            </button>
            <button
              disabled={selection.length !== 1 ? true : false}
              onClick={() => { setWhichForm("Delete");setOpen(true);}}
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
            getDetailPanelHeight={({ row }) => 300} 
            {...cols}
            {...{ rows: data ? [...data.users].map((item, index) => ({ id__: index + 1,...item,  })) : []}}
            getRowId={(row) => row._id}
            checkboxSelection
            components={{Toolbar: CustomToolbar,}}            
            onRowSelectionModelChange={newSelection => setselection(newSelection) }
            selectionModel={selection}
          />
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        {whichForm == "Active" ? (
          <Forms.ActiveDialog id={selection[0]} handleClose={handleClose} refetch={refetch} />
        ) : whichForm == "DeActive" ? (
          <Forms.DeActiveDialog id={selection[0]} handleClose={handleClose} refetch={refetch} />
        ) : whichForm == "Update" ? (
          <Forms.updateDialog
            refetch={refetch}
            row={data.users.filter((item) => item._id == selection[0])}
            handleClose={handleClose}
          />
        ) : whichForm == "Delete" ? (
          <Forms.deleteDialog id={selection} handleClose={handleClose} refetch={refetch} />
        ) : (
          <p>Opss, There is a Problem !!!!</p>
        )}
      </Dialog>
      <Backdrop open={isFetching | isLoading} >
        <CircularProgress sx={{color:"white"}} />
      </Backdrop>
    </main>
  );
}
