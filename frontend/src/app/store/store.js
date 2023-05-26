import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { userApiSlice } from "./features/userApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
});

setupListeners(store.dispatch);
