"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ErrorIcon from "@mui/icons-material/Error";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useRouter } from "next/navigation";

import { useAppSelector, useAppDispatch } from ".././store/hook";
import { useRegisterUserMutation } from "../store/features/userApiSlice";

import validator from "validator";
import options from "../../../constant/constant";

import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        @hkyilmaz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const router = useRouter();
  const [registerUser, { isLoading, data }] = useRegisterUserMutation();

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
      firstname: data.firstname,
      lastname: data.lastname,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        toast.success("Successfuly Registered");
        router.push("/signin");
      })
      .catch((err) => {
        if (err.data.messageDetail) {
          if (err.data.messageDetail?.email)
            setError("email", {
              type: "custom",
              message: err.data.messageDetail?.email,
            });
        }
        toast.error("Opps, There is a Error...");
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        style={{ height: "100vh", width: "100vw", paddingTop: "75px" }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
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
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="text-blue-800 underline" href="/signin">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
