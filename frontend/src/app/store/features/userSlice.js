import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname:"",
  lastname:"",
  name: "",
  email: "",
  gender:"",
  phone: "",
  role: "",
  status: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.status = action.payload.status;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
