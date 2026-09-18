import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Notfound from './pages/Notfound'

function App() {


  // React Router starts //
  const myRouter = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path ='/' element={<Home/>}/>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/signup' element={<Signup/>}/>
      <Route path ='*' element={<Notfound/>}/>
    </Route>
  ))
  // React Router ends //


  return (
    <>
       <RouterProvider router={myRouter}/>
    </>
  )
}

export default App
