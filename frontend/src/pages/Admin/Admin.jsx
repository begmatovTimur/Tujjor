import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {dashboardDataModel} from "../../Redux/reducers/dashboardDataReducer"
import Logo from "../../images/logo.png"
import {icons} from "../../Config/icons";
import {Outlet, useNavigate} from "react-router-dom";
import Filter from "../universal/Filter/Filter";
import Table from "../universal/Table/Table";

function Admin(props) {
  const { dashboardData } = props.dashboardDataReducer;
  const navigate = useNavigate();
  const userBoxRef = useRef(null);
  const [userBox, setUserBox] = useState(false);

  useEffect(() => {
    props.getDashboardData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userBoxRef.current && !userBoxRef.current.contains(event.target)) {
        setUserBox(false);
        // alert(userBox + " down")
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserDropDown = () => {
    setUserBox((prevState) => !prevState);
  };

    return (
        <div className={"bg-dark "} style={{height: 80, width: "auto"}}>
            <div className="d-flex justify-content-between">
                <div className="ps-2 pt-2 d-flex justify-content-center"
                     style={{width: 180, height: 80, backgroundColor: "rgb(77, 77, 77)"}}>
                    <div style={{width: 60, height: 60}} onClick={() => navigate("/admin")}>
                        <img src={Logo} alt="logo" width={60} height={60}/>
                    </div>
                </div>
                <div>
                    <div className="d-flex align-items-center justify-content-between ls-5">
                        <button className={"btn text-white mx-3"}>Supervisor</button>
                        <button className={"btn text-white mx-3"}>Sales</button>
                        <select defaultValue={""} className={"form-select bg-dark text-white border-0"} style={{width: "auto"}}>
                            <option value="" disabled style={{fontSize: "20px"}}>Cash Register</option>
                        </select>

                        <select defaultValue={""} className={"form-select mx-3 d-flex bg-dark text-white align-items-center border-0"}
                                style={{width: "auto"}}>
                            <option value="" disabled={true}>
                                Gps
                            </option>
                        </select>
                        <button className="btn btn-success text-white d-flex align-items-center mb-2 mt-2">
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
                    <h3 className="text text-white me-3">{dashboardData.currentSuperVisorPhoneNumber}</h3>
                    <button className="btn text-white">
                        {icons.notificationIcon}
                    </button>
                    <div style={{position: "relative"}}>
                        <button className="btn text-white" onClick={handleUserDropDown}  ref={userBoxRef}>
                            {icons.userIcon}
                            {icons.downTriangleIcon}
                        </button>

                        {
                             userBox ? <div style={{
                                position: "absolute",
                                top: 40,
                                right: 10,
                                width: 300,
                                height: 200,
                            }} className={"bg-dark p-4"}>
                                <button className="btn text-white mt-3 w-100 text-start">
                                    {icons.keyIcon} Change login and password
                                </button>
                                <button className="btn text-white mt-3 w-100 text-start">
                                    {icons.moneyIcon} Billing
                                </button>
                                <button className="btn text-white mt-3 w-100 text-start">
                                    {icons.exitIcon} Exit
                                </button>

                            </div> : ""
                        }
                    </div>


                </div>
            </div>
            <div className={"d-flex"}>

                <div style={{width: 150, backgroundColor: "rgb(125, 125, 125)"}} className={"pt-3"}>
                    <button className="btn text-white" style={{width: 150, height: 94}}>
                        {icons.rocketIcon}
                        <p className="text text-center text-white">Plans</p>
                    </button>
                    <button className="btn text-white" style={{width: 150, height: 94}}>
                        {icons.cartIcon}
                        <p className="text text-center text-white">Applications</p>
                    </button>
                    <button className="btn text-white" style={{width: 150, height: 94}}>
                        {icons.stockIcon}
                        <p className="text text-center text-white">Stock</p>
                    </button>
                    <button className="btn text-white" style={{width: 150, height: 94}}>
                        {icons.clientsIcon}
                        <p className="text text-center text-white">Clients</p>
                    </button>
                    <button className="btn text-white" style={{width: 150, height: 94}}>
                        {icons.androidIcon}
                        <p className="text text-center text-white">Agents</p>
                    </button>
                    <button className="btn text-white" style={{width: 150, height: 94}}>
                        {icons.reportsIcon}
                        <p className="text text-center text-white">Reports</p>
                    </button>
                    <button onClick={() => navigate("/admin/settings")} className="btn text-white"
                            style={{width: 150, height: 94}}>
                        {icons.settingsIcon}
                        <p className="text text-center text-white m-0">Settings</p>
                    </button>
                </div>
                <Outlet/>
            </div>
    </div>
  );
}

export default connect((state) => state, dashboardDataModel)(Admin);
