import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

// Define a service using a base URL and expected endpoints
export const counterAPI = createApi({
  reducerPath: "counterManagement",
  tagTypes: ["CounterList"],
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
    getAllCounters: builder.query({
      query: () => `/Counter/GetAllCounters`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "counterManagement", id })),
              { type: "CounterList", id: "LIST" },
            ]
          : [{ type: "CounterList", id: "LIST" }],
    }),
    createCounter: builder.mutation({
      query: (newCounter) => ({
        url: `/Counter/AddNewCounter`,
        method: "POST",
        body: newCounter,
      }),
      invalidatesTags: [{ type: "CounterList", id: "LIST" }],
    }),
  }),
});

export const { useGetAllCountersQuery, useCreateCounterMutation } = counterAPI;
