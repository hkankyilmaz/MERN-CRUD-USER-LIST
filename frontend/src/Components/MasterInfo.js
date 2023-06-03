import React from "react";

function MasterInfo({ row }) {
  return (
    <div className="w-full h-full master-container flex flex-col justify-start">
      {row.log.length > 0 ? (
        row.log.map((item, idx) => (
          <>
            {idx == 0 ? (
              <h3 className="font-bold text-slate-700 mb-1">User Update Log</h3>
            ) : (
              ""
            )}
            <p className="font-bold text-slate-400 mb-1">
              {idx + 1}. {item}
            </p>
          </>
        ))
      ) : (
        <p className="font-bold text-slate-700">
          There is no Update process for this User...
        </p>
      )}
      <br />
    </div>
  );
}

export default MasterInfo;
