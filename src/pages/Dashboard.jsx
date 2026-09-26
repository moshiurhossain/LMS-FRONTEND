// import { useLocation } from "react-router"
import { useGetUserApiQuery } from "../services/api"


const Dashboard = () => {
  // const location = useLocation()
  // const user = location.state?.user
  // console.log(user)
  const {data} =useGetUserApiQuery()
  return (
          <div>
            <h1>Dashboard</h1>

            {/* <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p> */}
              <h2>
                Welcome, {data?.data?.name}
            </h2>

            <p>
                Email: {data?.data?.email}
            </p>

            <p>
                Role: {data?.data?.role}
            </p>
        </div>
  )
}

export default Dashboard