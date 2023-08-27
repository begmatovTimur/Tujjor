import React, {useEffect} from "react";
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "../../Redux/reducers/clientsReducer";
import logo from "../../images/logo.png";
import {teritoryAction} from "../../Redux/reducers/teritoryReducer";
import Filter from "../universal/Filter/Filter";

function ClientsOnTheMap(props) {
    const dispatch = useDispatch();

    const {clients} = props;
    const {teritory} = props;
    useEffect(() => {
        dispatch(teritoryAction.getTeritory());
        props.changeLoadingActive(true);
        localStorage.setItem("sidebar_button", "5")
        setTimeout(() => {
            props.changeLoadingActive(false);
        }, 1000);
        props.getClients();
    }, []);
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
        <div
            style={{
                width: "100%",
                backgroundColor: "#dae2e3",
                padding: "20px 20px",
            }}
        >
            <div
                style={{
                    alignItems: "center",
                    display: clients.isLoading ? "flex" : "block",
                    justifyContent: "center",
                    overflow: "hidden",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                }}
            >
                {clients.isLoading ? (
                    <div
                        className="bg-white d-flex justify-content-center align-items-center gap-2 p-2"
                        style={{height: "50vh"}}
                    >
                        <div>
                            <div id="loading-bar-spinner" className="spinner">
                                <div className="spinner-icon"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <p style={{fontSize: "30px", textAlign: "start"}}>
                            Clients On The Map
                        </p>
                        <hr/>
                        <div className="d-flex gap-5 p-3 justify-content-center">
                            <label className="d-flex gap-2 align-items-center">
                                <span className="greenlight"></span>
                                <span>Active Clients:</span>
                                {clients.clients.filter(item => item.active === true).length}
                            </label>
                            <label className="d-flex gap-2 align-items-center">
                                <span className="redlight"></span>
                                <span>No Active Clients:</span>
                                {clients.clients.filter(item => item.active === false).length}
                            </label>
                            <label className="d-flex gap-2 align-items-center">
                                <span className="bluelight"></span>
                                <span>Territory:</span>
                                {teritory.teritories.length}
                            </label>
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
                        <YMaps
                            query={{
                                apikey: "e24090ad-351e-4321-8071-40c04c55f144\n",
                                lang: "en_US",
                                coordorder: "latlong",
                                load: "package.full",
                            }}
                        >
                            <Map
                                width={"100%"}
                                height={"70%"}
                                defaultState={{
                                    center: [39.7756, 64.4253],
                                    zoom: 10,
                                }}
                                modules={["templateLayoutFactory"]}
                            >
                                <ZoomControl options={{float: "right"}}/>
                                {clients?.clients?.map((address, index) => {
                                    return address.active ? (
                                        <Placemark
                                            properties={{
                                                // balloonContent: address.name,
                                                // hintContent: 'Bu yerda markaziy nuqta',
                                                // iconContent: "Salom",
                                                iconCaption: address.name,
                                            }}
                                            options={{
                                                iconColor: "green",
                                                iconImageHref: logo,
                                            }}
                                            key={index}
                                            geometry={[address.latitude, address.longitude]}
                                        />
                                    ) : (
                                        <Placemark
                                            properties={{
                                                // balloonContent: address.name,
                                                // hintContent: 'Bu yerda markaziy nuqta',
                                                iconCaption: address.name,
                                            }}
                                            options={{
                                                iconColor: "red",
                                                iconImageHref: logo,
                                            }}
                                            key={index}
                                            geometry={[address.latitude, address.longitude]}
                                        />
                                    );
                                })}
                                {teritory?.teritories?.map((item, index) => {
                                    return (
                                        <Placemark
                                            properties={{
                                                // balloonContent: item.name,
                                                // hintContent: 'Bu yerda markaziy nuqta',
                                                // iconContent: "Salom",
                                                iconCaption: item.name,
                                            }}
                                            options={{iconColor: "blue", iconImageHref: logo}}
                                            key={index}
                                            geometry={[item.latitude, item.longitude]}
                                        />
                                    );
                                })}
                            </Map>
                        </YMaps>
                    </>
                )}
            </div>
        </div>
    );
}

export default connect((state) => state, clientsAction)(ClientsOnTheMap);
