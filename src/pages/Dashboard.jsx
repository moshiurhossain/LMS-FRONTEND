// import { useLocation } from "react-router"

import { useGetUserApiQuery } from "../services/api"
import UserInfo from "../components/UserInfo"


const Dashboard = () => {
  // const location = useLocation()
  // const user = location.state?.user
  // console.log(user)
  const {data} =useGetUserApiQuery()
  const username = data?.data?.name
  const useremail = data?.data?.email
  const userrole = data?.data?.role
  return (
    <div className="flex">
     <UserInfo username={username} useremail={useremail} userrole={userrole}/>
     
         
        
    </div>
    
  )
}

export default Dashboard