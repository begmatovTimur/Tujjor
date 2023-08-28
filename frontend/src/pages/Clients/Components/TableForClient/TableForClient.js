import React from 'react';
import Table from "../../../universal/Table/Table";
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import "../../clients.css";

function TableForClient(props) {
    const { clients } = props;

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
            title: "Company name",
            key: "companyName",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Telephone",
            key: "telephone",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "Territory",
            key: "region",
            type: "text",
            show: true,
        },
        {
            id: 5,
            title: "Address",
            key: "address",
            type: "text",
            show: true,
        },
        {
            id: 6,
            title: "Category",
            key: "categoryName",
            type: "text",
            show: true,
        },
        {
            id: 7,
            title: "Activity",
            key: "active",
            type: "boolean",
            show: true,
        },
        {
            id: 8,
            title: "Registration Date",
            key: "registrationDate",
            type: "text",
            show: true,
        },
        {
            id: 9,
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
        <Table
            localStoragePath="clients"
            pagination={true}
            changeSizeMode={true}
            paginationApi={"/client/pagination?page={page}&limit={limit}"}
            dataProps={clients.clients}
            columnOrderMode={true}
            changeSizeModeOptions={["All", 5, 20, 50, 100, 200]}
            columnsProps={columns}
            fileName={"clients"}
            excelPath={"/excel?component=clients&"}
        />
    );
}
export default connect((state) => state, clientsAction)(TableForClient);
