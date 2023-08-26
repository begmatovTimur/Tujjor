import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import Table from "../../universal/Table/Table";
import UniversalModal from "../../universal/Modal/UniverModal";
import {customerCategoryActions} from "../../../Redux/reducers/customerCategoryReducer";
import "./CustomerCategory.css";
import Filter from "../../universal/Filter/Filter";

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
            <div className="d-flex flex-column align-items-start">
                <div className="title">Customer Category</div>
                <div
                    className="custom_add_btn"
                    style={{cursor: "pointer"}}
                    onClick={() => props.handleOpen()}
                >
                    <i style={{fontSize: "20px"}} className="fa fa-plus"></i>Add
                    Category
                </div>
            </div>
            <Filter
                search={[
                    {
                        name: "active",
                        multi: false,
                        options: optionsActive,
                        defaultValue: {value: "", label: "All"},
                        placeholder: "Active",
                        selfEmployer: true,
                    },
                ]}
            />

            <Table
                localStoragePath="customer_category"
                filterActive={true}
                columnOrderMode={true}
                dataProps={customerCategory.categories}
                changeSizeModeOptions={["All", 10, 20, 50, 100, 200]}
                pagination={true}
                paginationApi={
                    "/customer-category/pagination?page={page}&limit={limit}"
                }
                changeSizeMode={true}
                fileName={"categories"}
                excelPath={"/customer-category/excel"}
                columnsProps={columns}
            />

            <UniversalModal
                modalTitle={"Add Category"}
                isOpen={customerCategory.openModal}
                closeFunction={() => props.handleClose()}
                width={40}
                checkPage={getCheckPage()}
                functionforSaveBtn={() => props.saveCategory()}
                inpData={[
                    {
                        id: 1,
                        title: "Region",
                        value: customerCategory.region,
                        onChange: (e) => props.handleRegion(e.target.value),
                        type: "text",
                    },
                    {
                        id: 2,
                        title: "Code ",
                        value: customerCategory.code,
                        onChange: (e) => props.handleCode(e.target.value),
                        type: "number",
                    },
                    {
                        id: 3,
                        title: "Name ",
                        value: customerCategory.name,
                        onChange: (e) => props.handleName(e.target.value),
                        type: "text",
                    },
                    {
                        id: 4,
                        title: "Description ",
                        value: customerCategory.description,
                        onChange: (e) => props.handleDescription(e.target.value),
                        type: "text",
                    },
                    {
                        id: 5,
                        title: "Active ",
                        value: customerCategory.active,
                        onChange: (e) => props.handleActive(e.target.checked),
                        type: "checkbox",
                    },
                ]}
            />
        </div>
    );
}

export default connect(
    (state) => state,
    customerCategoryActions
)(CustomerCategory);
