import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Table from "../../../universal/Table/Table";
import UniversalModal from "../../../universal/Modal/UniverModal";
import {customerCategoryActions} from "./Redux/Reducers/customerCategoryReducer";
import "./CustomerCategory.css";
import Filter from "../../../universal/Filter/Filter";
import Header from "./Header/Header";
import FilterForCustomerCategory from "./Components/FilterForCustomerCategory/FilterForCustomerCategory";
import TableForCustomerCategory from "./Components/TableForCustomerCategory/TableForCustomerCategory";
import ModalForCustomerCategory from "./Components/ModalForCustomerCategory/ModalForCustomerCategory";

function CustomerCategory(props) {
    const {customerCategory} = props;

    useEffect(() => {
        props.getCategory();
    }, [])

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
            title: "Name",
            key: "name",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Region",
            key: "region",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Code",
            key: "code",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        props.editeCategory(item);
                    }}
                >
                    <i class="fa fa-edit"></i>
                </button>
            ),
        },
    ];
    const [optionsActive] = useState([
        {value: "", label: "All"},
        {value: "true", label: "Active"},
        {value: "false", label: "Inactive"},
    ]);

    function getCheckPage() {
        if (customerCategory.region !== "" || customerCategory.code !== "" || customerCategory.name !== "" || customerCategory.active !== false
            || customerCategory.description !== "") return true;
        return false;
    }

    return (
        <div style={{width: "100%"}}>
           <Header/>
            <FilterForCustomerCategory/>
            <TableForCustomerCategory/>
            <ModalForCustomerCategory/>
        </div>
    );
}

export default connect(
    (state) => state,
    customerCategoryActions
)(CustomerCategory);
