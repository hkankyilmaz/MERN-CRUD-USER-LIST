"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ErrorIcon from "@mui/icons-material/Error";

import { useRouter } from "next/navigation";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import mouse from "../../../assets/mouse.png";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useSession, signIn, getSession } from "next-auth/react";

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

export default function SignIn() {
  const router = useRouter();
  const ref = React.useRef();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const onSubmit = async (data) => {
    const { email, password } = data;
    let options = { redirect: false, email, password };

    try {
      const res = await signIn("credentials", options);
      if (res.error == "Incorrect password!") {
        setError("password", { type: "cutom", message: "Incorrect password!" });
        toast.error("Opps, There is a Error...");
      } else if (res.error == "You haven't registered yet!") {
        setError("email", {
          type: "custom",
          message: "You haven't registered yet!",
        });
        toast.error("Opps, There is a Error...");
      } else {
        toast.success("Succesfully Login...");
        router.push("/");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Opps, There is a Error...");
    }

    console.log(data);
  };

  React.useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "none", duration: 3 });
    let ctx = gsap.context(() => {
      let tl_ = gsap.timeline();

      tl_.from(".panel-3", { xPercent: 100 });
      tl_.from(".panel-4", { yPercent: 100 });

      ScrollTrigger.create({
        animation: tl_,
        trigger: ".container__",
        start: "top top",
        end: "=+2000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  /**
   * Below is some code repeating
   * Maybe below code appear some complicated.
   * You can create component called panel and pass the text to component as a prop.
   * thanks to component below code appear clean.
   * I dont do that now.I think its not nessessary for this app.
   */

  return (
    <main ref={ref}>
      <section className="w-[100vw] h-[100vh] z-50">
        <div className="flex flex-col items-center gap-6 text-center px-4 py-12 lg:py-24">
          <h1 className="panel-one-title">
            <span className="panel-one-title-span  ">
              Malwation Recruiment Case
            </span>
          </h1>
          <h2 className="panel-one-subtitle">
            This App is authored for recruiment case by @hkyilmaz
          </h2>
          <p className="description">Scroling down please...</p>
          <Image src={mouse} width="200" alt="mouse" />
        </div>
      </section>
      <section className="relative w-[100vw] h-[100vh] overflow-hidden container__">
        <section className="bg-[#f0f2f5] panel-2">
          <div className="flex flex-col items-center gap-6 text-center px-4 py-12 lg:py-24">
            <h2 className="panel-two-title">
              This App includes Frontend and Backend Web Development.
            </h2>
            <p className="description">Scroling down please...</p>
            <Image src={mouse} width="200" alt="mouse" />
          </div>
        </section>
        <section className="bg-[#e0e4eb] panel-3">
          <div className="flex flex-col items-center gap-6 text-center px-4 py-12 lg:py-24">
            <h2 className="panel-three-title">Are you Ready to Start ?</h2>
            <p className="description">
              Scroling one last time to login to the app...
            </p>
            <Image src={mouse} width="200" alt="mouse" />
          </div>
        </section>
        <section className="panel-4">
          <ThemeProvider theme={defaultTheme}>
            <Container
              className="h-[100vh] w-[350px] pt-[75px] z-40"
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
                  Sign in
                </Typography>
                <Box
                  className="w-[350px]"
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      {/* <Link href="#" variant="body2">
                        Forgot password?
                      </Link> */}
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
        </section>
      </section>
    </main>
  );
}
