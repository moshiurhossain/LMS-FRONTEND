import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Notfound from './pages/Notfound'
import Layoutone from './layouts/Layoutone'
import Authlayout from './layouts/Authlayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
function App() {


  // React Router starts //
  const myRouter = createBrowserRouter(createRoutesFromElements(
    ////MasterLayout////
    <Route>

      ////layoutone////
      <Route path ='/' element={<Layoutone/>}>
        <Route index element={<Home/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Route>
      ////layoutone////

      ////Authlayout////
      <Route path='/auth' element={<Authlayout/>}>
        <Route path='/auth/login' element={<Login/>} />
        <Route path='/auth/signup' element={<Signup/>} />
      </Route>
      ////Authlayout////


      
    </Route>
     ////MasterLayout////
  ))
  // React Router ends //


  return (
    <>
       <RouterProvider router={myRouter}/>
    </>
  )
}

export default App
