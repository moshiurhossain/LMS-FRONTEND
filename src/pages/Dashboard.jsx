// import { useLocation } from "react-router"
import { useGetUserApiQuery } from "../services/api"
import UserInfo from "../components/UserInfo"
import { useNavigate } from "react-router"


const Dashboard = () => {
  const navigate = useNavigate()
  // const location = useLocation()
  // const user = location.state?.user
  // console.log(user)
  const {data} =useGetUserApiQuery()
  const userData = data?.data
  const userRole = data?.data?.role
  const username = data?.data?.name
  const useremail = data?.data?.email
  const userrole = data?.data?.role
  // handle create course button click
  const handleCreateCourse = (e) => {
   e.preventDefault()
   navigate('/admin/createcourse',{
     state :{
      user:userData,
      role:userRole,
     }
   })

  }
  return (
    <>
    <div className="h-[100px] px-5 flex items-center justify-between w-full bg-gray-100 ">
      <div>
     <UserInfo username={username} useremail={useremail} userrole={userrole}/>

      </div>
    <button
    onClick={handleCreateCourse}
    className="bg-[#2e31ddb6] text-white font-bold p-4 cursor-pointer rounded-lg hover:bg-[#16199eb6]">Create Course</button>       
    </div>
    </>
  )
}

export default Dashboard