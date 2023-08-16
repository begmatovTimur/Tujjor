import "./App.css";
import Login from "./pages/Login/Login";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useEffect } from "react";
import Admin from "./pages/Admin/Admin";
import axios from "axios";
import Settings from "./pages/Settings/Settings";
import Teritory from "./pages/Teritory/Teritory";
import Company from "./pages/Settings/ChildComponents/Company";
import CustomerCategory from "./pages/Settings/ChildComponents/CustomerCategory";
import NotFound from "./pages/404/NotFound";
import { ToastContainer } from "react-toastify";
import Clients from "./pages/Clients/clients";
import ClientsOnTheMap from "./pages/Clients/clientsOnTheMap";
function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/settings" element={<Settings />}>
            <Route
              path="/admin/settings/company-profile"
              element={<Company />}
            />
            <Route
              path="/admin/settings/customer-category"
              element={<CustomerCategory />}
            />
            <Route path="/admin/settings/territory" element={<Teritory />} />
          </Route>
          <Route path="/admin/clients" element={<Clients/>}></Route>
          <Route path="/admin/clients_on_the_map" element={<ClientsOnTheMap/>}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
