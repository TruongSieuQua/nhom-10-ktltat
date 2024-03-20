// https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#injecting-endpoints

import {
  ChangePassword,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  UpdateProfile,
  User,
} from "models/auth.interface";
import { baseApi } from "services/baseApi";

const signUpUrl = "auth/register";
const login = "auth/login";
const logOut = "auth/logout";

const changePassword = "auth/change-password";
const updateProfileUrl = "user/";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignInResponse, SignUpRequest>({
      query: (body) => ({
        url: signUpUrl,
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: login,
        method: "POST",
        body,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: logOut,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation<User, UpdateProfile>({
      query: ({ ...patch }) => ({
        url: updateProfileUrl,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Profile"],
      transformErrorResponse: (response: any) => {
        return response.data;
      },
    }),
    changePassword: builder.mutation<User, ChangePassword>({
      query: (body) => ({
        url: changePassword,
        method: "POST",
        body,
      }),
      transformErrorResponse: (response: any) => {
        return response.data;
      },
    }),
    getUserProfile: builder.query<User, any>({
      query: (userid) => ({
        url: updateProfileUrl + userid,
      }),
      providesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useUpdateProfileMutation,

  useLogOutMutation,
  useChangePasswordMutation,
  useGetUserProfileQuery,
} = authApi;
