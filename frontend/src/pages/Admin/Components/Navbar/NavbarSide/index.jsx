import React from 'react';
import {icons} from "../../../../../Config/icons";
import {connect} from "react-redux";
import {dashboardDataModel} from "../../../../../Redux/reducers/dashboardDataReducer";
import NavbarDropDown from "./NavbarDropDown";

function Index(props) {
    const {dashboardData} = props.dashboardDataReducer
    return (
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

            <NavbarDropDown/>
        </div>
    );
}

export default connect(state => state, dashboardDataModel)(Index);