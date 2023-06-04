import ErrorIcon from "@mui/icons-material/Error";

export default function ErrMessage({ message }) {
  return (
    <p className="flex text-xs items-center text-red-900 ml-1">
      <ErrorIcon
        sx={{
          marginRight: "3px",
          color: "#ff9999",
          fontSize: "17px",
        }}
      />
     <span className="translate-y-[0.10rem]">{message}</span> 
    </p>
  );
}
