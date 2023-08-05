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

    console.log("use effect is working");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserDropDown = () => {
    setUserBox((prevState) => !prevState);
  };

  return (
    <div className={"bg-dark "} style={{ height: "100vh", width: "auto" }}>
      <div style={{ height: "10%" }} className="d-flex">
        <div
          className="ps-1 pt-2 d-flex justify-content-center"
          style={{
            width: "9.9%",
            height: "100%",
            backgroundColor: "rgb(77, 77, 77)",
          }}
        >
          <img src={Logo} alt="logo" width={"40%"} height={"80%"} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "45%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: "5%",
            }}
          >
            <button className={"btn text-white mx-3"}>Supervisor</button>
            <button className={"btn text-white mx-3"}>Sales</button>
            <select
              defaultValue={"DEFAULT"}
              className={"form-select bg-dark text-white border-0"}
              style={{ width: "auto" }}
            >
              <option value="DEFAULT" style={{ fontSize: "20px" }}>
                Cash Register
              </option>
            </select>

            <select
              className={
                "form-select mx-3 d-flex bg-dark text-white align-items-center border-0"
              }
              defaultValue={"DEFAULT"}
              style={{ width: "auto" }}
            >
              <option value="DEFAULT">Gps</option>
            </select>
            <button className="btn btn-success text-white d-flex align-items-center mb-3 mt-3">
              {icons.onlineHelpIcon}
              Online Help
            </button>
          </div>
        </div>
        <div className={"ps-5 d-flex align-items-center"}>
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
          style={{ width: 94, backgroundColor: "rgb(125, 125, 125)" }}
          className={"pt-3 left_side"}
        >
          <button
            className="btn text-white button_hover"
            style={{ width: 90, height: 68 }}
          >
            {icons.rocketIcon}
            <p className="text text-center text-white">Plans</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: 90, height: 94 }}
          >
            {icons.cartIcon}
            <p className="text text-center text-white">Applications</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: 90, height: 94 }}
          >
            {icons.stockIcon}
            <p className="text text-center text-white">Stock</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: 90, height: 94 }}
          >
            {icons.clientsIcon}
            <p className="text text-center text-white">Clients</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: 90, height: 68 }}
          >
            {icons.androidIcon}
            <p className="text text-center text-white">Agents</p>
          </button>
          <button
            className="btn text-white button_hover"
            style={{ width: 90, height: 68 }}
          >
            {icons.reportsIcon}
            <p className="text text-center text-white">Reports</p>
          </button>
          <button
            onClick={() => navigate("/admin/settings")}
            className={
              "btn text-white button_hover" +
              (location.pathname.includes("/admin/settings")
                ? " active_button_admin"
                : "")
            }
            style={{ width: 90, height: 68 }}
          >
            {icons.settingsIcon}
            <p className="text text-center text-white m-0">Settings</p>
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
export default connect((state) => state, dashboardDataModel)(Admin);
