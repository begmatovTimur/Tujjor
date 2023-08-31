import React from 'react';
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import logo from "../../../../../images/logo.png";
import {connect} from "react-redux";
import {clientsAction} from "../../../Redux/Reducers/clientsReducer";
import "../../../clients.css"

function MapForMap(props) {
    const {clients} = props;
    const {teritory} = props;
    console.log(clients.clients)
    return (<YMaps
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
                        clients.showActiveClient?
                            <Placemark
                                properties={{
                                    // balloonContent: address.name,
                                    // hintContent: 'Bu yerda markaziy nuqta',
                                    // iconContent: "Salom",
                                    iconCaption: address.clientName,
                                    balloonContent: `${new DOMParser().parseFromString('<div style="width: 150px; display: flex; flex-direction: column; gap: 3px">' +
                                        '<div style="color: white; background:red; border-radius: 7px; padding: 2px 5px">Name: ' + address.clientName + '</div>' +
                                        '<div style="color: white; background:green; border-radius: 7px; padding: 2px 5px">Region: ' + address.region + '</div>' +
                                        '<div style="color: white; background:blue; border-radius: 7px; padding: 2px 5px">Phone: ' + address.telephone + '</div>' +
                                        '</div>', 'text/html').body.firstChild.outerHTML}`,
                                }}
                                options={{
                                    // iconLayout: 'default#image',
                                    iconColor: "green",
                                    iconImageHref: logo,
                                }}
                                key={index}
                                geometry={[address.latitude, address.longitude]}
                            />:""
                    ) : (
                        clients.showUnActiveClient?
                            <Placemark
                                properties={{
                                    // balloonContent: address.name,
                                    // hintContent: 'Bu yerda markaziy nuqta',
                                    iconCaption: address.clientName,
                                    balloonContent: `phone:${address.telephone} ${new DOMParser().parseFromString('<div style="background:red;">He</div>', 'text/html').body.firstChild.outerHTML}`,
                                }}
                                options={{
                                    // iconLayout: 'default#image',
                                    iconColor: "red",
                                    iconImageHref: logo,
                                }}
                                key={index}
                                geometry={[address.latitude, address.longitude]}
                            />:""
                    );
                })}
                {teritory?.teritories?.map((item, index) => {
                    return (
                        clients.showTerritory?
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
                            />:""
                    );
                })}
            </Map>
        </YMaps>
    );
}
export default connect((state) => state, clientsAction)(MapForMap);
