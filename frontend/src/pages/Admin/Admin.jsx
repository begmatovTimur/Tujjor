import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { dashboardDataModel } from "../../Redux/reducers/dashboardDataReducer";
import Logo from "../../images/logo.png";
import { icons } from "../../Config/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Admin.css";
function Admin(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { dashboardData } = props.dashboardDataReducer;
  const navigate = useNavigate();
  const userBoxRef = useRef(null);
  const [userBox, setUserBox] = useState(false);

  function nextPermission() {
    if (
      localStorage.getItem("no_token") === null ||
      localStorage.getItem("access_token") === null
    ) {
      navigate("/404");
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
    <div className={"bg-dark "} style={{height: "100vh", width: "auto", backgroundColor:"#405058"}}>
      <div style={{height:"10%", backgroundColor:"#405058"}} className="d-flex">
        <div
          className="ps-1 pt-2 d-flex justify-content-center"
          style={{
            width: "9.9%",
            height: "100%",
            backgroundColor: "#405065",
          }}
        >
          <img src={Logo} alt="logo" width={"38%"} height={"80%"} style={{marginLeft:"-7%"}} />
        </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"47%"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%"}}>
            <button style={{fontSize:"14px"}} className={"btn text-white mx-3"}>Supervisor</button>
            <button style={{fontSize:"14px"}} className={"btn text-white mx-3"}>Sales</button>
            <select
              defaultValue={"DEFAULT"}
              className={"form-select text-white border-0"}
              style={{ width: "auto", backgroundColor:"#405058", fontSize:"14px"}}
            >
              <option value="DEFAULT" style={{ fontSize: "20px" }}>
                Cash Register
              </option>
            </select>

            <select
              className={
                "form-select mx-3 d-flex text-white align-items-center border-0"
              }
              defaultValue={"DEFAULT"}
              style={{ width: "auto", backgroundColor:"#405058",fontSize:"14px"}}
            >
              <option value="DEFAULT"><i className="fa-solid fa-location-dot"></i> Gps</option>
            </select>
            <button style={{fontSize:"14px"}} className="btn btn-success text-white d-flex align-items-center mb-3 mt-3">
              {icons.onlineHelpIcon}
              Online Help
            </button>
          </div>
        </div>
        <div style={{width:"35%", marginLeft:"10%", backgroundColor:"#405058"}} className={"ps-2 d-flex align-items-center"}>
          <button className="btn btn-info text-white me-2">
            {icons.calendarIcon}
            {dashboardData.currentDate}
          </button>
          <h3 className="text text-white me-3">
            {dashboardData.currentSuperVisorPhoneNumber}
          </h3>
          <button className="btn text-white">{icons.notificationIcon}</button>
          <div style={{ position: "relative" }}>
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
      <div className={"d-flex"}>
        <div
          style={{width: "8%", backgroundColor:"#405058", padding:"10px 10px 0px", display: "flex", flexDirection:"column", gap:"10px"}}
        >
          <button
            className="btn text-white button_hover"
            style={{ width: "100%", height: "11%", paddingTop:"12%", wordBreak:"break-all"}}
          >
            {icons.rocketIcon}
            <p style={{fontSize:"13px", marginTop:"8px"}} className="text text-center text-white">Plans</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: "100%", height: "11%", paddingTop:"12%", wordBreak:"break-all"}}
          >
            {icons.cartIcon}
            <p style={{fontSize:"12px", marginTop:"8px"}} className="text text-center text-white">Applications</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: "100%", height: "11%", paddingTop:"12%", wordBreak:"break-all"}}
          >
            {icons.stockIcon}
            <p style={{fontSize:"13px", marginTop:"8px"}} className="text text-center text-white">Stock</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: "100%", height: "11%", paddingTop:"12%", wordBreak:"break-all"}}
          >
            {icons.clientsIcon}
            <p style={{fontSize:"13px", marginTop:"8px"}} className="text text-center text-white">Clients</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: "100%", height: "11%", paddingTop:"12%", wordBreak:"break-all"}}
          >
            {icons.androidIcon}
            <p style={{fontSize:"13px", marginTop:"8px"}} className="text text-center text-white">Agents</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: "100%", height: "11%", paddingTop:"12%", wordBreak:"break-all"}}
          >
            {icons.reportsIcon}
            <p style={{fontSize:"13px", marginTop:"8px"}} className="text text-center text-white">Reports</p>
          </button>
          <button
            onClick={() => navigate("/admin/settings")}
            className={
              "btn text-white button_hover" +
              (location.pathname.includes("/admin/settings")
                ? " active_button_admin"
                : "")
            }
            style={{ width: "100%", paddingTop:"12%", wordBreak:"break-all"}}
          >
            {icons.settingsIcon}
            <p style={{fontSize:"13px", marginTop:"8px"}} className="text text-center text-white m-0">Settings</p>
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
export default connect((state) => state, dashboardDataModel)(Admin);
