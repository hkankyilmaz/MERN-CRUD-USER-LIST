import man from "../../assets/man3.png";
import women from "../../assets/women3.png";
import unknown from "../../assets/unknown.png";

import Image from "next/image";

export const columns = [
  {
    field: "id__",
    headerName: "S.N.",
    width: 50,
    editable: false,
  },
  {
    field: "imageAvatar",
    headerName: "Avatar",
    width: 100,
    editable: false,
    renderCell: (params) => (
      <Image
        width={50}
        height={50}
        alt="User"
        src={
          params.row.gender == "Male"
            ? man
            : params.row.gender == "Female"
            ? women
            : unknown
        }
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: false,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    editable: false,
  },
  {
    field: "role",
    headerName: "Role",
    width: 125,
    editable: false,
  },
  {
    field: "status",
    headerName: "Active",
    width: 125,
    editable: false,
    renderCell: (params) => (
      <div
        className={`w-[20px] h-[20px] ml-1 p-0 m-0 inline-block ${
          params.row.status == "Active" ? "bg-green-600" : "bg-red-700"
        } rounded-[50%]`}
      ></div>
    ),
  },
];
