import React, {useEffect, useRef, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {dashboardDataModel} from "../../Redux/reducers/dashboardDataReducer";
import Logo from "../../images/logo.png";
import {icons} from "../../Config/icons";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import DashboardButton from "../universal/DashboardButton/DashboardButton";
import "./Admin.css";
import Navbar from "./Components/Navbar";

function Admin(props) {
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const {dashboardData} = props.dashboardDataReducer;
    const navigate = useNavigate();
    const unCheckedButtonClass = "dashboard_button"
    const checkedButtonClass = "checked_dashboard_button " + unCheckedButtonClass
    const unCheckedClientsButtonClass = "dashboard_clients_button"
    const checkedClientsButtonClass = "checked_clients_button " + unCheckedClientsButtonClass

    function nextPermission() {
        if (
            localStorage.getItem("no_token") === null ||
            localStorage.getItem("access_token") === null
        ) {
            navigate("/login");
            window.location.reload();
        }
    }

    useEffect(() => {
        nextPermission();
        props.getDashboardData();
    }, []);


    const handleMouseEnterF = () => {
        setIsHovered(true);
    };
    const handleMouseLeaveF = () => {
        setIsHovered(false);
    }

    function setCheckButton(url) {
        localStorage.setItem("sidebar_button", "5")
        navigate(url)
    }

    return (
        <div style={{height: "100%", width: "auto", backgroundColor: "#EEEEEE"}}>
            <Navbar/>
            <div style={{height: "100vh"}} className={"d-flex"}>
                <div
                    style={{
                        width: "90px",
                        backgroundColor: "#4b5d67",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <DashboardButton
                        id={1}
                        icon={<i className="fa fa-medkit"></i>}
                        title={"Diagnostic"}
                        path={"/admin/diagnostic"}
                        class={localStorage.getItem("sidebar_button")==="1"?checkedButtonClass:unCheckedButtonClass}
                    />
                    <DashboardButton
                        id={2}
                        title={"Plans"}
                        path={"/admin/plans"}
                        icon={<i className="fa fa-rocket"></i>}
                        class={localStorage.getItem("sidebar_button")==="2"?checkedButtonClass:unCheckedButtonClass}
                    />
                    <DashboardButton
                        id={3}
                        title={"Applications"}
                        path={"/admin/applications"}
                        icon={<i className="fa fa-shopping-cart"></i>}
                        class={localStorage.getItem("sidebar_button")==="3"?checkedButtonClass:unCheckedButtonClass}
                    />
                    <DashboardButton
                        id={4}
                        title={"Stock"}
                        path={"/admin/stock"}
                        icon={icons.stockIcon}
                        class={localStorage.getItem("sidebar_button")==="4"?checkedButtonClass:unCheckedButtonClass}
                    />
                    <button className={localStorage.getItem("sidebar_button")==="5"?checkedClientsButtonClass:unCheckedClientsButtonClass} onMouseEnter={handleMouseEnterF}
                            onMouseLeave={handleMouseLeaveF} style={{zIndex: "10000"}}>
                        {icons.clientsIcon}
                        <span>Clients</span>
                    </button>
                    <DashboardButton
                        id={6}
                        title={"Agents"}
                        path={"/admin/agents"}
                        icon={icons.androidIcon}
                        class={localStorage.getItem("sidebar_button")==="6"?checkedButtonClass:unCheckedButtonClass}
                    />
                    <DashboardButton
                        id={7}
                        title={"Reports"}
                        path={"/admin/reports"}
                        icon={icons.reportsIcon}
                        class={localStorage.getItem("sidebar_button")==="7"?checkedButtonClass:unCheckedButtonClass}
                    />
                    <DashboardButton
                        id={8}
                        title={"Settings"}
                        path={"/admin/settings"}
                        icon={<i className="fa fa-cogs"></i>}
                        class={localStorage.getItem("sidebar_button")==="8"?checkedButtonClass:unCheckedButtonClass}
                    />
                </div>
                {isHovered &&
                    <div onMouseEnter={handleMouseEnterF} onMouseLeave={handleMouseLeaveF} id={"clientDatasBox"}>
                        <p onClick={() => setCheckButton("/admin/clients") & setIsHovered(false)}>Clients</p>
                        <p onClick={() => setCheckButton("/admin/clients_on_the_map") & setIsHovered(false)}>Clients on the
                            map</p>
                        <p style={{padding: "0px"}}></p>
                    </div>
                }
                <Outlet/>
            </div>
        </div>
    );
}

export default connect((state) => state, dashboardDataModel)(Admin);