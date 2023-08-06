import React, {useEffect, useRef, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {dashboardDataModel} from "../../Redux/reducers/dashboardDataReducer";
import Logo from "../../images/logo.png";
import {icons} from "../../Config/icons";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import DashboardButton from "../universal/DashboardButton/DashboardButton";
import "./Admin.css";

function Admin(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const {dashboardData} = props.dashboardDataReducer;
    const navigate = useNavigate();
    const userBoxRef = useRef(null);
    const [userBox, setUserBox] = useState(false);

    function nextPermission() {
        if (
            localStorage.getItem("no_token") === null ||
            localStorage.getItem("access_token") === null
        ) {
            navigate("/login");
            window.location.reload();
        }
    }

    function handleClickOutside(event) {
        if (userBoxRef.current && !userBoxRef.current.contains(event.target)) {
            setUserBox(false);
        }
    }

    useEffect(() => {
        nextPermission();
        props.getDashboardData();
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleUserDropDown = () => {
        setUserBox((prevState) => !prevState);
    };

    return (
        <div className={"bg-white"} style={{height: "100vh", width: "auto", backgroundColor: "#405058"}}>
            <div style={{height: "7%", backgroundColor: "#405058"}} className="d-flex">
                <div
                    className="ps-1 pt-2 d-flex justify-content-center"
                    style={{
                        width: "9.9%",
                        height: "100%",
                        backgroundColor: "#405065",
                    }}
                >
                    <img src={Logo} alt="logo" width={"38%"} height={"80%"}
                         style={{marginLeft: "-7%", objectFit: "contain"}} onClick={() => navigate("/admin")}/>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "47%"}}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "100%"
                    }}>
                        <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Supervisor</button>
                        <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Sales</button>
                        <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Cash Register</button>
                        <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Gps</button>
                        <button style={{fontSize: "14px"}}
                                className="custom_btn_success text-white d-flex align-items-center h-100 ms-3">
                            {icons.onlineHelpIcon}
                            Online Help
                        </button>
                    </div>
                </div>
                <div style={{width: "35%", marginLeft: "10%", backgroundColor: "#405058"}}
                     className={"ps-2 d-flex align-items-center"}>
                    <button className="custom_calendar">
                        <i className="fa fa-calendar pull-left"></i>
                        <span>{dashboardData.currentDate}</span>
                    </button>
                    <h3 className="phone_number">
                        {dashboardData.currentSuperVisorPhoneNumber}
                    </h3>
                    <button className="btn text-white">{icons.notificationIcon}</button>
                    <div style={{position: "relative"}}>
                        <button
                            className="btn text-white"
                            onClick={handleUserDropDown}
                            ref={userBoxRef}
                        >
                            {icons.userIcon}
                            {icons.downTriangleIcon}
                        </button>
                        {userBox ? (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 40,
                                    right: 10,
                                    width: 300,
                                    height: 200,
                                }}
                                className={"bg-dark p-4"}
                            >
                                <button className="btn text-white mt-3 w-100 text-start">
                                    {icons.keyIcon} Change login and password
                                </button>
                                <button className="btn text-white mt-3 w-100 text-start">
                                    {icons.moneyIcon} Billing
                                </button>
                                <button className="btn text-white mt-3 w-100 text-start">
                                    {icons.exitIcon} Exit
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <div className={"d-flex h-100"}>
                <div
                    style={{
                        width: "90px",
                        backgroundColor: "#4b5d67",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <DashboardButton
                        icon={<i className="fa fa-medkit"></i>}
                        title={"Diagnostic"}
                        path={"/admin/diagnostic"}
                    />
                    <DashboardButton
                        title={"Plans"}
                        path={"/admin/plans"}
                        icon={<i className="fa fa-rocket"></i>}
                    />
                    <DashboardButton
                        title={"Applications"}
                        path={"/admin/applications"}
                        icon={<i className="fa fa-shopping-cart"></i>}
                    />
                    <DashboardButton
                        title={"Stock"}
                        path={"/admin/stock"}
                        icon={icons.stockIcon}
                    />
                    <DashboardButton
                        title={"Clients"}
                        path={"/admin/clients"}
                        icon={icons.clientsIcon}
                    />
                    <DashboardButton
                        title={"Agents"}
                        path={"/admin/agents"}
                        icon={icons.androidIcon}
                    />
                    <DashboardButton
                        title={"Reports"}
                        path={"/admin/reports"}
                        icon={icons.reportsIcon}
                    />
                    <DashboardButton
                        title={"Settings"}
                        path={"/admin/settings"}
                        icon={<i className="fa fa-cogs"></i>}
                    />
                </div>
                <Outlet/>
            </div>
        </div>
    );
}

export default connect((state) => state, dashboardDataModel)(Admin);
