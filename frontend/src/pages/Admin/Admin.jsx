import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {dashboardDataModel} from "../../Redux/reducers/dashboardDataReducer"
import Logo from "../../images/logo.png"
import {icons} from "../../Config/icons";

function Admin(props) {
    const {dashboardData} = props.dashboardDataReducer

    useEffect(() => {
        props.getDashboardData()
    }, [])

    return (
        <div className={"bg-dark "} style={{height: 80, width: "auto"}}>
            <div className="d-flex justify-content-between">
                <div className="ps-2 pt-2 d-flex justify-content-center"
                     style={{width: 180, height: 80, backgroundColor: "rgb(77, 77, 77)"}}>
                    <div style={{width: 60, height: 60}}>
                        <img src={Logo} alt="logo" width={60} height={60}/>
                    </div>
                </div>
                <div>
                    <div className="d-flex align-items-center justify-content-between ls-5">
                        <button className={"btn text-white mx-3"}>Supervisor</button>
                        <btn className={"btn text-white mx-3"}>Sales</btn>
                        <select className={"form-select bg-dark text-white border-0"} style={{width: "auto"}}>
                            <option value="DEFAULT" selected={true} style={{fontSize: "20px"}}>Cash Register</option>
                        </select>

                        <select className={"form-select mx-3 d-flex bg-dark text-white align-items-center border-0"}
                                style={{width: "auto"}}>
                            <option value="DEFAULT" selected={true}>
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
                    <div style={{position:"relative"}}>
                        <button className="btn text-white">
                            {icons.userIcon}
                            {icons.downTriangleIcon}
                        </button>
                        <div style={{position:"absolute", top:40, right:60, width:50, height:100, backgroundColor:""}}>
                            <h1 className="text-dark">das</h1>
                        </div>
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
                    <button className="btn text-white" style={{width: 150, height: 94}}>
                        {icons.settingsIcon}
                        <p className="text text-center text-white m-0">Settings</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default connect((state) => (state), dashboardDataModel)(Admin);