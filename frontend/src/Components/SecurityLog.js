import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useGetSecurityLogsQuery } from "../app/store/features/userApiSlice";

function SecurityLog({ setOpenModal }) {
  const { isFetching, isLoading, isError, data } =
    useGetSecurityLogsQuery();

  return (
    <div className="sec-logwrapper ">
      <button
        className="absolute right-7 top-5 bg-red-200 p-3 rounded-[50%]"
        onClick={() => {
          setOpenModal(false);
        }}
      >
        <CloseIcon sx={{ color: "white" }} />
      </button>
      <h2 className="sec-title">Security Log</h2>

      {isError ? 
        <p>Opps, there is a problem....</p>
       : isFetching || isLoading ? 
        <p>Loading...</p>
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
    </div>
  );
}

export default SecurityLog;
