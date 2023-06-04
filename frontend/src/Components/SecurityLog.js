"use client";

import React, { useImperativeHandle, forwardRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useGetSecurityLogsQuery } from "../app/store/features/userApiSlice";

const SecurityLog = (props) => {
  const { isFetching, isLoading, isError, data, refetch } =
    useGetSecurityLogsQuery();

  return (
    <div className="sec-logwrapper">
      <button
        className="absolute right-7 top-5 bg-red-200 hover:bg-red-300 p-3 rounded-[50%]"
        onClick={() => {
          props.setOpenModal(false);
        }}
      >
        <CloseIcon sx={{ color: "white" }} />
      </button>
      <h2 className="sec-title">Security Log</h2>

      {isError ? 
        <p className="font-bold sm:text-lg">Opps, there is a problem....</p>
       : isFetching || isLoading ? 
        <p className="font-bold sm:text-lg">Loading...</p>
       : data ? 
        <div className="ml-5">
          {data.logs.map((item, idx) => (
            <p className="font-bold text-gray-500 mb-1">
              {idx + 1}. {item.log} <hr className="text-cyan-600" />
            </p>
          ))}
        </div>
       : 
        ""
      }
      <button
        className="refetch-btn"
        onClick={() => {refetch();}}>      
        re-Fetc Log List
      </button>
    </div>
  );
};

export default SecurityLog;
