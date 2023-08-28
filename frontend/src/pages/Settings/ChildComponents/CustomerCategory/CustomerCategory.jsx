import React, {useEffect} from "react";
import {connect} from "react-redux";
import {customerCategoryActions} from "./Redux/Reducers/customerCategoryReducer";
import "./CustomerCategory.css";
import HeaderForCustomerCategory from "./Components/HeaderForCustomerCategory/HeaderForCustomerCategory";
import FilterForCustomerCategory from "./Components/FilterForCustomerCategory/FilterForCustomerCategory";
import TableForCustomerCategory from "./Components/TableForCustomerCategory/TableForCustomerCategory";
import ModalForCustomerCategory from "./Components/ModalForCustomerCategory/ModalForCustomerCategory";

function CustomerCategory(props) {

    useEffect(() => {
        props.getCategory();
    }, [])

    return (
        <div className={'w-100'}>
            <HeaderForCustomerCategory/>
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
