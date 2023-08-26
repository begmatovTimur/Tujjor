import React from 'react';
import {icons} from "../../../../Config/icons";
import {useNavigate} from "react-router-dom";
import Logo from "./Logo";
import Menus from "./Menus";
import NavbarSide from "./NavbarSide";

function Index(props) {
    const navigate = useNavigate();

    return (
        <div style={{height: "7%", backgroundColor: "#405058"}} className="d-flex header">
            <Logo/>
            <Menus/>
           <NavbarSide/>
        </div>
    );
}

export default Index;