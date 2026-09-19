import { Outlet } from "react-router"
import Header from "../pages/Header"

// user layout 
const Layoutone = () => {
  return (
    <>
    
    <div>
        <Header/>
        <Outlet/>
    </div>
    </>
  )
}

export default Layoutone