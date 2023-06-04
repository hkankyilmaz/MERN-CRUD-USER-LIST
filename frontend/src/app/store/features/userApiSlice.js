import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/user/users`,
    }),
    getSecurityLogs: builder.query({
      query: () => `/log/security-logs`,
    }),
    getUser: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
      }),
    }),
    userUpdate: builder.mutation({
      query: (user) => ({
        url: "/user/update",
        method: "POST",
        body: user,
      }),
    }),
    usersUpdate: builder.mutation({
      query: (user) => ({
        url: "/user/updates",
        method: "POST",
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (user) => ({
        url: "/user/delete",
        method: "POST",
        body: user,
      }),
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/user/register",
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
