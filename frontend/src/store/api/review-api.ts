import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/reviews`,
  credentials: "include",
});

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery,
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (doctorId) => `/${doctorId}`,
      providesTags: ["Reviews"],
    }),
    createReview: builder.mutation({
      query: ({ doctorId, body }) => ({
        url: `/${doctorId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, body }) => ({
        url: `/${reviewId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
