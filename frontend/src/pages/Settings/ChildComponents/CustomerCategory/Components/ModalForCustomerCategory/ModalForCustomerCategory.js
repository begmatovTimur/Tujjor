import React from 'react';
import UniversalModal from "../../../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {customerCategoryActions} from "../../Redux/Reducers/customerCategoryReducer";
import "../../CustomerCategory.css"

function ModalForCustomerCategory(props) {
    const {customerCategory} = props;
    function getCheckPage() {
        if (customerCategory.region !== "" || customerCategory.code !== "" || customerCategory.name !== "" || customerCategory.active !== false
            || customerCategory.description !== "") return true;
        return false;
    }
    return (
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
    );
}
export default connect(
    (state) => state,
    customerCategoryActions
)(ModalForCustomerCategory);