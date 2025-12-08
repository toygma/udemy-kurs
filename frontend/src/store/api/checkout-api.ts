import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/payment`,
  credentials: "include",
});

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery,
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    createCheckout: builder.mutation({
      query: ({ doctorId, appointmentId }) => {
        return {
          url: `/checkout-session/${doctorId}/${appointmentId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Checkout"],
    }),
  }),
});

export const { useCreateCheckoutMutation } = checkoutApi;
