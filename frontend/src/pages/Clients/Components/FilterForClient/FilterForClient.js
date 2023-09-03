import React, {useState} from 'react';
import Filter from "../../../universal/Filter/Filter";
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";

function FilterForClient(props) {
    const [optionsActive] = useState([
        { value: "", label: "All" },
        { value: "true", label: "Active" },
        { value: "false", label: "Inactive" },
    ]);

    const [optionsAllWeeks] = useState([
        { value: "1", label: "All Weeks" },
        { value: "2", label: "Odd Weeks" },
        { value: "3", label: "Even Weeks" },
    ]);

    const [optionsTin] = useState([
        { value: "", label: "Tin" },
        { value: "true", label: "With Tin" },
        { value: "false", label: "Without Tin" },
    ]);
    function generateOptionsOfCity() {
        const optionsCity = [];
        props.teritory.regions.map((item) => {
            optionsCity.push({
                value: item.id,
                label: item.region,
            });
        });
        return optionsCity;
    }

    function generateOptionsOfCategory() {
        const optionsCategory = [];
        props.customerCategory.categories.map((item) => {
            optionsCategory.push({
                label: item.name,
                value: item.id,
            });
        });
        return optionsCategory;
    }


    return (
        <Filter
            search={[
                {
                    name: "active",
                    multi: false,
                    options: optionsActive,
                    defaultValue: { value: "", label: "All" },
                    placeholder: "Active",
                    selfEmployer: false,
                },
                {
                    name: "city",
                    multi: true,
                    options: generateOptionsOfCity(),
                    defaultValue: { value: "", label: "All" },
                    placeholder: "City",
                    selfEmployer: false,
                },
                {
                    name: "customerCategories",
                    multi: true,
                    options: generateOptionsOfCategory(),
                    defaultValue: { value: "", label: "All" },
                    placeholder: "Customer categories",
                    selfEmployer: false,
                },
                {
                    name: "day",
                    multi: false,
                    defaultValue: { value: "", label: "All" },
                    placeholder: "day",
                    selfEmployer: false,
                },
                {
                    name: "allWeeks",
                    multi: false,
                    options: optionsAllWeeks,
                    defaultValue: { value: "", label: "All" },
                    placeholder: "All weeks",
                    selfEmployer: false,
                },
                {
                    name: "tin",
                    multi: false,
                    options: optionsTin,
                    defaultValue: { value: "", label: "All" },
                    placeholder: "Tin",
                    selfEmployer: false,
                },
                {
                    name: "location",
                    multi: false,
                    defaultValue: { value: "", label: "All" },
                    placeholder: "Location",
                    selfEmployer: false,
                },
                {
                    name: "withInventory",
                    multi: false,
                    defaultValue: { value: "", label: "All" },
                    placeholder: "With Inventory",
                    selfEmployer: false,
                },
            ]}
            filterButton={true}
        />
    );
}
export default connect((state) => state, clientsAction)(FilterForClient);
