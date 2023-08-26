import React from 'react';
import Logo from "../../../../../images/logo.png";
import {useNavigate} from "react-router-dom";

function Index(props) {
    const navigate = useNavigate();

    return (
        <div
            className="py-1 px-2 d-flex justify-content-center align-items-center"
            style={{
                width: "9.9%",
                height: "100%",
                backgroundColor: "#405065",
            }}
        >
            <img src={Logo} alt="logo" width={"38%"} height={"80%"}
                 style={{marginLeft: "-7%", objectFit: "contain"}} onClick={() => navigate("/admin")}/>
        </div>
    );
}

export default Index;