import React from 'react';
import Filter from "../../universal/Filter/Filter";
import {connect} from "react-redux";
import {teritoryAction} from "../../../Redux/reducers/teritoryReducer";

function TerritoryFilter(props) {
    const { teritory } = props;
    return (
        <Filter search={[
            {
                name: "active",
                multi: false,
                options: teritory.optionsActive,
                defaultValue: { value: "", label: "All" },
                placeholder: "Active",
                selfEmployer: true,
            },
        ]}/>
    );
}
export default connect((state) => state, teritoryAction)(TerritoryFilter);