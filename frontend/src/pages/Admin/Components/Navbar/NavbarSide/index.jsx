import React, {useContext} from 'react';
import {icons} from "Config/icons";
import {connect} from "react-redux";
import {dashboardDataModel} from "pages/Admin/Redux/Reducers/dashboardDataReducer";
import NavbarDropDown from "./NavbarDropDown";
import EngFlag from "../../../../../Languages/flags/USA.png"
import UzbFlag from "../../../../../Languages/flags/UZB.jpg"
import RusFlag from "../../../../../Languages/flags/RUS.jpg"
import LanguageContext from "../../../../../Languages/Contex/Language";
import "../../../Index.css"

function Index(props) {
    const {dashboardData} = props.dashboardDataReducer
    const {dashboardDataReducer} = props
    const langIndexForLanguages = localStorage.getItem("langIndex")

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

            <div onMouseEnter={()=>props.changeLangCard(true)} onMouseLeave={()=>props.changeLangCard(false)} id={'selectLangBox'}>
                <b>{langIndexForLanguages === "0" ?
                        <div>ENG  <img width={20} src={EngFlag} alt="#"/></div> :
                    langIndexForLanguages === "1" ?
                        <div>UZB  <img width={20} src={UzbFlag} alt="#"/></div> :
                    langIndexForLanguages === "2" ?
                        <div>RUS  <img width={20} src={RusFlag} alt="#"/></div> :
                        <div>ENG  <img width={20} src={EngFlag} alt="#"/></div>}</b>
                {
                    dashboardDataReducer.langCard ?
                        <div
                            onMouseEnter={()=>props.changeLangCard(true)}
                            onMouseLeave={()=>props.changeLangCard(false)}
                            id={'flagFather'}
                            style={{}}>
                            <span className={'custom_dashboard_button'} onClick={()=>changeLanguageIndex(0) & props.changeLangCard(false)} id={'langBtns'}>ENG  <img width={20} src={EngFlag} alt="#"/></span>
                            <span className={'custom_dashboard_button'} onClick={()=>changeLanguageIndex(1) & props.changeLangCard(false)} id={'langBtns'}>UZB  <img width={20} src={UzbFlag} alt="#"/></span>
                            <span className={'custom_dashboard_button'} onClick={()=>changeLanguageIndex(2) & props.changeLangCard(false)} id={'langBtns'}>RUS  <img width={20} src={RusFlag} alt="#"/></span>
                        </div>:""
                }
            </div>
            <NavbarDropDown/>
        </div>
    );
}

export default connect(state => state, dashboardDataModel)(Index);