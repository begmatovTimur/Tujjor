import React from 'react';

import "../../Clients/clients.css";
import JsxContentForAddClientModal
    from "../../Clients/Components/ModalForClient/JsxContentForClientModal/JsxContentForAddClientModal";
import {connect} from "react-redux";
import {clientsAction} from "../../Clients/Redux/Reducers/clientsReducer";
import UniversalModal from "../../universal/Modal/UniverModal";

function TelegramAddClients(props) {
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
            isOpen={true}
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
export default connect((state) => state, clientsAction)(TelegramAddClients);
