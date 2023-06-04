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
    getSecurityLogs: builder.query({
      query: () => `logs`,
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
        method: "POST",
        body: user,
      }),
    }),
    usersUpdate: builder.mutation({
      query: (user) => ({
        url: "/updates",
        method: "POST",
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (user) => ({
        url: "/delete",
        method: "POST",
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
  useGetSecurityLogsQuery,
  useGetUserMutation,
  useUserUpdateMutation,
  useUsersUpdateMutation,
  useRegisterUserMutation,
} = userApiSlice;
