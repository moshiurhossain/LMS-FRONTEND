import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Notfound from './pages/Notfound'
import Layoutone from './layouts/Layoutone'
import Authlayout from './layouts/Authlayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Adminlayout from './layouts/Adminlayout'
import Dashboard from './pages/Dashboard'
import VerificationOTP from './pages/VerificationOTP'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import UserDashboard from './pages/UserDashboard'
function App() {


  // React Router starts //
  const myRouter = createBrowserRouter(createRoutesFromElements(
    ////MasterLayout////
    <Route>

      {/* ////layoutone//// */}
      <Route path ='/' element={<Layoutone/>}>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/verifyotp' element ={<VerificationOTP/>}/>
        <Route path='/forgotpassword' element ={<ForgotPassword/>}/>
        <Route path='/resetpassword' element ={<ResetPassword/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Route>
      {/* ////layoutone//// */}

      {/* ////Authlayout//// */}
      <Route path='/auth' element={<Authlayout/>}>
        <Route index element={<UserDashboard/>} />
        <Route path='*' element={<Notfound/>}/>
      </Route>
      {/* ////Authlayout//// */}

      {/* ////Adminlayout */}
      <Route path='/admin' element={<Adminlayout/>}>
       <Route index element={<Dashboard/>}/>
       <Route path='*' element={<Notfound/>}/>
      </Route>
      {/* ////Adminlayout */}


    </Route>
     //MasterLayout////
  ))
  // React Router ends //


  return (
    <>
       <RouterProvider router={myRouter}/>
    </>
  )
}

export default App