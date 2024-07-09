import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
const token = localStorage.getItem("token");
export const employeeAPI = createApi({
  reducerPath: "EmployeeManagement",
  tagTypes: ["EmployeeList"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      headers.append("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: () => `employees`,
      providesTags: (result) =>
        result
          ? result.data.map(({ id }) => ({ type: "employeeList", id }))
          : [{ type: "employeeList", id: " LIST " }],
    }),

    getEmployeeById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "EmployeeList", id }],
    }),

    addEmployee: builder.mutation({
      query: (employee) => ({
        url: "employees/create",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    updateEmployee: builder.mutation({
      query: ({ _id, ...patch }) => ({
        url: `employees/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    removeEmployee: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    changeEmployeeStatus: builder.mutation({
      query: (id) => ({
        url: `employees/change-status/${id}`,
        method: "PUT",
        // body: { Status: 0 },
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useRemoveEmployeeMutation,
  useChangeEmployeeStatusMutation,
  useGetEmployeeByIdQuery,
} = employeeAPI;
