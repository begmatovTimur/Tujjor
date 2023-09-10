import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import HeaderForMap from "./HeaderForMap/HeaderForMap";
import MapForMap from "./MapForClientOnTheMap/MapForMap";

import {useParams} from "react-router-dom";
import {clientsAction} from "../../Clients/Redux/Reducers/clientsReducer";
import {teritoryAction} from "../../Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer";
import Loading from "../../Loading/Loading";

function ClientsOnTheMapTelegram(props) {
    const dispatch = useDispatch();
    const {token} = useParams()
    useEffect(() => {
        localStorage.setItem("access_token", token)
    }, [token]);
    const {clients} = props;
    useEffect(() => {
        dispatch(teritoryAction.getTeritory());
        props.changeLoadingActive(true);
        localStorage.setItem("sidebar_button", "5")
        setTimeout(() => {
            props.changeLoadingActive(false);
        }, 1000);
        props.getClients();
    }, []);

    return (
        <div id={"bigFatherForMap"}>
            <div id={"smallFatherForMap"} style={{display: clients.isLoading ? "flex" : "block"}}>
                {clients.isLoading ? (
                    <div id={'forLoading'}>
                        <Loading/>
                    </div>
                ) : (
                    <>
                        <HeaderForMap/>
                        <MapForMap/>
                    </>
                )}
            </div>
        </div>
    );
}

export default connect((state) => state, clientsAction)(ClientsOnTheMapTelegram);
