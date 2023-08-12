import React, {useEffect} from 'react';
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/reducers/clientsReducer";

function ClientsOnTheMap(props) {
    const {clients} = props
    useEffect(()=>{
        props.getAllClientsTerritories()
    },[])
    return (
        <div style={{width:"100%", backgroundColor: "#dae2e3", padding:"20px 20px"}}>
            <div style={{width:"100%", height:"100%", backgroundColor:"white", padding:"10px 20px", borderRadius:"10px"}}>
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
                        height={590}
                        defaultState={{
                            center: [39.7756, 64.4253],
                            zoom: 10,
                        }}
                        modules={["templateLayoutFactory"]}>
                        <ZoomControl options={{float: "right"}}/>
                        {
                            clients.allClientTerritoriesForMap.map((address, index)=>{
                                return <Placemark properties={{
                                    balloonContent: address.name
                                }} options={{iconColor: 'red'}} key={index} geometry={address.territories} />
                            })
                        }
                    </Map>
                </YMaps>
            </div>
        </div>
    );
}

export default connect((state) => state, clientsAction)(ClientsOnTheMap);