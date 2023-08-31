import React from 'react';
import {icons} from "../../../../../../Config/icons";
import {useNavigate} from "react-router-dom";
import {dashboardDataModel} from "../../../../Redux/Reducers/dashboardDataReducer";
import {connect} from "react-redux";
import "../../../../Index.css"

function Index(props) {
    const navigate = useNavigate()

    function logOut() {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div style={{position: "relative"}}>
            <button
                onMouseEnter={()=>props.changeUserDropDown(true)}
                onMouseLeave={()=>props.changeUserDropDown(false)}
                className="btn text-white"
                // ref={userBoxRef}
            >
                {icons.userIcon}
                {icons.downTriangleIcon}
            </button>

            {props.dropDownBox &&
                <div
                    onMouseEnter={()=>props.changeUserDropDown(true)}
                    onMouseLeave={()=>props.changeUserDropDown(false)}

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
            }
        </div>
    );
}

export default connect(state=>state.dashboardDataReducer,dashboardDataModel)(Index);