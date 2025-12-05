import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/patients`,
  credentials: "include",
});

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery,
  tagTypes: ["Patient"],
  endpoints: (builder) => ({
    registerPatient: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Patient"],
    }),
    updatePatient: builder.mutation({
      query: (body) => ({
        url: "/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Patient"],
    }),
  
  }),
});

export const {
  useRegisterPatientMutation,
  useUpdatePatientMutation,

} = patientApi;
