import { User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (userData) => ({ //query -> func care intoarce un obiect
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),

    register: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    current: builder.query<User, void>({ //query deoarece noi nu modificam nimic
        query: () => ({
            url: './current',
            method: 'GET'
        })
    }),

    getUserById: builder.query<User, string>({
        query:(id) => ({
            url: `/users/${id}`,
            method: "GET"
        })
    }),

    updateUser: builder.mutation<User, {userData: FormData, id:string}>({
        query:({userData, id}) => ({
            url: `/users/${id}`,
            method: 'PUT',
            body: userData
        })
    })
  }),
});


export const {
    useRegisterMutation,
    useLoginMutation,
    useCurrentQuery,
    useLazyCurrentQuery,
    useLazyGetUserByIdQuery,
    useUpdateUserMutation
} = userApi

export const {
    endpoints: { login, register, current, getUserById, updateUser }
} = userApi