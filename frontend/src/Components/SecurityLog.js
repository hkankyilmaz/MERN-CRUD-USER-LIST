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
        className="absolute right-7 top-2 bg-red-300 hover:bg-red-400 p-3 rounded-[50%]"
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
        <div className="mx-5 mt-5">
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
