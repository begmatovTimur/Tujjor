import React, {useContext} from 'react';
import {icons} from "Config/icons";
import {connect} from "react-redux";
import {dashboardDataModel} from "pages/Admin/Redux/Reducers/dashboardDataReducer";
import NavbarDropDown from "./NavbarDropDown";
import LanguageContext from "../../../../../Languages/Contex/Language";
// import USA from "../../../../../Language/countryFlags/USA.png"
// import UZB from "../../../../../Language/countryFlags/UZB.png"
// import RUS from "../../../../../Language/countryFlags/RUS.png"

function Index(props) {
    const {dashboardData} = props.dashboardDataReducer
    const {changeLanguageIndex} = useContext(LanguageContext)
    return (
        <div style={{width: "46%", marginLeft: "10%", backgroundColor: "#405058"}}
             className={"ps-2 d-flex align-items-center"}>
            <button className="custom_calendar">
                <i className="fa fa-calendar pull-left"></i>
                <span>{dashboardData.currentDate}</span>
            </button>
            <h3 className="phone_number">
                {dashboardData.currentSuperVisorPhoneNumber}
            </h3>
            <button className="btn text-white">{icons.notificationIcon}</button>

            <select style={{width:"17%", backgroundColor:"#4b5d67", color:"white", border:"2px solid white"}} onChange={(e)=>changeLanguageIndex(e.target.value)} value={localStorage.getItem("langIndex")} className={"form-select"}>
                <option value="0">ENG</option>
                <option value="1">UZB ️</option>
                <option value="2">RUS ️</option>
            </select>
            <NavbarDropDown/>
        </div>
    );
}

export default connect(state => state, dashboardDataModel)(Index);