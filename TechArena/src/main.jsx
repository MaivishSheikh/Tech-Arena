import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Devices from "./components/Devices/Devices.jsx";
import Home from "./components/Home/Home.jsx";
import Signin from "./components/UserPage/SignIn.jsx";
import DeviceShowCase from "./components/DeviceShowCase/DeviceShowCase.jsx";
import UserPage from "./components/UserPage/UserPage.jsx";
import CompareDevice from "./components/CompareDevice/CompareDevice.jsx";
import ReviewDevice from "./components/ReviewDevice/ReviewDevice.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import AddDevices from "./components/AddDevices/AddDevices.jsx";
import ViewDevices from "./components/ViewDevices/ViewDevices.jsx";
import ViewUsers from "./components/UserPage/ViewUser.jsx";
import Login from "./components/UserPage/LogIn.jsx";
import SSignIn from "./components/SellerPage/SSignIn.jsx";
import ViewSellers from "./components/SellerPage/viewSeller.jsx";
import SellerPage from "./components/SellerPage/SellerPage.jsx";
import SLogin from "./components/SellerPage/SLogin.jsx";
import SDashboard from "./components/SellerPage/SDashborad.jsx";
import QRCodeExample from "./components/QRCode/QRCodeExample.jsx";
import DeviceVariants from "./components/SellerPage/DeviceVariants.jsx";
import ViewDV from "./components/SellerPage/ViewDV.jsx";
import DVariants from "./components/Devices/DVariants.jsx";
import CustomerDetailsForm from "./components/CustomerDetailsForm/CustomerDetailsForm.jsx";
import BillGeneration from "./components/BillGeneration/BillGeneration.jsx";
import PaymentPage from "./components/PaymentPage/PaymentPage.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CartPage from "./components/CartPage/CartPage.jsx";
import TermsAndConditions from "./components/UserPage/TermsAndConditions.jsx";
import Contact from "./components/Contact/Contact.jsx";
import PurchasePreview from "./components/PurchasePreview/PurchasePreview.jsx";
import RequestProduct from "./components/SellerPage/RequestProduct.jsx";
import ProductRequestManagement from "./components/SellerPage/ProductRequestManagement.jsx";
import DeviceRequest from "./components/Dashboard/DeviceRequest.jsx";
import AltDashboard from "./components/Dashboard/AltDashborad.jsx";
import ViewDVBrand from "./components/SellerPage/ViewDVBrand.jsx";
import StockManagementPage from "./components/SellerPage/StockManagementPage.jsx";
import AdminStockViewPage from "./components/Dashboard/AdminStockViewPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/devices/:deviceName" element={<Devices />} />
      <Route path="/deviceShowcase/:category" element={<DeviceShowCase />} />
      <Route path="/users" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sellerLogin" element={<SSignIn />} />
      <Route path="/seller" element={<SLogin />} />
      <Route path="/sellerPage" element={<SellerPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/altDashboard" element={<AltDashboard />} />
      <Route path="/sellerDashboard/:companyName" element={<SDashboard />} />
      <Route path="/users/:username" element={<UserPage />} />
      <Route path="/compareDevice" element={<CompareDevice />} />
      <Route path="/reviewDevice/:deviceName" element={<ReviewDevice />} />
      <Route path="/addDevices" element={<AddDevices />} />
      <Route path="/viewDevices" element={<ViewDevices />} />
      <Route path="/viewUsers" element={<ViewUsers />} />
      <Route path="/viewSellers" element={<ViewSellers />} />
      <Route path="/deviceVariants" element={<DeviceVariants />} />
      <Route path="/viewDV" element={<ViewDV />} />
      <Route path="/viewDVBrand/:sellerName" element={<ViewDVBrand />} />
      <Route path="/dVariants/:deviceName" element={<DVariants />} />
      <Route path="adminStock" element={<AdminStockViewPage />} />
      <Route path="/qrCode" element={<QRCodeExample />} />
      <Route path="/customerDetails" element={<CustomerDetailsForm />} />
      <Route path="/bill" element={<BillGeneration />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cartPage" element={<CartPage />} />
      <Route path="/T&C" element={<TermsAndConditions />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/purchasePreview" element={<PurchasePreview />} />
      <Route path="/requestProduct" element={<RequestProduct />} />
      <Route path="/productRequests" element={<ProductRequestManagement />} />
      <Route path="/deviceRequest" element={<DeviceRequest />} />
      <Route path="/stock" element={<StockManagementPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
