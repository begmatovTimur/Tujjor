import React, {useContext, useState} from 'react';
import Filter from "../../../../universal/Filter/Filter";
import {connect} from "react-redux";
import {clientsAction} from "../../../Redux/Reducers/clientsReducer";
import "../../../clients.css"
import LanguageContext from "../../../../../Languages/Contex/Language";
import langData from "../../../../../Languages/Language.json"

function HeaderForMap(props) {
    const {langIndex} = useContext(LanguageContext)
    const {clients} = props;
    const {teritory} = props;
    function generateOptionsOfCity() {
        const optionsCity = [];
        teritory?.teritories?.map((item) => {
            optionsCity.push({
                value: item.id,
                label: item.region,
            });
        });
        return optionsCity;
    }

    return (
        <div>
            <p id={'titleForMap'}>
                {langData[langIndex]?.clientPage?.clientOnTheMap?.title}
            </p>
            <hr/>
            <div className="d-flex pb-2 justify-content-between">
                <label className={'notificationForMap'} onClick={()=>props.changeAllLocation()}>
                    <span className="whitelight"></span>
                    <span>{langData[langIndex]?.clientPage?.clientOnTheMap?.allDataBtn}</span>
                    {
                        clients.clients.filter(item => item.active === true).length +
                        clients.clients.filter(item => item.active === false).length +
                        teritory.teritories.length
                    }
                </label>
                <div style={{display:"flex", gap:"40px"}}>
                    <label className={'notificationForMap'} onClick={()=>props.changeShowActiveClient()}>
                        <span className="greenlight"></span>
                        <span>{langData[langIndex]?.clientPage?.clientOnTheMap?.activeClientsBtn}</span>
                        {clients.clients.filter(item => item.active === true).length}
                    </label>
                    <label className={'notificationForMap'} onClick={()=>props.changeShowUnActiveClient()}>
                        <span className="redlight"></span>
                        <span>{langData[langIndex]?.clientPage?.clientOnTheMap?.unActiveClientsBtn}</span>
                        {clients.clients.filter(item => item.active === false).length}
                    </label>
                    <label className={'notificationForMap'} onClick={()=>props.changeShowTerritory()}>
                        <span className="bluelight"></span>
                        <span>{langData[langIndex]?.clientPage?.clientOnTheMap?.territoriesBtn}</span>
                        {teritory.teritories.length}
                    </label>
                </div>
                <Filter
                    search={[
                        {
                            name: "city",
                            multi: true,
                            options: generateOptionsOfCity(),
                            defaultValue: { value: "", label: "All" },
                            placeholder: "search by territory",
                            filterApi: "/client/pagination?page={page}&limit=All"
                        }
                    ]}
                    filterButton={true}
                />
            </div>
        </div>
    );
}
export default connect((state) => state, clientsAction)(HeaderForMap);
