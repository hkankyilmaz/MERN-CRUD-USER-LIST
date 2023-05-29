import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ErrorIcon from "@mui/icons-material/Error";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

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

const defaultTheme = createTheme();

export function updateDialog(props) {
  //const [registerUser, { isLoading, data }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const onSubmit = async (data) => {
    console.log(data);
    registerUser({
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <DialogTitle>Update Process</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please Fill in the blanks that you want to the update..!
        </DialogContentText>
        <ThemeProvider theme={defaultTheme}>
          <Container style={{ width: "100vw" }} component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                className="w-[350px]"
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
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="mb-2"
                      required
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
                  <Grid item xs={12}>
                    <TextField
                      className="mb-2"
                      required
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
                  <Grid item xs={12}>
                    <TextField
                      className="mb-2"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "This is required field",
                        minLength: {
                          value: 6,
                          message: "You Password must have minimum 6 Character",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
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
                  <Grid item xs={12}>
                    <TextField
                      className="mb-2"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "This is required field",
                        minLength: {
                          value: 6,
                          message: "You Password must have minimum 6 Character",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
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
                  <Grid item xs={12}>
                    <TextField
                      className="mb-2"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "This is required field",
                        minLength: {
                          value: 6,
                          message: "You Password must have minimum 6 Character",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
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
                  <Grid item xs={12}>
                    <TextField
                      className="mb-2"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "This is required field",
                        minLength: {
                          value: 6,
                          message: "You Password must have minimum 6 Character",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
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
                  <Grid item xs={12}>
                    <TextField
                      className="mb-2"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "This is required field",
                        minLength: {
                          value: 6,
                          message: "You Password must have minimum 6 Character",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
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
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Update</Button>
      </DialogActions>
    </>
  );
}
