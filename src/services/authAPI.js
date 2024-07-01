import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const authApi = createApi({
  reducerPath: "authManagement",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: `users/login`,
        method: "POST",
        body: { email, password },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ id, password, retypePassword }) => ({
        url: `users/update_password/${id}`,
        method: "PUT",
        body: { password: password, retypePassword: retypePassword },
      }),
    }),
    // verifyOtp: builder.mutation({
    //   query: ({ email, otpCode }) => {
    //     return {
    //       method: "POST",
    //       url: `forgotPassword/verifyOtp/${email}`,
    //       body: { otp: otpCode },
    //     };
    //   },
    // }),
    // verifyMail: builder.mutation({
    //   query: ({ email }) => {
    //     return {
    //       method: "POST",
    //       url: `forgotPassword/verifyMail/${email}`,
    //       // body: { password: newPassword, retypePassword: newPassword },
    //     };
    //   },
    // }),
    // changePasswordByEmail: builder.mutation({
    //   query: ({ email, newPassword }) => {
    //     return {
    //       method: "POST",
    //       url: `forgotPassword/changePassword/${email}`,
    //       body: { password: newPassword, retypePassword: newPassword },
    //     };
    //   },
    // }),
    // refreshToken: builder.mutation({
    //   query: ({ refreshToken }) => ({
    //     url: `users/refresh-token`,
    //     method: "POST",
    //     body: { refreshToken: refreshToken }, // pass the refresh token in the body
    //   }),
    // }),
  }),
});

export const {
  useLoginUserMutation,
  useUpdatePasswordMutation,
  //   useChangePasswordByEmailMutation,
  //   useVerifyMailMutation,
  //   useVerifyOtpMutation,
  //   useRefreshTokenMutation,
} = authApi;
