import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import Table from '../../universal/Table/Table'
import UniversalModal from "../../universal/Modal/UniverModal";
import {companyProfileActions} from "../../../Redux/reducers/companyProfile";
import "./CustomerCategory.css";
import Filter from "../../universal/Filter/Filter";
import {tableActions} from "../../../Redux/reducers/tableReducer";
import LoadingBackdrop from "../../universal/Loading/loading";

function Company(props) {

    const dispatch = useDispatch()


    const {companyProfile} = props
    useEffect(() => {
        props.getCompanies();
    }, [])


    function handleMapClick(event) {
        const coords = event.get("coords");
        const latitude = coords[0];
        const longitude = coords[1];
        props.handleTemplate([longitude, latitude]);
        props.handleMapState({center: [latitude, longitude], zoom: 10});
    }


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
            key: "companyName",
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
            title: "Phone",
            key: "supportPhone",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "Email @",
            key: "email",
            type: "text",
            show: true,
        }
    ];



    return (
        <div style={{width: "100%"}}>
            <Table
                excelWithoutSearch={true}
                localStoragePath="companies"
                columnOrderMode={false}
                dataProps={companyProfile.companies}
                changeSizeModeOptions={[10, 20, 50, 100, 200]}
                pagination={false}
                changeSizeMode={false}
                fileName={"companies"}
                excelPath={"/company/excel"}
                columnsProps={columns}
            />



        </div>
    );
}

export default connect((state) => state, companyProfileActions )(Company);