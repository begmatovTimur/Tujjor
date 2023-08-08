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
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const permissions = [
    { url: "/admin", roles: ["ROLE_SUPER_VISOR"] },
    { url: "/admin/settings", roles: ["ROLE_SUPER_VISOR"] },
    { url: "/admin/settings/company-profile", roles: ["ROLE_SUPER_VISOR"] },
    { url: "/admin/teritory", roles: ["ROLE_SUPER_VISOR"] },
  ];

  function hasPermissions() {
    let count = 0;
    permissions.map((item, index) => {
      if (item.url === location.pathname) {
        count = count + 1;
      }
    });
    if (count === 1) {
      if (localStorage.getItem("access_token") !== null) {
        axios({
          url: "http://localhost:8080/api/users/me",
          method: "GET",
          headers: {
            token: localStorage.getItem("access_token"),
          },
        })
          .then((res) => {
            let s = false;
            permissions.map((item) => {
              if (item.url === location.pathname) {
                res.data.authorities.map((i1) => {
                  if (item.roles.includes(i1.roleName)) {
                    s = true;
                  }
                });
              }
            });
            if (!s) {
              navigate("/404");
            }
          })
          .catch((err) => {
            if (localStorage.getItem("no_token") === "sorry") {
              navigate("/login");
              for (let i = 0; i < 1; i++) {
                window.location.reload();
              }
            }
            if (err.response.status === 403) {
              axios({
                url:
                  "http://localhost:8080/api/auth/refresh?refreshToken=" +
                  localStorage.getItem("refresh_token"),
                method: "POST",
              })
                .then((res) => {
                  localStorage.setItem("access_token", res.data);
                  window.location.reload();
                })
                .catch((err) => {
                  navigate("/login");
                });
            }
          });
      } else {
        navigate("/404");
      }
    }
  }

  useEffect(() => {
    hasPermissions();
  }, []);

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
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
