import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setisAuthenticated, setLoading } from "../features/user-slice";
import type { IPatient } from "../types/patient.types";
import type { IDoctor } from "../types/doctor.types";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/users`,
  credentials: "include",
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Login hatası:", error);
        }
      },
    }),
    getUser: builder.query({
      query: () => "/me",
      transformResponse: (response: { user: IPatient | IDoctor }) => response.user,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setisAuthenticated(true));
        } catch (error) {
          dispatch(setUser(null));
          dispatch(setisAuthenticated(false));
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUser(null));
          dispatch(setisAuthenticated(false));
          dispatch(userApi.util.resetApiState());
        } catch (error) {
          console.error("Logout hatası:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useLogoutMutation } = userApi;