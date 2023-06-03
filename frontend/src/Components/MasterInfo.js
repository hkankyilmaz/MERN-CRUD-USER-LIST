import React from "react";

function MasterInfo({ row }) {
  return (
    <div className="w-full h-full master-container flex flex-col justify-start">
      {row.log.length > 0 ? (
        row.log.map((item, idx) => (
          <p className="font-bold text-slate-400 mb-1">
            {idx + 1}. {item}
          </p>
        ))
      ) : (
        <p className="font-bold text-slate-400">
          There is no Update Log List...
        </p>
      )}
      <br />
    </div>
  );
}

export default MasterInfo;
