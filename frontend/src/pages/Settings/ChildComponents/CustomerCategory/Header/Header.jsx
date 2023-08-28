import React from 'react';
import {connect} from "react-redux";
import {customerCategoryActions} from "../Redux/Reducers/customerCategoryReducer";
import "./header.css"

function Header(props) {
    return (
        <div className="d-flex flex-column align-items-start">
            <div className="title">Customer Category</div>
            <div
                className="custom_add_btn"
                onClick={() => props.handleOpen()}
            >
                <i  style={{}} className="fa fa-plus btn-text"></i>Add
                Category
            </div>
        </div>
    );
}

export default connect((state) => state, customerCategoryActions)(Header);