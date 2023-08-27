import React from 'react';
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import UniversalModal from "../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {teritoryAction} from "../../../Redux/reducers/teritoryReducer";
import "../Teritory.css"
function ModalForTerritory(props) {
    const { teritory } = props;
    function handleMapClick(event) {
        console.log(event);
        const coords = event.get("coords");
        const latitude = coords[0];
        const longitude = coords[1];
        props.handleTemplate([longitude, latitude]);
        props.handleMapState({ center: [latitude, longitude], zoom: 10 });
    }

    function checkInpValue() {
        if (teritory.title !== "" || teritory.region !== "" || teritory.code !== "" || teritory.active !==false || teritory.longitute !== "" || teritory.latitute !==""){
            return true;
        }
        return false;
    }
    return (
        <UniversalModal
            modalTitle={
                teritory.itemForTeritoryEdite === ""
                    ? "Add teritory"
                    : "Edite teritory"
            }
            checkPage={checkInpValue()}
            isOpen={teritory.openModal}
            closeFunction={() => props.handleClose()}
            width={60}
            functionforSaveBtn={() => props.saveTeritory()}
            JsxData={
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
                            width={400}
                            height={300}
                            defaultState={{
                                center: teritory.defaultCenter,
                                zoom: 10,
                            }}
                            onClick={handleMapClick}
                            modules={["templateLayoutFactory"]}
                        >
                            <ZoomControl options={{ float: "right" }} />
                            {teritory.mapState.center[0] === "" ||
                            teritory.mapState.center[1] === "" ? (
                                ""
                            ) : (
                                <Placemark
                                    geometry={teritory.mapState.center}
                                    modules={["geoObject.addon.balloon"]}
                                />
                            )}
                        </Map>
                    </YMaps>
                    <div className={"d-flex my-3 g-4"}>
                        <label>
                            Long:
                            <input disabled={true} type="text" value={teritory.longitute} />
                        </label>
                        <label>
                            Lat:
                            <input disabled={true} type="text" value={teritory.latitute} />
                        </label>
                    </div>
                    <button
                        type={"button"}
                        className={"btn btn-danger"}
                        onClick={() => props.clearAllTeritory()}
                    >
                        Clear
                    </button>
                </div>
            }
            inpData={[
                {
                    id: 1,
                    title: "Title* ",
                    value: teritory.title,
                    onChange: (e) => props.handleTitle(e.target.value),
                    type: "text",
                },
                {
                    id: 2,
                    title: "Region ",
                    value: teritory.region,
                    onChange: (e) => props.handleRegion(e.target.value),
                    type: "text",
                },
                {
                    id: 3,
                    title: "Code ",
                    value: teritory.code,
                    onChange: (e) => props.handleCode(e.target.value),
                    type: "text",
                },
                {
                    id: 4,
                    title: "Active ",
                    value: teritory.active,
                    onChange: (e) => props.handleActive(e.target.checked),
                    type: "checkbox",
                },
            ]}
        />
    );
}
export default connect((state) => state, teritoryAction)(ModalForTerritory);