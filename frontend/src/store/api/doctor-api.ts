import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/doctors`,
  credentials: "include",
});

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery,
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    registerDoctor: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Doctor"],
    }),
    getDoctorAppointments: builder.query({
      query: () => "/",
      providesTags: ["Doctor"],
    }),
    getDoctorAvailability: builder.query({
      query: (doctorId) => `/${doctorId}`,
      providesTags: ["Doctor"],
    }),
  }),
});

export const {
  useRegisterDoctorMutation,
  useGetDoctorAppointmentsQuery,
  useGetDoctorAvailabilityQuery,
} = doctorApi;