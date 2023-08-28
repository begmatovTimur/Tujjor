import React from 'react';
import Filter from "../../../../universal/Filter/Filter";
import {connect} from "react-redux";
import {clientsAction} from "../../../Redux/Reducers/clientsReducer";
import "../../../clients.css"

function HeaderForMap(props) {
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
                Clients On The Map
            </p>
            <hr/>
            <div className="d-flex pb-2 justify-content-between">
                <label className={'notificationForMap'} onClick={()=>props.changeAllLocation()}>
                    <span className="whitelight"></span>
                    <span>All Data:</span>
                    {
                        clients.clients.filter(item => item.active === true).length +
                        clients.clients.filter(item => item.active === false).length +
                        teritory.teritories.length
                    }
                </label>
                <div style={{display:"flex", gap:"40px"}}>
                    <label className={'notificationForMap'} onClick={()=>props.changeShowActiveClient()}>
                        <span className="greenlight"></span>
                        <span>Active Clients:</span>
                        {clients.clients.filter(item => item.active === true).length}
                    </label>
                    <label className={'notificationForMap'} onClick={()=>props.changeShowUnActiveClient()}>
                        <span className="redlight"></span>
                        <span>No Active Clients:</span>
                        {clients.clients.filter(item => item.active === false).length}
                    </label>
                    <label className={'notificationForMap'} onClick={()=>props.changeShowTerritory()}>
                        <span className="bluelight"></span>
                        <span>Territory:</span>
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
                            selfEmployer: false,
                        }
                    ]}
                    paginationApi={"/client/pagination"}
                    filterButton={true}
                />
            </div>
        </div>
    );
}
export default connect((state) => state, clientsAction)(HeaderForMap);
