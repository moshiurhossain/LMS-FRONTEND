import { Navigate, Outlet } from "react-router"
import { useGetUserApiQuery } from "../services/api";

// signup and login layout
const Authlayout = () => {
    const{data,isLoading,isError}=useGetUserApiQuery()
    /////// If is loading
      if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h2>Checking authentication...</h2>
        </div>
      );
      
    }
    //////if is Error
    if (isError || !data?.data) {
      return <Navigate to="/signup" replace />;
    }
    const user = data.data
    console.log('THIS IS USER from admin layout',user)
  
  
      // If user is logged in but isn't admin
    if (user.role !== "user") {
      return <Navigate to="/login" replace />;
    }
  return (
    <>
    <div>
        <Outlet/>
    </div>
    </>
  )
}

export default Authlayout