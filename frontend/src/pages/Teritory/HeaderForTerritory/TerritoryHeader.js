import React from 'react';
import "../Teritory.css"
import {connect} from "react-redux";
import {teritoryAction} from "../../../Redux/reducers/teritoryReducer";

function TerritoryHeader(props) {
    return (
        <div id={"topChildForTerritory"}>
            <b className="title">Territory</b>
            <div className="custom_add_btn" onClick={() => props.handleOpen()}>
                <i id={"titleForTerritory"} className="fa fa-plus"></i>Add
                Territory
            </div>
        </div>
    );
}
export default connect((state) => state, teritoryAction)(TerritoryHeader);