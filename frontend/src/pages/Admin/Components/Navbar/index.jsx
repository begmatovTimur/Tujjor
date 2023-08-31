import React from 'react';
import Logo from "./Logo";
import Menus from "./Menus";
import NavbarSide from "./NavbarSide";

function Index(props) {
    return (
        <div style={{height: "7%", backgroundColor: "#405058"}} className="d-flex header">
            <Logo/>
            <div style={{display:"flex", width:"100%", justifyContent:"space-between", paddingRight:"5%"}}>
                <Menus/>
                <NavbarSide/>
            </div>
        </div>
    );
}

export default Index;