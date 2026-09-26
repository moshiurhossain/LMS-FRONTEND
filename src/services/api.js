import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// http://localhost:8080/api/v1/auth/login
export const lmsAuthapi = createApi({
    reducerPath :'lmsAuthapi',
    baseQuery : fetchBaseQuery({ baseUrl : 'http://localhost:8080/api/v1/auth', credentials: 'include'}),
   tagTypes:["User",],
    endpoints :(builder)=>({
            getUserApi :builder.query({
                 query:()=>({
                   url : '/getuser',
                   method:'GET',
                 }),
                 providesTags:['User'],
            }),
            // xxxxxxxx //
            /////Signup/////
            loginApi : builder.mutation({
                 query :(data)=>({
                    url:"/login",
                    method: "POST",
                    body:data,
                 }),
                 invalidatesTags:['User']
            }),
            // xxxxxxxx //
            /////Signup/////
            signupApi : builder.mutation({
                 query:(data)=>({
                    url:'/signup',
                    method: "POST",
                    body:data,
                   
                 })
            }),
            // xxxxxxxx //
            otpVerificationApi :builder.mutation({
               query:(data)=>({
                     url:'/verifyotp',
                    method: "POST",
                    body:data,
                   
               })
            })

    }),

})

export const {
       useOtpVerificationApiMutation,
       useLoginApiMutation,
       useSignupApiMutation,
       useGetUserApiQuery,
               } = lmsAuthapi