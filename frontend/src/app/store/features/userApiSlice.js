import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users`,
    }),
    getUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    userUpdate: builder.mutation({
      query: (user) => ({
        url: "/update",
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (user) => ({
        url: "/delete",
        method: "DELETE",
        body: user,
      }),
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetUsersQuery,
  useGetUserMutation,
  useUserUpdateMutation,
  useRegisterUserMutation,
} = userApiSlice;
