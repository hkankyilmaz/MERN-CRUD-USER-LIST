"use client";
import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

import useLog from "../customHook/useLog";

import ErrMessage from "./ErrMessage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

import { useSession, signOut } from "next-auth/react";

import validator from "validator";

import {
  useUserUpdateMutation,
  useDeleteUserMutation,
  useUsersUpdateMutation,
} from "../app/store/features/userApiSlice";

/**
 * There are 5 (five) component.
 * Maybe each component can be put in a different file.
 * If it is seem complicated.
 * I think it is not neccessary for this app.
 */

/*------------------------- Button Loading UI --------------------------*/

export function Icon() {
  return (
    <span>
      Loading...
      <FontAwesomeIcon
        spin
        style={{ color: "white", marginLeft: ".5rem" }}
        icon={faRotate}
        size="lg"
      />
    </span>
  );
}
/*-----------------------------------------------------------------------*/

/*---------------------- "Delete" Action User Form ----------------------*/

export function deleteDialog(props) {
  const { data: session, status, update } = useSession();
  const [deleteUser, { isLoading, isFetching, data }] = useDeleteUserMutation();

  const { deleteLogs } = useLog(null, null, null, {
    id: props.id,
    rows: props.rows,
  });

  const handleDelete = () => {
    deleteUser({ id: props.id, deleteLogs })
      .unwrap()
      .then((res) => {
        toast.success("Successfuly Deleted");
        props.handleClose();
        props.refetch();
        if (session?.user?.id == props.id) signOut();
      })
      .catch((err) => toast.error("Opps, There is a Problem..."));
  };
  return (
    <>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Selected User/Users will be Delete. Are you Sure ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="_btn" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button className="_btn" onClick={handleDelete}>
          {isLoading | isFetching ? <Icon /> : "Yes I'am Sure"}
        </Button>
      </DialogActions>
    </>
  );
}
/*-------------------------------------------------------------------------*/

/*---------------------- "DeActive" Action User Form ----------------------*/

export function DeActiveDialog(props) {
  const { data: session, status, update } = useSession();
  const [usersUpdate, { isLoading, isFetching, data }] =
    useUsersUpdateMutation();

  const { statusLog } = useLog(null, null, {
    newStatus: "DeActive",
  });

  const handleUpdates = () => {
    usersUpdate({ status: "DeActive", id: props.id, statusLog })
      .unwrap()
      .then(async (res) => {
        toast.success("Successfuly Updated");
        props.handleClose();
        props.refetch();

        const newSession = {
          ...session,
          user: { ...session?.user, status: "DeActive" },
        };
        if (props?.id?.includes(session.user.id)) await update(newSession);
      })
      .catch((err) => {
        toast.error("Opps, There is a Problem...");
      });
  };
  return (
    <>
      <DialogTitle>Update Statu</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Selected User/Users will be Inactive. Are you Sure ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="_btn" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button className="_btn" onClick={handleUpdates}>
          {isLoading | isFetching ? <Icon /> : "Yes I'am Sure"}
        </Button>
      </DialogActions>
    </>
  );
}

/*-------------------------------------------------------------------------*/

/*----------------------- "Active" Action User Form -----------------------*/

export function ActiveDialog(props) {
  const { data: session, status, update } = useSession();
  const [usersUpdate, { isLoading, isFetching, data }] =
    useUsersUpdateMutation();
  const { statusLog } = useLog(null, null, {
    newStatus: "Active",
  });

  const handleUpdates = () => {
    usersUpdate({ status: "Active", id: props.id, statusLog })
      .unwrap()
      .then(async (res) => {
        toast.success("Successfuly Updated");
        props.handleClose();
        props.refetch();
        const newSession = {
          ...session,
          user: { ...session?.user, status: "Active" },
        };
        if (props?.id?.includes(session.user.id)) await update(newSession);
      })
      .catch((err) => {
        toast.error("Opps, There is a Problem...");
        console.log(err);
      });
  };
  return (
    <>
      <DialogTitle>Update Statu</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Selected User/Users will be Active. Are you Sure ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="_btn" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button className="_btn" onClick={handleUpdates}>
          {isLoading | isFetching ? <Icon /> : "Yes I'am Sure"}
        </Button>
      </DialogActions>
    </>
  );
}

/*-------------------------------------------------------------------------*/

/*----------------------- "Update" Action User Form -----------------------*/

const defaultTheme = createTheme();

