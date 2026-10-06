import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// http://localhost:8080/api/v1/auth/login
export const lmsAuthapi = createApi({
    reducerPath :'lmsAuthapi',
    baseQuery : fetchBaseQuery({ baseUrl : 'http://localhost:8080/api/v1', credentials: 'include'}),
   tagTypes:["User",],
    endpoints :(builder)=>({
             // xxxxxxxx /////////////////////Auth-apis start/////////////////////////////// xxxxxxxx //
            /////get user/////
            getUserApi :builder.query({
                 query:()=>({
                   url :'/auth/getuser',
                   method:'GET',
                 }),
                 providesTags:['User','Course'],
            }),
            // xxxxxxxx //
            /////Signup/////
            loginApi : builder.mutation({
                 query :(data)=>({
                    url:"/auth/login",
                    method: "POST",
                    body:data,
                 }),
                 invalidatesTags:['User']
            }),
            // xxxxxxxx //
            /////Signup/////
            signupApi : builder.mutation({
                 query:(data)=>({
                    url:'/auth/signup',
                    method: "POST",
                    body:data,
                   
                 })
            }),
            // xxxxxxxx //
            otpVerificationApi:builder.mutation({
               query:(data)=>({
                     url:'/auth/verifyotp',
                    method: "POST",
                    body:data,
                   
               })
            }),
            // xxxxxxxx //
            /////Resent otp/////
            resentOtpApi: builder.mutation({
                query:(data)=>({
                    url:'/auth/resendotp',
                    method: "POST",
                    body:data,
                   
               })
            }),
            // xxxxxxxx //
            /////forgot password/////
            forgotPasswordApi: builder.mutation({
                    query:(data)=>({
                    url:'/auth/forgotpassword',
                    method: "POST",
                    body:data,
                    })
            }),
            // xxxxxxxx //
            /////forgot password/////
            resetPasswordApi: builder.mutation({
                    query:(data)=>({
                    url:'/auth/resetpassword',
                    method: "POST",
                    body:data,
                    })
            }),
            ////////////////////////////////////////////AUTH-APIS- ENDS////////////////////////////////////////////
            ////////////////////////////////////////////COURSE-APIS- STARTS////////////////////////////////////////////
            ////Createcourse-api///////
            createCourseApi: builder.mutation({
                   query:(data)=>({
                    url:'/course/createcourse',
                    method: "POST",
                    body:data,
                   }),
                   invalidatesTags: ['Course'],
            }),
            ///GET Course API/////////////////
               getCourseApi: builder.query({
               query: (courseId) => ({
                    url: '/course/getcourse',
                    method: 'GET',
                    params: {
                         courseId: courseId
                    }
               }),
               }),
            ////////////////////////////////////////////COURSE-APIS- ENDS////////////////////////////////////////////
            ////////////////////////////////////////////CLass-APIS- STARTS////////////////////////////////////////////
            ///create class api
            createClassApi:builder.mutation({
               query:(data)=>({
                    url:'/class/createclass',
                    method: "POST",
                    body:data,
               }),
            }),
            ////////////////////////////////////////////CLass-APIS- ENDS////////////////////////////////////////////


    })

})

export const {
       useOtpVerificationApiMutation,
       useLoginApiMutation,
       useSignupApiMutation,
       useResentOtpApiMutation,
       useGetUserApiQuery,
       useForgotPasswordApiMutation,
       useResetPasswordApiMutation,
       useCreateCourseApiMutation,
       useGetCourseApiQuery,
       useCreateClassApiMutation,
               } = lmsAuthapi