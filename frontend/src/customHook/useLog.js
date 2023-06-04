"use client";

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

import { useSession, signOut } from "next-auth/react";

dayjs.extend(utc);
dayjs.extend(timezone);

function useLog(oldData, newData, whichStatus, deletedUsers) {
  const { data: session } = useSession();
  const user = session?.user.name;

  let nowDate = dayjs().tz("Europe/Istanbul").format("DD/MM/YYYY");
  let nowTime = dayjs().tz("Europe/Istanbul").format("HH:mm:ss");

  /**
   * log---------- Update Logs info using Update User Form
   * statusLog---- Update Logs using Active/Inactive Form
   * deleteLogs--- Delete Logs using Delete User Form
   */

  const [log, setLog] = useState([]);

  const statusLog = [
    `Status:${
      whichStatus ? whichStatus.newStatus : ""
    } has been updated to by ${user} at ${nowDate}-${nowTime}`,
  ];

  const deleteLogs = [];

  if (deletedUsers) {
    deletedUsers.id.map((id) => {
      const deletedUser = deletedUsers.rows.find((row) => row._id == id);
      deleteLogs.push({
        log: `${deletedUser?.name}[${deletedUser?.email}] has been deleted by ${user} at ${nowDate}-${nowTime}`,
      });
    });
  }

  useEffect(() => {
    if (oldData && newData) {
      if (
        oldData.email !== newData.email ||
        oldData.role !== newData.role ||
        oldData.firstname !== newData.firstname ||
        +oldData.phone !== newData.phone ||
        oldData.status !== newData.status ||
        oldData.lastname !== newData.lastname ||
        oldData.gender !== newData.gender
      ) {
        try {
          setLog([]);

          if (oldData.email !== newData.email) {
            setLog((prev) => [
              ...prev,
              `Email:${oldData.email} has been updated to Email:${newData.email} by ${user} at ${nowDate}-${nowTime}`,
            ]);
          }
          if (
            oldData.firstname !== newData.firstname ||
            oldData.lastname !== newData.lastname
          ) {
            setLog((prev) => [
              ...prev,
              `Name:${oldData.firstname} ${oldData.lastname} has been updated to Name:${newData.firstname} ${newData.lastname} by ${user} at ${nowDate}-${nowTime}`,
            ]);
          }
          if (oldData.phone !== +newData.phone) {
            setLog((prev) => [
              ...prev,
              `Phone:${
                oldData.phone
              } has been updated to Phone:${+newData.phone} by ${user} at ${nowDate}-${nowTime}`,
            ]);
          }
          if (oldData.role !== newData.role) {
            setLog((prev) => [
              ...prev,
              `Role:${oldData.role} has been updated to Role:${newData.role} by ${user} at ${nowDate}-${nowTime}`,
            ]);
          }
          if (oldData.gender !== newData.gender) {
            setLog((prev) => [
              ...prev,
              `Gender:${oldData.gender} has been updated to Gender:${newData.gender} by ${user} at ${nowDate}-${nowTime}`,
            ]);
          }
          if (oldData.status !== newData.status) {
            setLog((prev) => [
              ...prev,
              `Status:${oldData.status} has been updated to Status:${newData.status} by ${user} at ${nowDate}-${nowTime}`,
            ]);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    }
  }, [newData]);

  return { log, statusLog, deleteLogs };
}

export default useLog;
