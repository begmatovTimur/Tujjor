import React from 'react';
import {icons} from "../../../../../Config/icons";

function Index(props) {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "47%"}}>
            <div style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%"
            }}>
                <button style={{fontSize: "14px"}}
                        className={"btn text-white custom_dashboard_button"}>Supervisor
                </button>
                <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Sales
                </button>
                <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Cash
                    Register
                </button>
                <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>Gps
                </button>
                <button style={{fontSize: "14px"}}
                        className="custom_btn_success text-white d-flex align-items-center h-100 ms-3">
                    {icons.onlineHelpIcon}
                    Online Help
                </button>
            </div>
        </div>
    );
}

export default Index;