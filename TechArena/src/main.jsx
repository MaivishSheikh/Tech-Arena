import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Devices from './components/Devices/Devices.jsx'
import Home from './components/Home/Home.jsx'
import Signin from './components/UserPage/SignIn.jsx'
import DeviceShowCase from './components/DeviceShowCase/DeviceShowCase.jsx'
import UserPage from './components/UserPage/UserPage.jsx'
import CompareDevice from './components/CompareDevice/CompareDevice.jsx'
import ReviewDevice from './components/ReviewDevice/ReviewDevice.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import AddDevices from './components/AddDevices/AddDevices.jsx'
import ViewDevices from './components/ViewDevices/ViewDevices.jsx'
import ViewUsers from './components/UserPage/ViewUser.jsx'
import Login from './components/UserPage/LogIn.jsx'
import SSignIn from './components/SellerPage/SSignIn.jsx'
import ViewSellers from './components/SellerPage/viewSeller.jsx'
import SellerPage from './components/SellerPage/SellerPage.jsx'
import SLogin from './components/SellerPage/SLogin.jsx'
import SDashboard from './components/SellerPage/SDashborad.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/devices/:deviceName" element={<Devices />} />
      <Route path="/deviceShowcase/:category" element={<DeviceShowCase />} />
      <Route path="/users" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sellerLogin" element={<SSignIn />} />
      <Route path="/seller" element={<SLogin /> } />
      <Route path="/sellerPage" element={<SellerPage /> } />
      <Route path="/dashboard" element={<Dashboard /> } />
      <Route path="/sellerDashboard" element={<SDashboard /> } />
      <Route path="/users/:username" element={<UserPage />} />
      <Route path="/compareDevice" element={<CompareDevice /> } />
      <Route path="/reviewDevice/:deviceName" element={<ReviewDevice /> } />
      <Route path="/addDevices" element={<AddDevices /> } />
      <Route path="/viewDevices" element={<ViewDevices /> } />
      <Route path="/viewUsers" element={<ViewUsers />} />
      <Route path="/viewSellers" element={<ViewSellers />} />
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
