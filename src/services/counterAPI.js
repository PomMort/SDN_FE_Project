import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CUSTOMER_API } from "../config";

// Define a service using a base URL and expected endpoints
export const counterAPI = createApi({
  reducerPath: "counterManagement",
  tagTypes: ["CounterList"],
  baseQuery: fetchBaseQuery({ baseUrl: CUSTOMER_API }),
  endpoints: (builder) => ({
    getAllCounters: builder.query({
      query: () => `counters`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "counterManagement", id })),
              { type: "CounterList", id: "LIST" },
            ]
          : [{ type: "CounterList", id: "LIST" }],
    }),
  }),
});

export const { useGetAllCountersQuery } = counterAPI;
