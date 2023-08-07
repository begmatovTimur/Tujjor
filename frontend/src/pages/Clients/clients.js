import React, {useEffect} from 'react';
import './clients.css'
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/reducers/clientsReducer";
import UniversalModal from "../universal/Modal/UniverModal";
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";

function Clients(props) {
    const {clients} = props
    function handleMapClick(event){
        const coords = event.get("coords");
        const latitude = coords[0];
        const longitude = coords[1];
        props.handleTemplate([longitude, latitude]);
        props.handleMapState({center: [latitude, longitude], zoom: 10});
    }
    return (
        <div style={{width:"100%", backgroundColor:"#dae2e3"}}>
            <div id={'clientsFatherDiv'}>
                <div style={{display:"flex", justifyContent:"space-between", borderBottom:"1px solid #dae2e3", marginTop:"10px"}}>
                    <p style={{fontSize:"30px"}}>Clients</p>
                    <button onClick={() => props.openModal()} style={{display:"block", height:"40px", backgroundColor:"#4dce4d", border:"none", padding:"5px 15px"}}>+ Add Client</button>
                </div>
            </div>
            <UniversalModal
                modalTitle={"Add Client"}
                isOpen={clients.openModal}
                closeFunction={() => props.closeModal()}
                width={70}
                JsxData={
                    <div style={{display:"flex", gap:"4%"}}>
                        <div className={'w-50'}>
                            <div className={'d-flex'}>
                                <div style={{display:"flex", flexDirection:"column", gap:"20px", width:"48%"}}>
                                    <label><span className={'d-block'}>clients*</span>
                                        <input className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>Name*</span>
                                        <input className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>Address*</span>
                                        <input className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>Telephone*</span>
                                        <input className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>TIN</span>
                                        <input className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label className={'d-flex'}>
                                        <span>Active:</span>
                                        <input className={"form-check w-25"} type="checkbox" name="" id=""/>
                                    </label>
                                </div>
                                <div style={{display:"flex", flexDirection:"column", gap:"20px", width:"48%", marginLeft:"4%"}}>
                                    <label><span className={'d-block'}>Category*</span>
                                        <input className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>Company name</span>
                                        <input className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>Reference point</span>
                                        <input className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                        
                        <div className={"w-50"}>
                            <YMaps
                                query={{
                                    apikey: "e24090ad-351e-4321-8071-40c04c55f144\n",
                                    lang: "en_US",
                                    coordorder: "latlong",
                                    load: "package.full",
                                }}
                            >
                                <Map
                                    width={430}
                                    height={300}
                                    defaultState={{
                                        center: [39.7756, 64.4253],
                                        zoom: 10,
                                    }}
                                    onClick={handleMapClick}
                                    modules={["templateLayoutFactory"]}
                                >
                                    <ZoomControl options={{float: "right"}}/>
                                    {clients.template &&
                                        clients.longitute !== "" &&
                                        clients.latitude !== "" && (
                                            <Placemark
                                                geometry={clients.mapState.center}
                                                modules={["geoObject.addon.balloon"]}
                                            />
                                        )}
                                </Map>
                            </YMaps>
                            <div className={"d-flex my-3 g-4"}>
                                <label>
                                    <p>
                                        Long:
                                    </p>
                                    <input disabled={true}
                                           type="text"
                                           value={clients.longitute}
                                    />
                                </label>
                                <label className={'mx-5'}>
                                    <p>
                                        Lat:
                                    </p>
                                    <input
                                        disabled={true}
                                        type="text"
                                        value={clients.latitute}
                                    />
                                </label>
                            </div>
                            <button
                                className={"btn btn-danger"}
                                onClick={() => props.clearAllclients()}>
                                Clear
                            </button>
                        </div>
                    </div>
                }
            />
        </div>
    );
}

export default connect((state) => state, clientsAction)(Clients);