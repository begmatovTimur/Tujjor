import React, {useContext} from 'react';
import UniversalModal from "../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import langData from '../../../../Languages/Language.json'
import LanguageContext from "../../../../Languages/Contex/Language";

function ClientPlan(props) {
    const { clients } = props;
    const {langIndex} = useContext(LanguageContext)

    function checkInputs(){
        if (clients.datePlane !== "" || clients.amountPlane !== ""){
            return true;
        }
        return false;
    }
    return (
        <UniversalModal
            checkPage={checkInputs()}
            modalTitle={`${langData[langIndex]?.clientPage?.plan?.title}`}
            isOpen={clients.modalForAddPlan}
            closeFunction={() => props.closeModalForPlan()}
            width={50}
            JsxData={<div className={'w-100'}>
                <div style={{justifyContent:"space-between"}} className={'d-flex gap-2'}>
                    <div style={{width:"40%"}}>
                        <span>{langData[langIndex]?.clientPage?.plan?.inp1}</span>
                        <input onChange={(e)=>props.changeDatePlane(e.target.value)} value={clients.datePlane} className={'form-control'} type="date"/>
                    </div>
                    <div style={{width:"40%"}}>
                        <span>{langData[langIndex]?.clientPage?.plan?.inp2}</span>
                        <input onChange={(e)=>props.changeAmountPlane(e.target.value)} value={clients.amountPlane} className={'form-control'} type="number"/>
                    </div>
                    <div style={{paddingTop:"24px", display:"flex", gap:"10px"}}>
                        {
                            checkInputs() ?
                                <button onClick={()=>props.resetDataForPlansMap()} className={'btn btn-danger'}>{langData[langIndex]?.clientPage?.plan?.clearBtn}</button>:""
                        }
                        <button className={clients.currentPlane !== ""? 'btn btn-warning' : 'btn btn-success'} onClick={()=>props.savePlane()}>{langData[langIndex]?.clientPage?.plan?.saveBtn}</button>
                    </div>
                </div>
                <hr/>
                <div style={{maxHeight:"400px", marginBottom:"20px", overflow:"auto", textAlign:"center"}}>
                    {
                        clients.plans.length === 0 ?
                            <b>{langData[langIndex]?.clientPage?.plan?.noPlans}</b>:
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
    );
}
export default connect((state) => state, clientsAction)(ClientPlan);