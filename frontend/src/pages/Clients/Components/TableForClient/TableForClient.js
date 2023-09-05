import React, {useEffect} from 'react';
import Table from "../../../universal/Table/Table";
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import "../../clients.css";
import langData from "../../../../Languages/Language.json";
import JsxContentForAddClientModal from "../ModalForClient/JsxContentForClientModal/JsxContentForAddClientModal";
import UniversalModal from "../../../universal/Modal/UniverModal";

function TableForClient(props) {
    const { clients } = props;

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
            title: "Territory",
            key: "region",
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
            title: "Category",
            key: "categoryName",
            type: "text",
            show: true,
        },
        {
            id: 7,
            title: "Activity",
            key: "active",
            type: "boolean",
            show: true,
        },
        {
            id: 8,
            title: "Registration Date",
            key: "registrationDate",
            type: "text",
            show: true,
        },
        {
            id: 9,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        props.editeClients(item);
                    }}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ),
        },
        {
            id: 10,
            title: "AddPlan",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button onClick={()=>props.openModalForPlan(item)} className="custom_edit_btn">
                    <i className="fa-regular fa-calendar-plus"></i>
                </button>
            ),
        },
    ];
    function checkInputs(){
        if (clients.datePlane !== "" || clients.amountPlane !== ""){
            return true;
        }
        return false;
    }

    return (
        <div>
            <Table
                localStoragePath="clients"
                pagination={true}
                changeSizeMode={true}
                paginationApi={"/client/pagination?page={page}&limit={limit}"}
                dataProps={clients.clients}
                columnOrderMode={true}
                changeSizeModeOptions={["All", 5, 20, 50, 100, 200]}
                columnsProps={columns}
                fileName={"clients"}
                excelPath={"/excel?component=clients&"}
            />
            <UniversalModal
                checkPage={checkInputs()}
                modalTitle={"Plane"}
                isOpen={clients.modalForAddPlan}
                closeFunction={() => props.closeModalForPlan()}
                width={50}
                JsxData={<div className={'w-100'}>
                        <div style={{justifyContent:"space-between"}} className={'d-flex gap-2'}>
                            <div style={{width:"40%"}}>
                                <span>Enter the time: </span>
                                <input onChange={(e)=>props.changeDatePlane(e.target.value)} value={clients.datePlane} className={'form-control'} type="date"/>
                            </div>
                            <div style={{width:"40%"}}>
                                <span>Enter the amount: </span>
                                <input onChange={(e)=>props.changeAmountPlane(e.target.value)} value={clients.amountPlane} className={'form-control'} type="number"/>
                            </div>
                            <div style={{paddingTop:"24px", display:"flex", gap:"10px"}}>
                                {
                                    checkInputs() ?
                                        <button onClick={()=>props.resetDataForPlansMap()} className={'btn btn-danger'}>Clear</button>:""
                                }
                                <button className={clients.currentPlane !== ""? 'btn btn-warning' : 'btn btn-success'} onClick={()=>props.savePlane()}>Save</button>
                            </div>
                        </div>
                        <hr/>
                        <div style={{maxHeight:"400px", marginBottom:"20px", overflow:"auto", textAlign:"center"}}>
                            {
                                clients.plans.length === 0 ?
                                <b>No Plans</b>:
                                clients.plans.map((item, index)=>{
                                return <div style={{width:"100%",display:"flex",justifyContent:"space-between", borderBottom:"1px solid", borderRadius:"7px", padding:"10px 5px", boxShadow: "0px 3px 10px -4px rgba(0,0,0,0.75)", marginBottom:"10px"}}>
                                <div style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
                                    <b>{item.amount} $</b>
                                    <span>{item.date}</span>
                                </div>
                                    {
                                        (item.edited) ?
                                            <button onClick={()=>props.editPlan(item)} className={'btn btn-warning'}>
                                                <i className="fa fa-edit"></i>
                                            </button>:
                                            <button className="btn btn-secondary">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                    }
                                </div>
                            })
                            }
                        </div>
                    </div>
                }
            />
        </div>
    );
}
export default connect((state) => state, clientsAction)(TableForClient);
