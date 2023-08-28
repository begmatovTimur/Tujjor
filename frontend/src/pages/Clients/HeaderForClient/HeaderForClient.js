import React from 'react';
import {connect} from "react-redux";
import {clientsAction} from "../../../Redux/reducers/clientsReducer";
import "../clients.css"

function HeaderForClient(props) {
    return (
        <div id={"headerForClient"}>
            <p id={'titleForClient'}>Clients</p>
            <button id={"saveBtnForClient"} onClick={() => props.openModal()}>
                + Add Client
            </button>
        </div>
    );
}

export default connect((state) => state, clientsAction)(HeaderForClient);
