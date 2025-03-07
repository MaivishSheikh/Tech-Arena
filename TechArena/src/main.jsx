import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Devices from './components/Devices/Devices.jsx'
import Home from './components/Home/Home.jsx'
import Signin from './components/Sign In/SignIn.jsx'
import DeviceShowCase from './components/DeviceShowCase/DeviceShowCase.jsx'
import UserPage from './components/UserPage/UserPage.jsx'
import Login from './components/LogIn/LogIn.jsx'
import CompareDevice from './components/CompareDevice/CompareDevice.jsx'
import ReviewDevice from './components/ReviewDevice/ReviewDevice.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import AddDevices from './components/AddDevices/AddDevices.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/devices/:deviceName" element={<Devices />} />
      <Route path="/deviceShowcase/:category" element={<DeviceShowCase />} />
      <Route path="/users" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard /> } />
      <Route path="/users/:username" element={<UserPage />} />
      <Route path="/compareDevice" element={<CompareDevice /> } />
      <Route path="/reviewDevice/:deviceName" element={<ReviewDevice /> } />
      <Route path="/addDevices" element={<AddDevices /> } />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
