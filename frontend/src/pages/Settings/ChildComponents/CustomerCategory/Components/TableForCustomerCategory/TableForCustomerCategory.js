import React from 'react';
import Table from "../../../../../universal/Table/Table";
import {connect} from "react-redux";
import {customerCategoryActions} from "../../Redux/Reducers/customerCategoryReducer";
import "../../CustomerCategory.css"

function TableForCustomerCategory(props) {
    const {customerCategory} = props;

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
                    <i className="fa fa-edit"></i>
                </button>
            ),
        },
    ];
    return (
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
            excelPath={"/excel?component=customer-category&"}
            columnsProps={columns}
        />
    );
}
export default connect(
    (state) => state,
    customerCategoryActions
)(TableForCustomerCategory);