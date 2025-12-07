import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/admin`,
  credentials: "include",
});

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery,
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["Admin"],
    }),
    getAnalyticsData: builder.query({
      query: () => "/",
      providesTags: ["Admin"],
    }),
    getPendingData: builder.query({
      query: () => "/doctor/pending",
      providesTags: ["Admin"],
    }),
    addDoctor: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    approveDoctor: builder.mutation({
      query: ({ id }) => ({
        url: `/doctor/approve/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Admin"],
    }),
    rejectDoctor: builder.mutation({
      query: ({ id }) => ({
        url: `/doctor/reject/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Admin"],
    }),
    toggleUserStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Admin"],
    }),
    toggleUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAnalyticsDataQuery,
  useGetPendingDataQuery,
  useAddDoctorMutation,
  useApproveDoctorMutation,
  useRejectDoctorMutation,
  useToggleUserStatusMutation,
  useToggleUserRoleMutation,
  useGetAllUsersQuery,
} = adminApi;
