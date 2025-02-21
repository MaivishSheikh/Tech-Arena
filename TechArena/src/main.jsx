import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Devices from './components/Devices/Devices.jsx'
import Home from './components/Home/Home.jsx'
import Signin from './components/Sign In/SignIn.jsx'
import User from './components/Users/User.jsx'
import DeviceShowCase from './components/DeviceShowCase/DeviceShowCase.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/devices/:deviceName" element={<Devices />} />
      <Route path="/deviceShowcase" element={<DeviceShowCase />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/users" element={<User />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
