import React, {useEffect, useState} from 'react';
import './clients.css'
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "../../Redux/reducers/clientsReducer";
import UniversalModal from "../universal/Modal/UniverModal";
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import Table from "../universal/Table/Table";
import Filter from "../universal/Filter/Filter";
import {teritoryAction} from "../../Redux/reducers/teritoryReducer";

function Clients(props) {
    const {clients} = props
    useEffect(()=>{
        props.getTeritories()
        props.getClients()
        props.getCustomCategory()
    },[])
    function handleMapClick(event){
        const coords = event.get("coords");
        const latitude = coords[0];
        const longitude = coords[1];
        props.handleTemplate([longitude, latitude]);
        props.handleMapState({center: [latitude, longitude], zoom: 10});
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(teritoryAction.getCities())
    }, [dispatch])

    const columns = [
        {
            id: 0,
            title: "№",
            key: "index",
            type: "index",
            show: true,
        },
        {
            id: 1,
            title: "Client name",
            key: "clientName",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Company name",
            key: "companyName",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Telephone",
            key: "telephone",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "TeritoryName",
            key: "territory.name",
            type: "text",
            show: true,
        },
        {
            id: 5,
            title: "Address",
            key: "address",
            type: "text",
            show: true,
        },
        {
            id: 6,
            title: "Longitude",
            key: "longitude",
            type: "text",
            show: true,
        },
        {
            id: 7,
            title: "Latitude",
            key: "latitude",
            type: "text",
            show: true,
        },
        {
            id: 8,
            title: "Category",
            key: "categoryName",
            type: "text",
            show: true,
        },
        {
            id: 9,
            title: "Activity",
            key: "active",
            type: "boolean",
            show: true,
        },{
            id: 9,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => <button className="custom_edit_btn" onClick={() =>
                props.editeClients(item)
            }><i class="fa fa-edit"></i></button>
        }
    ];
    const [optionsActive] = useState([
        {value: "", label: "All"},
        {value: "true", label: "Active"},
        {value: "false", label: "Inactive"},
    ]);

    function generateOptionsOfCity(){
        const optionsCity = []
        props.teritory.regions.map((item,index)=>{
             optionsCity.push({
                value: item.id,
                    label: item.region
            })
        })
        return optionsCity
    }
    return (
        <div style={{width: "100%", backgroundColor: "#dae2e3"}}>
            <div id={'clientsFatherDiv'}>
                <div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #dae2e3",
                        marginTop: "10px"
                    }}>
                        <p style={{fontSize: "30px"}}>Clients</p>
                        <button onClick={() => props.openModal()} style={{
                            display: "block",
                            height: "40px",
                            backgroundColor: "#4dce4d",
                            border: "none",
                            padding: "5px 15px"
                        }}>+ Add Client
                        </button>
                    </div>
                    <div>
                        <Filter
                            search={[
                                {
                                    name: "active",
                                    multi: false,
                                    options: optionsActive,
                                    defaultValue: {value: "", label: "All"},
                                    placeholder: "Active",
                                },
                                {
                                    name: "city",
                                    multi: true,
                                    options: generateOptionsOfCity(),
                                    defaultValue: {value: "", label: "All"},
                                    placeholder: "City",
                                },
                                {
                                    name: "category",
                                    multi: false,
                                    options: optionsActive,
                                    defaultValue: {value: "", label: "All"},
                                    placeholder: "Customer categories",
                                },
                                {
                                    name: "day",
                                    multi: false,
                                    options: optionsActive,
                                    defaultValue: {value: "", label: "All"},
                                    placeholder: "day",
                                },
                                {
                                    name: "allWeeks",
                                    multi: false,
                                    options: optionsActive,
                                    defaultValue: {value: "", label: "All"},
                                    placeholder: "All weeks",
                                },
                                {
                                    name: "tin",
                                    multi: false,
                                    options: optionsActive,
                                    defaultValue: {value: "", label: "All"},
                                    placeholder: "Tin",
                                },
                                {
                                    name: "location",
                                    multi: false,
                                    options: optionsActive,
                                    defaultValue: {value: "", label: "All"},
                                    placeholder: "Location",
                                },
                                {
                                    name: "withInventory",
                                    multi: false,
                                    options: optionsActive,
                                    defaultValue: {value: "", label: "All"},
                                    placeholder: "With Inventory",
                                }
                            ]}
                            filterButton={true}
                        />
                        <Table
                            pagination={true}
                            changeSizeMode={true}
                            paginationApi={"/client/pagination?page={page}&limit={limit}"}
                            dataProps={clients.clients}
                            columnOrderMode={true}
                            changeSizeModeOptions={[10, 20, 50, 100, 200]}
                            columnsProps={columns}
                        />
                    </div>
                </div>
            </div>
            <UniversalModal
                modalTitle={"Add Client"}
                isOpen={clients.openModal}
                closeFunction={() => props.closeModal()}
                width={70}
                functionforSaveBtn={() => props.saveClients()}
                JsxData={
                    <div style={{display: "flex", gap: "4%"}}>
                        <div className={'w-50'}>
                            <div className={'d-flex'}>
                                <div style={{display:"flex", flexDirection:"column", gap:"20px", width:"48%"}}>
                                    <label><span className={'d-block'}>Teritories*</span>
                                        <select onChange={(e)=>props.changeTeritoryId(e.target.value)} value={clients.teritoryId} className={'form-select'}>
                                            <option value="" selected disabled>All Teritories</option>
                                            {
                                                clients?.teritories?.map((item)=>{
                                                    return <option value={item?.id}>{item?.name}</option>
                                                })
                                            }
                                        </select>
                                    </label>
                                    <label><span className={'d-block'}>Name*</span>
                                        <input onChange={(e)=>props.changeName(e.target.value)} value={clients.name} className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>Address*</span>
                                        <input onChange={(e)=>props.changeAddress(e.target.value)} value={clients.address} className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>Telephone*</span>
                                        <input onChange={(e)=>props.changeTelephone(e.target.value)} value={clients.telephone} className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>TIN</span>
                                        <input onChange={(e)=>props.changeTin(e.target.value)} value={clients.tin} className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label className={'d-flex'}>
                                        <span>Active:</span>
                                        <input onChange={(e)=>props.changeActive(e.target.checked)} checked={clients.active} className={"form-check w-25"} type="checkbox" name="" id=""/>
                                    </label>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                    width: "48%",
                                    marginLeft: "4%"
                                }}>
                                    <label><span className={'d-block'}>Category*</span>
                                        <select onChange={(e)=>props.changeCategoriesId(e.target.value)} value={clients.categoryId} className={'form-select'}>
                                            <option value="" selected disabled>All Category</option>
                                            {
                                                clients.customCategories?.map((item)=>{
                                                    return <option value={item?.id}>{item?.name}</option>
                                                })
                                            }
                                        </select>
                                    </label>
                                    <label><span className={'d-block'}>Company name</span>
                                        <input onChange={(e)=>props.changeCompanyName(e.target.value)} value={clients.companyName} className={"form-control w-100"} type="text" name="" id=""/>
                                    </label>
                                    <label><span className={'d-block'}>Reference point</span>
                                        <input onChange={(e)=>props.changeReferencePoint(e.target.value)} value={clients.referencePoint} className={"form-control w-100"} type="text" name="" id=""/>
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
                                }}>
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