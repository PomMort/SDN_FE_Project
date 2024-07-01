import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CUSTOMER_API } from "../config";

// Define a service using a base URL and expected endpoints
export const customerAPI = createApi({
  reducerPath: "customerManagement",
  tagTypes: ["CustomerList"],
  baseQuery: fetchBaseQuery({ baseUrl: CUSTOMER_API }),
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => `customers`,
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
        url: `customers`,
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: [{ type: "CustomerList", id: "LIST" }],
    }),
    updateCustomer: builder.mutation({
      query: (customer) => ({
        url: `customers/${customer.id}`,
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
