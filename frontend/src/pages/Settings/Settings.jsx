import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {settingsActions} from "./Redux/Reducers/settingsReducer";
import "./Settings.css";
import LeftBar from "./LeftBar/LeftBar";

const Settings = () => {
    return (
        <div className="settings">
            <div className="content">
               <LeftBar/>
                <div className="right">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Settings;
