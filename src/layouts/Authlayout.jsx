import { Outlet } from "react-router"

// signup and login layout
const Authlayout = () => {
  return (
    <>
    <div>
        <Outlet/>
    </div>
    </>
  )
}

export default Authlayout