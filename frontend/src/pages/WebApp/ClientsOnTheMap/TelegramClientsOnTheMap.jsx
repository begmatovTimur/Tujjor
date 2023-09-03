import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "../../Clients/Redux/Reducers/clientsReducer";
import Loading from "../../Loading/Loading";
import HeaderForMap from "../../Clients/Components/ClientOnTheMap/HeaderForMap/HeaderForMap";
import MapForMap from "../../Clients/Components/ClientOnTheMap/MapForClientOnTheMap/MapForMap";
import {teritoryAction} from "../../Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer";
// import {clientsAction} from "../../Redux/Reducers/clientsReducer";
// import {teritoryAction} from "../../../Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer";
// import HeaderForMap from "./HeaderForMap/HeaderForMap";
// import MapForMap from "./MapForClientOnTheMap/MapForMap";
// import Loading from "../../../Loading/Loading";

function TelegramClientsOnTheMap(props) {
    const dispatch = useDispatch();

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
        <div style={{height:"100vh"}}>
            <div id={"smallFatherForMap"} style={{display: clients.isLoading ? "flex" : "block"}}>
                {clients.isLoading ? (
                    <div id={'forLoading'}>
                        <Loading />
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

export default connect((state) => state, clientsAction)(TelegramClientsOnTheMap);
