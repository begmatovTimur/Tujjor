import React, {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import './modal.css'

// ishlatish uchun namuna👇

// <UniversalModal
// modalTitle={"Men modalmaaan"}
// isOpen={openModal}
// closeFunction={closeModal}
// width={35}
// functionforSaveBtn={()=>console.log("SALOM")}
// inpData = {[
//         {
//             title: "",
//             labelValue: "bo'loptimii",
//             id: 2,
//             value: ipnValue,
//             onChange: (e)=>setInpValue(e.target.value),
//             placeholder: "Salomlaar",
//             type: "checkbox"
//         },{
//     title: "active:",
//         id: 2,
//         value: ipnValue,
//         onChange: (e)=>setInpValue(e.target.value),
//         placeholder: "dghfhgghshg",
//         type: "checkbox"
// },{
//     title: "df: ",
//         id: 2,
//         value: ipnValue,
//         onChange: (e)=>setInpValue(e.target.value),
//         placeholder: "dghfhgghshg",
//         type: "text"
// },
// ]}
// />


const UniversalModal = ({inpData, isOpen, closeFunction, modalTitle, width, functionforSaveBtn})=> {
    const style = {
        position: "absolute",
        top: "47%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor:"white",
        border: "none",
        boxShadow: 24,
        borderRadius: "10px",
        width: width+"%",
        overflow: "auto",
    };
    useEffect(()=>{
    }, [])
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={closeFunction}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div style={{
                        width: "100%",
                        height: "50px",
                        padding: "10px 0px 0px 45px",
                        fontSize: "18px",
                        color: "white",
                        background: "rgba(64, 125, 178, 0.9)",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px"
                    }}>
                        {modalTitle}
                    </div>
                    <div id={"bottomChildForUModal"}>
                        {
                            inpData?.map((item, index)=>{
                                return <div key={index}>
                                    {
                                        item.type === "checkbox"?
                                            <div style={{display:"flex", gap:(item?.title === undefined || item?.title === "")? "0%" : "10%", justifyContent:"space-between"}}>
                                                <span style={{maxWidth:"20%", wordBreak:"break-all"}}>{(item?.title === undefined)? "" : item?.title + " "} </span>
                                                <label style={{position:"relative",width: (item?.title === undefined || item?.title === "")?"100%":"70%"}}><input type={item?.type} value={item?.value} style={{width: "25px"}} onChange={item?.onChange}/> <span style={{position:"absolute", left:"35px", top:"8px"}}>{item.labelValue}</span></label>
                                            </div>
                                            :
                                            <div className={'d-flex g-2 justify-content-between'}>
                                                <span style={{maxWidth:"20%", wordBreak:"break-all"}}>{(item?.title === undefined)? "" : item?.title + " "} </span>
                                                <div style={{width: (item?.title === undefined || item?.title === "")?"100%":"70%"}}>
                                                    {item?.data}
                                                    <input type={item?.type} value={item?.value} onChange={item?.onChange} placeholder={item?.placeholder}/>
                                                </div>
                                            </div>
                                    }
                                </div>
                            })
                        }
                        <button className={'btn btn-success w-25'} onClick={functionforSaveBtn}>Save</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default UniversalModal;