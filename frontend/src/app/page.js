"use client";

import { useState } from "react";
import { Inter } from "@next/font/google";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetUsersQuery } from "./store/features/userApiSlice";
import { useSelector, useDispatch } from "react-redux";

import { useSession, signOut } from "next-auth/react";

import MasterInfo from "../Components/MasterInfo";

import Dialog from "@mui/material/Dialog";

import * as Forms from "../Components/Forms";
import SecurityLog from "../Components/SecurityLog";
import Drawer_ from "../Components/Drawer";

import * as MuiStyles from "./muiStyles";
import { columns } from "./muiColumns";

import { DataGridPremium } from "@mui/x-data-grid-premium";
import CustomToolbar from "../Components/customToolbar";

const drawerWidth = 240;

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const [selection, setselection] = useState([]);
  const [open, setOpen] = useState(false);
  const [whichForm, setWhichForm] = useState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const currentUser = useSelector((state) => state.user);
  const { data: session, update } = useSession();
  const { window } = props;
  const { isFetching, isLoading, refetch, data } = useGetUsersQuery();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <main className="h-[100vh]">
      <Box className="h-[85vh]" sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={MuiStyles.Appbar}>
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
              className="hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-black to-cyan-700 font-bold"
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
            sx={MuiStyles.drawerOne}
          >
            <Drawer_ setWhichForm={setWhichForm} open={open} />
          </Drawer>
          <Drawer variant="permanent" sx={MuiStyles.drwaerTwo} open>
            <Drawer_ setWhichForm={setWhichForm} setOpen={setOpen} />
          </Drawer>
        </Box>
        <Box className="h-full" component="main" sx={MuiStyles.main_}>
          <Toolbar />
          <div className="mt-2 mb-3  flex justify-start sm:justify-end">
            {!isLoading ? (
              <>
                <button
                  className="btn bg-green-500/75 hover:bg-green-500"
                  disabled={selection.length < 1 ? true : false}
                  onClick={() => {
                    setWhichForm("Active");
                    setOpen(true);
                  }}
                >
                  <CheckIcon className="text-white" />
                </button>
                <button
                  className="btn bg-orange-400/75 hover:bg-orange-400"
                  disabled={selection.length < 1 ? true : false}
                  onClick={() => {
                    setWhichForm("DeActive");
                    setOpen(true);
                  }}
                >
                  <ClearIcon className="text-white" />
                </button>
                <button
                  className="btn bg-blue-600/75 hover:bg-blue-600"
                  disabled={selection.length !== 1 ? true : false}
                  onClick={() => {
                    setWhichForm("Update");
                    setOpen(true);
                  }}
                >
                  <EditIcon className="text-white" />
                </button>
                <button
                  className="btn bg-red-700/75 hover:bg-red-700"
                  disabled={selection.length < 1 ? true : false}
                  onClick={() => {
                    setWhichForm("Delete");
                    setOpen(true);
                  }}
                >
                  <DeleteForeverIcon className="text-white" />
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          {!isLoading ? (
            <DataGridPremium
              className="h-full"
              getDetailPanelContent={({ row }) => <MasterInfo row={row} />}
              getDetailPanelHeight={() => 150}
              columns={columns}
              {...{
                rows: data
                  ? [...data.users].map((item, index) => ({
                      id__: index + 1,
                      ...item,
                    }))
                  : [],
              }}
              getRowId={(row) => row._id}
              checkboxSelection
              components={{ Toolbar: CustomToolbar }}
              onRowSelectionModelChange={(newSelection) =>
                setselection(newSelection)
              }
              selectionModel={selection}
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        {whichForm == "Active" ? (
          <Forms.ActiveDialog
            id={selection}
            handleClose={handleClose}
            refetch={refetch}
          />
        ) : whichForm == "DeActive" ? (
          <Forms.DeActiveDialog
            id={selection}
            handleClose={handleClose}
            refetch={refetch}
          />
        ) : whichForm == "Update" ? (
          <Forms.updateDialog
            refetch={refetch}
            row={
              selection.length == 0
                ? data.users.filter((item) => item.email == session.user.email)
                : data.users.filter((item) => item._id == selection[0])
            }
            handleClose={handleClose}
          />
        ) : whichForm == "Delete" ? (
          <Forms.deleteDialog
            rows={data.users}
            id={selection}
            handleClose={handleClose}
            refetch={refetch}
          />
        ) : (
          <p>Opss, There is a Problem !!!!</p>
        )}
      </Dialog>
      <Backdrop open={isFetching | isLoading}>
        <CircularProgress sx={{ color: "white" }} />
      </Backdrop>
      <Modal open={openModal}>
        <SecurityLog handleClose={handleModalClose} />
      </Modal>
    </main>
  );
}
