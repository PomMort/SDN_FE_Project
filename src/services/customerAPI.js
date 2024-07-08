import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

// Define a service using a base URL and expected endpoints
export const customerAPI = createApi({
  reducerPath: "customerManagement",
  tagTypes: ["CustomerList"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()); // Retrieve token from Redux state using selectToken selector
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      headers.append("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => `Customer/GetAllCustomers`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "customerManagement", id })),
              { type: "CustomerList", id: "LIST" },
            ]
          : [{ type: "CustomerList", id: "LIST" }],
    }),
    createCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: `/Customer/AddCustomer`,
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: [{ type: "CustomerList", id: "LIST" }],
    }),
    updateCustomer: builder.mutation({
      query: (customer) => ({
        url: `/Customer/UpdateCustomer/?customerId=${customer.customerId}`,
        method: "PUT",
        body: customer,
      }),
      invalidatesTags: (result, _error, { customerId }) => [
        { type: "customerManagement", id: customerId },
        { type: "CustomerList", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} = customerAPI;
