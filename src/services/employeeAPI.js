import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

export const employeeAPI = createApi({
  reducerPath: "EmployeeManagement",
  tagTypes: ["EmployeeList"],
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
    getAllEmployee: builder.query({
      query: () => `employees`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "employeeList", id }))
          : [{ type: "employeeList", id: " LIST " }],
    }),

    getEmployeeById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "EmployeeList", id }],
    }),

    addEmployee: builder.mutation({
      query: (employee) => ({
        url: "/Employee/AddNewEmployee",
        method: "POST",
        body: {
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          roleId: employee.role,
          // counterId: employee.counter,
          counterId: 0,
          employeeStatus: 1,
          employeeGender: employee.gender,
        },
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    updateEmployee: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
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

    changeEmployeeStatusToActive: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "PUT",
        body: { Status: 0 },
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    changeEmployeeStatusToInactive: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "PUT",
        body: { Status: 1 },
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
    changeEmployeeStatusToDeleted: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "PUT",
        body: { Status: 3 },
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
  useChangeEmployeeStatusToActiveMutation,
  useChangeEmployeeStatusToInactiveMutation,
  useChangeEmployeeStatusToDeletedMutation,
  useGetEmployeeByIdQuery,
} = employeeAPI;
