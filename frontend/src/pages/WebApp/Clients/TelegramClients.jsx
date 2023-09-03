import React, {useEffect} from 'react';
import apiCall from "../../../Config/apiCall";
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "../../Clients/Redux/Reducers/clientsReducer";
import Table from "../../universal/Table/Table";
import ModalForClient from "../../Clients/Components/ModalForClient/ModalForClient";
import {teritoryAction} from "../../Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer";
import {
    customerCategoryActions
} from "../../Settings/ChildComponents/CustomerCategory/Redux/Reducers/customerCategoryReducer";

function TelegramClients(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        props.getClients();
    }, [props]);
    //
    useEffect(() => {
        dispatch(teritoryAction.getCities());
        dispatch(customerCategoryActions.getCategory());
    }, [dispatch]);


    const columns = [
        {
            id: 0,
            title: "№",
            key: "index",
            type: "index",
            show: true,
        },
        {
            id: 1,
            title: "Client name",
            key: "clientName",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        props.editeClients(item);
                    }}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ),
        },
    ];


    return (
        <div>
            <Table
                localStoragePath="clients"
                pagination={true}
                changeSizeMode={true}
                paginationApi={"/client/pagination?page={page}&limit={limit}"}
                dataProps={props.clients.clients}
                columnOrderMode={true}
                changeSizeModeOptions={["All", 5, 20, 50, 100, 200]}
                columnsProps={columns}
                fileName={"clients"}
                excelPath={"/excel?component=clients&"}
            />
            <ModalForClient/>
        </div>
    );
}

export default connect((state) => state, clientsAction)(TelegramClients);