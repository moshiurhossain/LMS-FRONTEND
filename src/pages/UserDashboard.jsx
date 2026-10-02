import UserInfo from "../components/UserInfo"
import { useGetUserApiQuery } from "../services/api"


const UserDashboard = () => {
      const {data} =useGetUserApiQuery()
      const username = data?.data?.name
      const useremail = data?.data?.email
      const userrole = data?.data?.role
  return (
    <div>
     <UserInfo 
        username={username}
        useremail={useremail}
        userrole={userrole}
      />   
        UserDashboard</div>
  )
}

export default UserDashboard