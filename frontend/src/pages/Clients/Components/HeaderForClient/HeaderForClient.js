import React, {useContext} from 'react';
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import "../../clients.css"
import LanguageContext from "../../../../Languages/Contex/Language";
import langData from "../../../../Languages/Language.json"

function HeaderForClient(props) {
    const {langIndex} = useContext(LanguageContext)
    return (
        <div id={"headerForClient"}>
            <p id={'titleForClient'}>{langData[langIndex]?.clientPage?.title}</p>
            <button id={"saveBtnForClient"} onClick={() => props.openModal()}>
                {langData[langIndex]?.clientPage?.addBtn}
            </button>
        </div>
    );
}

export default connect((state) => state, clientsAction)(HeaderForClient);
