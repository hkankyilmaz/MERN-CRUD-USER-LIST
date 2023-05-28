"use client";

import "./globals.css";
import "../../dist/output.css";

import { SessionProvider } from "next-auth/react";

import { Providers } from "./store/Provider";

import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head />
        <body>
          {" "}
          <SessionProvider>{children}</SessionProvider>
          <ToastContainer
            hideProgressBar={true}
            autoClose={3000}
            position="top-center"
          />
        </body>
      </Providers>
    </html>
  );
}