export function updateDialog(props) {
  const [updateUser, { isLoading, isFetching }] = useUserUpdateMutation();
  const { data: session, update } = useSession();
  const [newData, setNewData] = React.useState(props.row[0]);

  const editForm = React.useRef();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const values = watch(); // watching all forms to register to changes to log.
  const { isChange, log } = useLog(props.row[0], values);

  const onSubmit = async (data) => {
    setNewData(data);
    console.log(log);
    updateUser({
      ...data,
      name: `${data.firstname} ${data.lastname}`,
      _id: props.row[0]._id,
      log: log,
    })
      .unwrap()
      .then(async (res) => {
        toast.success("Successfuly Updated");
        props.handleClose();
        props.refetch();

        const newSession = {
          ...session,
          user: { ...session?.user, role: data.role, status: data.status },
        };
        if (props.row[0].id == session.user.id) await update(newSession);
      })
      .catch((err) => {
        if (err.data.error.code == 11000) {
          setError("email", {
            type: "custom",
            message: "This email have already registered..!",
          });
        }
        toast.error(err.data.message);
        console.log(err);
      });
  };

  return (
    <>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please Fill in the blanks that you want to the update..!
        </DialogContentText>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              className="max-sm:w-[300px]"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                ref={editForm}
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="mb-2"
                      autoComplete="given-name"
                      name="firstName"
                      defaultValue={
                        props.row[0].firstname ? props.row[0].firstname : ""
                      }
                      fullWidth
                      id="firstName"
                      label="First Name"
                      {...register("firstname", {
                        required: "This is required field",
                        minLength: {
                          value: 3,
                          message: "Minimum three character",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="firstname"
                      render={({ message }) => <ErrMessage message={message} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="mb-2"
                      defaultValue={
                        props.row[0].lastname ? props.row[0].lastname : ""
                      }
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      {...register("lastname", {
                        required: "This is required field",
                        minLength: {
                          value: 3,
                          message: "Minimum three character",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="lastname"
                      render={({ message }) => <ErrMessage message={message} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="mb-2"
                      defaultValue={
                        props.row[0].email ? props.row[0].email : ""
                      }
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      {...register("email", {
                        required: "This is required field",
                        pattern: {
                          value:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: "Please enter valid e-mail",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => <ErrMessage message={message} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="mb-2"
                      defaultValue={
                        props.row[0].phone ? props.row[0].phone : ""
                      }
                      fullWidth
                      name="phone"
                      label="Phone"
                      type="tel"
                      id="phone"
                      {...register("phone", {
                        validate: {
                          isMobilePhone: (value) =>
                            validator.isMobilePhone(value, "tr-TR") ||
                            "Plase enter Valid Phone Number ( example: 05515539872 )",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="phone"
                      render={({ message }) => <ErrMessage message={message} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className="mb-2" sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Gender
                      </InputLabel>
                      <Select
                        defaultValue={
                          props.row[0].gender ? props.row[0].gender : ""
                        }
                        labelId="demo-simple-select-helper-label"
                        id="gender"
                        label="Gender"
                        {...register("gender", {})}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      errors={errors}
                      name="gender"
                      render={({ message }) => <ErrMessage message={message} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className="mb-2" sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="Role"
                        defaultValue={
                          props.row[0].role ? props.row[0].role : ""
                        }
                        id="role"
                        label="role"
                        {...register("role", {
                          required: "This is required field",
                        })}
                      >
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Super Admin">Super Admin</MenuItem>
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      errors={errors}
                      name="role"
                      render={({ message }) => <ErrMessage message={message} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className="mb-2 w-full" sx={{ width: "100%" }}>
                      <InputLabel id="status">Statu</InputLabel>
                      <Select
                        defaultValue={
                          props.row[0].status ? props.row[0].status : ""
                        }
                        labelId="Status"
                        id="status"
                        label="Status"
                        {...register("status", {
                          required: "This is required field",
                        })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="DeActive">DeActive</MenuItem>
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      errors={errors}
                      name="status"
                      render={({ message }) => (
                        <p className="text-xs text-red-900 ml-1">
                          <ErrorIcon
                            sx={{
                              marginRight: "3px",
                              color: "#ff9999",
                              fontSize: "17px",
                            }}
                          />
                          {message}
                        </p>
                      )}
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button className="_btn" onClick={props.handleClose}>
                    Cancel
                  </Button>
                  <Button className="_btn" type="submit">
                    {isLoading | isFetching ? <Icon /> : "Update"}
                  </Button>
                </DialogActions>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </DialogContent>
    </>
  );
}
/*-------------------------------------------------------------------------*/
