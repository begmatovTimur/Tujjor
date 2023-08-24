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
    const [isHovered, setIsHovered] = useState(false);
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
    }, []);

    const handleUserDropDown = (status) => {
        setUserBox(status);
    };
    const handleMouseEnterF = () => {
        setIsHovered(true);
    };
    const handleMouseLeaveF = () => {
        setIsHovered(false);
    }

    function logOut() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div style={{height: "100%", width: "auto", backgroundColor: "#EEEEEE"}}>
            <div style={{height: "7%", backgroundColor: "#405058"}} className="d-flex header">
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
                        <button style={{fontSize: "14px"}}
                                className={"btn text-white custom_dashboard_button"}>Supervisor
                        </button>
                        <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Sales
                        </button>
                        <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Cash
                            Register
                        </button>
                        <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Gps
                        </button>
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
                            onMouseLeave={() => handleUserDropDown(false)}
                            onMouseOverCapture={() => handleUserDropDown(true)}
                            className="btn text-white"
                            ref={userBoxRef}
                        >
                            {icons.userIcon}
                            {icons.downTriangleIcon}
                        </button>
                        
                        {userBox ? (
                            <div
                                onMouseLeave={() => handleUserDropDown(false)}
                                onMouseOverCapture={() => handleUserDropDown(true)}
                                style={{
                                    position: "absolute",
                                    top: 34,
                                    right: 10,
                                    width: 300,
                                    height: 200,
                                }}
                                className={"user_box_admin"}
                            >
                                <button className="custom_userbox_button">
                                    {icons.keyIcon} Change login & password
                                </button>
                                <button className="custom_userbox_button d-flex justify-content-between align-items-center" onClick={()=>navigate("/payment")}>
                                    <span className="d-flex gap-2">{icons.moneyIcon} Billing</span>
                                </button>
                                <button className="custom_userbox_button" onClick={logOut}>
                                    {icons.exitIcon} Exit
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <div style={{height: "100vh"}} className={"d-flex"}>
                <div
                    className="sideBar"
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
                    <button className={"dashboard_clients_button"} onMouseEnter={handleMouseEnterF}
                            onMouseLeave={handleMouseLeaveF} style={{zIndex: "10000"}}>
                        {icons.clientsIcon}
                        <span>Clients</span>
                    </button>
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
                {isHovered &&
                    <div onMouseEnter={handleMouseEnterF} onMouseLeave={handleMouseLeaveF} id={"clientDatasBox"}>
                        <p onClick={() => navigate("/admin/clients") & setIsHovered(false)}>Clients</p>
                        <p onClick={() => navigate("/admin/clients_on_the_map") & setIsHovered(false)}>Clients on the
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