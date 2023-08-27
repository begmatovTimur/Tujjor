import React, {useRef, useState} from 'react';
import {icons} from "../../../../../../Config/icons";
import {useNavigate} from "react-router-dom";
import {dashboardDataModel} from "../../../../../../Redux/reducers/dashboardDataReducer";
import {connect} from "react-redux";

function Index(props) {
    const {userBox,setUserBox} = props;
    const navigate = useNavigate()
    // const userBoxRef = useRef(null);

    const handleUserDropDown = (status) => {
        setUserBox(status);
    };
    function logOut() {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div style={{position: "relative"}}>
            <button
                onMouseLeave={() => handleUserDropDown(false)}
                onMouseOverCapture={() => handleUserDropDown(true)}
                className="btn text-white"
                // ref={userBoxRef}
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
                    <button className="custom_userbox_button d-flex justify-content-between align-items-center"
                            onClick={() => navigate("/payment")}>
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
    );
}

export default connect(state=>state.dashboardDataReducer,dashboardDataModel)(Index);