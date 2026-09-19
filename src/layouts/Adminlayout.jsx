import { Outlet } from "react-router"
import Header from "../pages/Header"


const Adminlayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Adminlayout