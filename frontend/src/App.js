import "./App.css";
import Login from "./pages/Login/Login";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Admin from "./pages/Admin/Admin";
import axios from "axios";
import Territory from "pages/Settings/ChildComponents/Teritory/Territory";
import {ToastContainer} from "react-toastify";
import Settings from "pages/Settings/Settings";
import {domen} from "Config/apiCall";
import {tableActions} from "pages/universal/Table/Redux/Reducers/tableReducer";
import Company from "pages/Settings/ChildComponents/Company/Company";
import CustomerCategory from "pages/Settings/ChildComponents/CustomerCategory/CustomerCategory";
import Clients from "pages/Clients/clients";
import ClientsOnTheMap from "pages/Clients/Components/ClientOnTheMap/clientsOnTheMap";
import NotFound from "pages/404/NotFound";
import {useDispatch} from "react-redux";
import LanguageContext from "./Languages/Contex/Language";
import Agents from "../src/pages/Agents/Agents"
import AddClient from "./pages/Telegram/AddClient";
import ClientsOnTheMapTelegram from "./pages/Telegram/ClientsOnTheMapTelegram/clientsOnTheMap";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [langIndex, setLangIndex] = useState(0)

    const permissions = [
        {url: "/admin", roles: ["ROLE_SUPER_VISOR"]},
        {url: "/admin/settings", roles: ["ROLE_SUPER_VISOR"]},
        {url: "/admin/settings/company-profile", roles: ["ROLE_SUPER_VISOR"]},
        {url: "/admin/teritory", roles: ["ROLE_SUPER_VISOR"]},
        {url: "/admin/clients", roles: ["ROLE_SUPER_VISOR"]},
        {url: "/admin/clients_on_the_map", roles: ["ROLE_SUPER_VISOR"]},
        {url: "/admin/settings/customer-category", roles: ["ROLE_SUPER_VISOR"]},
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
                    url: domen + "/users/me",
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
                        if (err.response.status === 401) {
                            axios({
                                url:
                                    domen +
                                    "/auth/refresh?refreshToken=" +
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

    function navigateByButtonId() {
        switch (localStorage.getItem("sidebar_button")) {
            case "1":
                navigate("/admin")
                break
            case "2":
                navigate("/admin")
                break
            case "3":
                navigate("/admin")
                break
            case "4":
                navigate("/admin")
                break
            case "5":
                navigate("/admin/clients")
                break
            case "6":
                navigate("/admin/agents")
                break
            case "7":
                navigate("/admin")
                break
            case "8":
                navigate("/admin/settings/company-profile")
                break
        }
    }

    function checkLanguageIndex() {
        const indexLang = localStorage.getItem("langIndex");
        if (indexLang === null || indexLang < 0 || indexLang > 2) {
            return;
        }
        setLangIndex(JSON.parse(localStorage.getItem("langIndex")))
    }

    function changeLanguageIndex(index) {
        setLangIndex(index);
        localStorage.setItem("langIndex", index);
    }

    useEffect(() => {
        hasPermissions();
        navigateByButtonId()
        checkLanguageIndex()
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname) {
            dispatch(tableActions.resetFormInputs());
        }
    }, [location.pathname]);

    return (
        <div className="App">
            <LanguageContext.Provider value={{langIndex, setLangIndex, changeLanguageIndex}}>
                <ToastContainer/>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path="/admin" element={<Admin/>}>
                        <Route path="/admin/settings" element={<Settings/>}>
                            <Route
                                path="/admin/settings/company-profile"
                                element={<Company/>}
                            />
                            <Route
                                path="/admin/settings/customer-category"
                                element={<CustomerCategory/>}
                            />
                            <Route path="/admin/settings/territory" element={<Territory/>}/>
                        </Route>
                        <Route path="/admin/clients" element={<Clients/>}></Route>
                        <Route
                            path="/admin/clients_on_the_map"
                            element={<ClientsOnTheMap/>}
                        ></Route>
                        <Route path="/admin/agents" element={<Agents/>}></Route>
                    </Route>
                    <Route path={"telegram/add-client/:token"} element={<AddClient/>}/>
                    <Route path={"telegram/clients-on-the-map/:token"} element={<ClientsOnTheMapTelegram/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </LanguageContext.Provider>
        </div>
    );
}

export default App;
