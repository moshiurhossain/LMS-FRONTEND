import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// http://localhost:8080/api/v1/auth/login
export const lmsapi = createApi({
    reducerPath :'lmsapi',
    baseQuery : fetchBaseQuery({ baseUrl : 'http://localhost:8080/api/v1/'}),
    endpoints :(builder)=>({
        // dummy api
            // getLoginApi : builder.query({
            //     query : ()=> 'auth/login'
            // }),
        // dummy api    
            login : builder.mutation({
                 query :(data)=>({
                    url:"auth/login",
                    method: "POST",
                    body:data,
                 })
            }),

    }),

})

export const {
    // useGetLoginApiQuery,
       useLoginMutation,
               } = lmsapi