import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function deleteDialog(props) {
  return (
    <>
      <DialogTitle>Delete Process</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Selected User will be Delete. Are you Sure ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Yes I'am Sure</Button>
      </DialogActions>
    </>
  );
}

export function DeActiveDialog(props) {
  return (
    <>
      <DialogTitle>DeActive Process</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Selected User will be Deactive. Are you Sure ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Yes I'am Sure</Button>
      </DialogActions>
    </>
  );
}

export function ActiveDialog(props) {
  return (
    <>
      <DialogTitle>Active Process</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Selected User will be Active. Are you Sure ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Yes I'am Sure</Button>
      </DialogActions>
    </>
  );
}

export function updateDialog() {
  return <div>Update</div>;
}
