import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/appointments`,
  credentials: "include",
});

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery,
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Appointment"],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Appointment"],
    }),
    getAppointments: builder.query({
      query: () => "/my-appointment",
      providesTags: ["Appointment"],
    }),
  }),
});

export const { useCreateAppointmentMutation, useUpdateAppointmentMutation,useGetAppointmentsQuery } =
  appointmentApi;
