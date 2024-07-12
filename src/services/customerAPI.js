import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

// Define a service using a base URL and expected endpoints
export const customerAPI = createApi({
  reducerPath: "customerManagement",
  tagTypes: ["CustomerList", "CustomerDetail"],
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
      query: () => `customers`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "CustomerList",
                id,
              })),
              { type: "CustomerList", id: "LIST" },
            ]
          : [{ type: "CustomerList", id: "LIST" }],
    }),
    getCustomerById: builder.query({
      query: (id) => `customers/${id}`,
      providesTags: (result, error, id) => [{ type: "CustomerDetail", id }],
    }),
    createCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: `customers/add`,
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: [{ type: "CustomerList", id: "LIST" }],
    }),
    updateCustomer: builder.mutation({
      query: (customer) => ({
        url: `customers/` + customer._id,
        method: "PUT",
        body: customer,
      }),
      invalidatesTags: (result, _error, { customerId }) => [
        { type: "CustomerDetail", id: customerId },
        { type: "CustomerList", id: "LIST" },
      ],
    }),
    deleteCustomer: builder.mutation({
      query: (customerId) => ({
        url: `customers/` + customerId,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CustomerList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerAPI;
