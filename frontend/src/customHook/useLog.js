"use client";

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

import { useSession, signOut } from "next-auth/react";

dayjs.extend(utc);
dayjs.extend(timezone);

function useLog(oldData, newData, whichStatus) {
  const { data: session } = useSession();
  const user = session?.user.name;

  let nowDate = dayjs().tz("Europe/Istanbul").format("DD/MM/YYYY");
  let nowTime = dayjs().tz("Europe/Istanbul").format("HH:mm:ss");

  const [isChange, setIsChange] = useState(false);
  const [log, setLog] = useState([]);

  const statusLog = [
    `Status:${whichStatus.newStatus} has been updated to by ${user} at ${nowDate}-${nowTime}`,
  ];

  useEffect(() => {
    try {
      setLog([]);
      if (oldData.email !== newData.email) {
        setIsChange(true);
        setLog((prev) => [
          ...prev,
          `Email:${oldData.email} has been updated to Email:${newData.email} by ${user} at ${nowDate}-${nowTime}`,
        ]);
      }
      if (oldData.phone !== +newData.phone) {
        setIsChange(true);
        setLog((prev) => [
          ...prev,
          `Phone:${
            oldData.phone
          } has been updated to Phone:${+newData.phone} by ${user} at ${nowDate}-${nowTime}`,
        ]);
      }
      if (oldData.role !== newData.role) {
        setIsChange(true);
        setLog((prev) => [
          ...prev,
          `Role:${oldData.role} has been updated to Role:${newData.role} by ${user} at ${nowDate}-${nowTime}`,
        ]);
      }
      if (oldData.gender !== newData.gender) {
        setIsChange(true);
        setLog((prev) => [
          ...prev,
          `Gender:${oldData.gender} has been updated to Gender:${newData.gender} by ${user} at ${nowDate}-${nowTime}`,
        ]);
      }
      if (oldData.status !== newData.status) {
        setIsChange(true);
        setLog((prev) => [
          ...prev,
          `Status:${oldData.status} has been updated to Status:${newData.status} by ${user} at ${nowDate}-${nowTime}`,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [newData]);

  return { isChange, log, statusLog };
}

export default useLog;
