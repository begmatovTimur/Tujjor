import React, {useContext} from 'react';
import {icons} from "../../../../../Config/icons";
import LanguageContext from "../../../../../Languages/Contex/Language";
import langData from "../../../../../Languages/Language.json"

function Index(props) {
    const {langIndex} = useContext(LanguageContext)
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "50%"}}>
            <div style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%"
            }}>
                <button style={{fontSize: "14px"}}
                        className={"btn text-white custom_dashboard_button"}>{langData[langIndex]?.adminPage?.li1}
                </button>
                <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>{langData[langIndex]?.adminPage?.li2}
                </button>
                <button style={{fontSize: "14px", width:"30%"}} className={"btn text-white custom_dashboard_button"}>{langData[langIndex]?.adminPage?.li3}
                </button>
                <button style={{fontSize: "14px"}} className={"btn text-white custom_dashboard_button"}>{langData[langIndex]?.adminPage?.li4}
                </button>
                <button style={{fontSize: "14px"}}
                        className="custom_btn_success text-white d-flex align-items-center h-100 ms-3">
                    {icons.onlineHelpIcon}
                    {langData[langIndex]?.adminPage?.onlineHelp}
                    
                </button>
            </div>
        </div>
    );
}

export default Index;