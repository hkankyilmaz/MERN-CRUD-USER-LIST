import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

import validator from "validator";

const options = {
  //pasword check options --- for strong password
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 0,
  minSymbols: 1,
  pointsPerUnique: 0,
  pointsPerRepeat: 0,
  pointsForContainingLower: 0,
  pointsForContainingUpper: 0,
  pointsForContainingNumber: 0,
  pointsForContainingSymbol: 0,
};

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

  const editForm = React.useRef();
  console.log(props);
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
                ref={editForm}
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
                      defaultValue={
                        props.row[0].firtsname ? props.row[0].firstname : ""
                      }
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
                      defaultValue={
                        props.row[0].password ? props.row[0].password : ""
                      }
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "This is required field",
                        validate: {
                          isStrongPassword: (value) =>
                            validator.isStrongPassword(value, {
                              ...options,
                            }) ||
                            "Plase enter Strong Password ( You must use minimum 8 character, 1 uppercase character, 1 lowercase character, 1 Special character )",
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
                      defaultValue={
                        props.row[0].phone ? props.row[0].phone : ""
                      }
                      fullWidth
                      name="phone"
                      label="Phone"
                      type="tel"
                      id="phone"
                      {...register("phone", {
                        required: "This is required field",
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
                        {...register("gender", {
                          required: "This is required field",
                        })}
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
                    <FormControl className="mb-2" sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="Role"
                        defaultValue={props.row[0].role ? props.row.role : ""}
                        id="role"
                        label="role"
                        {...register("role", {
                          required: "This is required field",
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Super Admin">Super Admin</MenuItem>
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      errors={errors}
                      name="role"
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
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
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
                  <Button onClick={props.handleClose}>Cancel</Button>
                  <Button type="submit">Update</Button>
                </DialogActions>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </DialogContent>
    </>
  );
}