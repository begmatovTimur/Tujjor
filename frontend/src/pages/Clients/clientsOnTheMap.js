import React, {useEffect} from 'react';
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "../../Redux/reducers/clientsReducer";
import logo from '../../images/logo.png'

function ClientsOnTheMap(props) {

    const {clients} = props
    useEffect(() => {
        props.changeLoadingActive(true)
        setTimeout(() => {
            props.changeLoadingActive(false)
        }, 1000)
        props.getAllClientsTerritories()
    },[])
    return (
        <div style={{width:"100%", backgroundColor: "#dae2e3", padding:"20px 20px"}}>
            <div style={{alignItems:"center",display:clients.isLoading?"flex":"block",justifyContent:"center",overflow:"hidden",width:"100%", height:"100%", backgroundColor:"white", padding:"10px 20px", borderRadius:"10px"}}>
                {
                    clients.isLoading ?
                    <div className="bg-white d-flex justify-content-center align-items-center gap-2 p-2"
                         style={{height: "50vh"}}>
                        <div>
                            <div id="loading-bar-spinner" className="spinner">
                                <div className="spinner-icon"></div>
                            </div>
                        </div>

                    </div>
                    :
                    <>
                    <p style={{fontSize: "30px", textAlign:"start"}}>Clients On The Map</p><hr/>
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
                        height={"85%"}
                        defaultState={{
                            center: [39.7756, 64.4253],
                            zoom: 10,
                        }}
                        modules={["templateLayoutFactory"]}>
                        <ZoomControl options={{float: "right"}}/>
                        {
                            clients.allClientTerritoriesForMap.map((address, index)=>{
                                return <Placemark properties={{
                                    balloonContent: address.name,
                                    // hintContent: 'Bu yerda markaziy nuqta',
                                    // iconContent: "Salom",
                                }} options={{iconColor: 'red',iconImageHref: logo}} key={index} geometry={address.territories} />
                            })
                        }
                    </Map>
                </YMaps>
                    </>
                }
                
            </div>
        </div>
    );
}

export default connect((state) => state, clientsAction)(ClientsOnTheMap);