import React from 'react';
import JsxContentForAddClientModal from "./JsxContentForClientModal/JsxContentForAddClientModal";
import UniversalModal from "../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import "../../clients.css";

function ModalForClient(props) {
    const {clients} = props;
    function checkInpValue() {
        if (clients.teritoryId !== ""
            || clients.name !== ""
            || clients.address !== ""
            || clients.telephone !== ""
            || clients.tin !== ""
            || clients.active !== false
            || clients.categoryId !== ""
            || clients.companyName !== ""
            || clients.longitute !== ""
            || clients.latitute !== ""){
            return true;
        }else {
            return false
        }
    }
    return (
        <UniversalModal
            checkPage={checkInpValue()}
            modalTitle={clients.editeClient === "" ? "Add Client" : "Edite Client"}
            isOpen={clients.openModal}
            closeFunction={() => props.closeModal()}
            width={70}
            functionforSaveBtn={() => props.saveClients()}
            height={200}
            JsxData={
                <JsxContentForAddClientModal/>
            }
        />
    );
}
export default connect((state) => state, clientsAction)(ModalForClient);
