
import "./App.css";
import Login from "./pages/Login/Login";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useEffect, useState } from "react";
import Admin from "./pages/Admin/Admin";
import axios from "axios";
import Table from "./pages/universal/Table";
import Settings from "./pages/Settings/Settings";
import Test from "./pages/Settings/ChildComponents/Company";
import Company from "./pages/Settings/ChildComponents/Company";
import CustomerCategory from "./pages/Settings/ChildComponents/CustomerCategory";
import Territory from "./pages/Settings/ChildComponents/Territory";

function App() {
  const [data, setData] = useState([]);

  let columns = [
    {
      id: 1,
      title: "Name",
      key: "name",
      type: "text",
      show: true,
    },
    {
      id: 2,
      title: "Email",
      key: "email",
      type: "text",
      show: true,
    },
    {
      id: 3,
      title: "Body",
      key: "body",
      type: "text",
      show: true,
    },
  ];

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then(({ data }) => {
        setData(data);
      });
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const permissions = [
      { url: "/admin", roles: ["ROLE_SUPER_VISOR"] }
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
              }).then((res) => {
                localStorage.setItem("access_token", res.data);
                window.location.reload();
              });
            }
          });
      } else {
        alert("sd")
        navigate("/404");
      }
    }
  }

  useEffect(() => {
    hasPermissions();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/settings" element={<Settings />} >
            <Route path="/admin/settings/company-profile" element={<Company />}/>
            <Route path="/admin/settings/customer-category" element={<CustomerCategory />}/>
            <Route path="/admin/settings/territory" element={<Territory />}/>
          </Route>
        </Route>
        <Route
          path="/table"
          element={
            <Table
              pagination={true}
              changeSizeMode={true}
              dataProps={data}
              columnsProps={columns}
              paginationApi={
                "https://jsonplaceholder.typicode.com/comments?_page={page}&_limit={limit}"
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
