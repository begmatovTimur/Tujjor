import React, {useEffect, useState} from 'react';
import logoImg from "../Media/Images/shiftImg1.png"
import "./index.css"
import apiCall from "../../../apiCall";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import App from "../chart/index"
import Group from "../../groupPage/index"
import Mentor from "../../mentorPage/index"
import Student from "../../studentPage/index"
import Chart from "../chart"
import {connect} from "react-redux";
import {userModel} from "../../../Redux/pages/AdminUser/reducers/userReducer";
function Index(props) {
    const [selectedBtn, setSelectedBtn] = useState("")
    const {userReducer} = props
    useEffect(() => {
        props.getMe()
        if (localStorage.getItem("selectedBtn") !== null) {
            setSelectedBtn(localStorage.getItem("selectedBtn"))
        }
        // refreshToken();
    }, [])

    function handleClick(btn) {
        if (btn !== "") {
            setSelectedBtn(btn)
        }else {
            setSelectedBtn("Main")
        }
        localStorage.setItem("selectedBtn", btn);
    }
    return (
        <div className={"parent_box"}>
            <div className={"header"}>
                <div style={{width: "200px"}} className={"logo"}>
                    <img width={100} height={80} src={logoImg} alt=""/>
                </div>

                <div className={"search"}>
                    <input placeholder={"search"} type="text" className={"form-control w-50"}/>
                    <button className={"btn btn-primary"}><i style={{fontSize: "15px"}}
                                                             className="fa-solid fa-magnifying-glass"></i></button>
                </div>

                <div className={"content"}>
                    <i style={{fontSize: "25px"}} className="fa-solid fa-bell"></i>
                    <h3>{userReducer.currentUser.firstName} {userReducer.currentUser.lastName}</h3>
                </div>
            </div>
            <div className={"parent"}>
                <div className={"left-bar"}>
                    <button style={{fontSize: "20px"}} onClick={() => handleClick("Main")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "Main" ? " bg-dark text-white" : "")}>
                        <i className="fa-sharp fa-solid fa-house"></i> Main
                    </button>
                    <button style={{fontSize: "20px"}} onClick={() => handleClick("O'qituvchilar")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "O'qituvchilar" ? " bg-dark text-white" : "")}>
                        <i className="fa-solid fa-chalkboard-user"></i> O'qituvchilar
                    </button>
                    <button style={{fontSize: "20px"}} onClick={() => handleClick("Guruhlar")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "Guruhlar" ? " bg-dark text-white" : "")}>
                        <i className="fa-solid fa-layer-group"></i> Guruhlar
                    </button>
                    <button style={{fontSize: "20px"}} onClick={() => handleClick("Talabalar")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "Talabalar" ? " bg-dark text-white" : "")}>
                        <i className="fas fa-user-group"></i> Talabalar
                    </button>
                    <button style={{fontSize: "20px"}} onClick={() => handleClick("Moliya")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "Moliya" ? " bg-dark text-white" : "")}>
                        <i className="fa-solid fa-coins"></i> Moliya
                    </button>
                    <button style={{fontSize: "20px"}} onClick={() => handleClick("Hisobotlar")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "Hisobotlar" ? " bg-dark text-white" : "")}>
                        <i className="fa-sharp fa-solid fa-circle-info"></i> Hisobotlar
                    </button>
                    <button style={{fontSize: "20px"}} onClick={() => handleClick("Sozlamalar")}
                            className={"btn-outline-dark btn w-100 my-2" + (selectedBtn === "Sozlamalar" ? " bg-dark text-white" : "")}>
                        <i className="fa-sharp fa-solid fa-gear"></i> Sozlamalar
                    </button>
                </div>
                <div className={"right-bar"}>
                    {
                        selectedBtn === "Talabalar" ?
                            <Student/>
                            : selectedBtn === "O'qituvchilar" ?
                            <Mentor/>
                            : selectedBtn==="Guruhlar" ?
                                    <Group/>
                                        : selectedBtn==="Main"?
                                <Chart/>:""
                    }
                </div>
            </div>
        </div>
    );
}

export default  connect(state=>state,userModel)(Index);