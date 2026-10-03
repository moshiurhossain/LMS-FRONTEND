import { Navigate, Outlet } from "react-router"
import Header from "../pages/Header"
import { useGetUserApiQuery } from "../services/api"
import AdminNavbar from "../components/AdminNavbar"


const Adminlayout = () => {
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
    return <Navigate to="/auth/login" replace />;
  }
  const user = data.data
  console.log('THIS IS USER from admin layout',user)


    // If user is logged in but isn't admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
        <Header/>
        <div className="flex-col">
          <div className="flex">
           <AdminNavbar/>
           <Outlet/>
          </div>
          
        </div>
    </div>
  )
}

export default Adminlayout