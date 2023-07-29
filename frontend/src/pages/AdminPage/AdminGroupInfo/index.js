import React, {useEffect, useState} from 'react';
import logoImg from "../Media/Images/shiftImg1.png";
import {useLocation, useParams} from "react-router-dom";
import apiCall from "../../../apiCall";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css'
import {now} from "moment";
import axios from "axios";
import {connect, useDispatch} from "react-redux";
import {groupInfoModel} from "../../../Redux/pages/GroupInfo/reducers/groupInfoReducer";
import userReducer from "../../../Redux/pages/AdminUser/reducers/userReducer";

function Index(props) {

    const {groupInfoReducer} = props
    const {groupId} = useParams();
    const location = useLocation()
    const dispatch = useDispatch()
    const currentDate = new Date().toLocaleDateString().substring(0, 2);
    useEffect(() => {
        props.getMe()
        props.getCurrentGroup(groupId)
        props.changeGroupId(groupId);
        props.getLastTimeTable()
        props.getStudent();
        props.getTimeTableDay()
        props.getMentor()
        props.getTimeTable();
        props.getStudentTimeTable();
    }, [])

    useEffect(() => {
        props.changeGroupId(groupId);
        props.getLastTimeTable()
        props.getStudent();
        props.getTimeTableDay()
        props.getMentor()
        props.getTimeTable();
        props.getStudentTimeTable();
    }, [location.pathname])
    // function getStudentTimeTable(id) {
    //     apiCall({
    //         url: "http://localhost:8080/api/studenttimetable?id=" + id,
    //         method: "get"
    //     }).then((res) => {
    //         setStudentTimeTables(res.data);
    //         // getLastTimeTable()
    //         // getTimeTables()
    //         props.getStudent();
    //     })
    // }


    // function SaveStudentTimeTable(e) {
    //     let x = groupInfoReducer.lastTimeTable.id
    //     e.preventDefault();
    //     let obj = {
    //         timeTableId: x,
    //         studentId: e.target[0].value,
    //         price: e.target[1].value
    //     }
    //     apiCall({
    //         url: "http://localhost:8080/api/studenttimetable",
    //         method: "post",
    //         data: obj
    //     }).then((res) => {
    //         props.getStudentTimeTable();
    //         props.getTimeTableDay()
    //     })
    //     e.target.reset();
    // }

    function StartTimeTable() {
        // console.log(groupInfoReducer.lastTimeTable)
        if (groupInfoReducer.lastTimeTable === "") {
            // setModalVisibleTable(true)
            props.changeModalVisibleTable()
        } else {
            // setModalVisibleTime(true)
            props.changeModalVisibleTime()
        }
    }

    function StartDefaultTimeTable(e) {
        e.preventDefault();
        let obj = {
            startDate: e.target[0].value
        }
        if (groupInfoReducer.lastTimeTable) {
            apiCall({
                url: "http://localhost:8080/api/timetable/startTime?id=" + groupInfoReducer.lastTimeTable.id,
                method: "put",
                data: obj
            }).then((res) => {
                if (res === undefined) {
                    alert("Please, Select weekdays")
                    return;
                }
                props.changeLastTimeTable(res.data)
            })
        }
    }

    function editAbsent(e, item) {
        let obj = {
            absent: e
        }
        apiCall({
            url: "http://localhost:8080/api/timetableday/absent?id=" + item.id,
            method: "put",
            data: obj
        }).then((res) => {
            props.getTimeTableDay()
        })
    }

    function SaveTimeTable(e) {
        e.preventDefault()
        let timeTableObj = {
            title: e.target[0].value,
            price: e.target[1].value,
            mentorId: e.target[2].value,
            startDate: e.target[3].value,
            groupId: groupId
        }
        apiCall({
            url: "/api/timetable/all",
            method: "post",
            data: timeTableObj
        }).then(res => {
            props.getLastTimeTable()
            props.getTimeTable();
            props.getTimeTableDay()

        })
        e.target.reset();
    }

    // function CloseTimeModal() {
    //     props.getLastTimeTable()
    //     setModalVisibleTime(false)
    // }

    function selectTimeTable(value) {
        apiCall({
            url: "http://localhost:8080/api/timetable/one?id=" + value,
            method: "get"
        }).then(res => {
            props.getStudentTimeTable()
            props.changeLastTimeTable(res.data)
        })
    }

    // function CompleteTimeTable() {
    //     apiCall({
    //         url: "http://localhost:8080/api/timetable/complete?id=" + groupInfoReducer.lastTimeTable.id,
    //         method: "put"
    //     }).then(res => {
    //         props.getLastTimeTable()
    //         props.changeStudents()
    //         setStudentTimeTables([])
    //         props.changeTimeTableDay()
    //     })
    // }

    function getMonthName(dateString) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const [year, monthIndex, day] = dateString.split("-");
        const monthName = monthNames[parseInt(monthIndex) - 1];

        return monthName;
    }

    function excludeUser() {
        // let myArr = [];
        // for (let i = 0; i < studentTimeTables.length; i++) {
        //    myArr = groupInfoReducer.students.filter(item=>item.id!==studentTimeTables[i].user.id)
        // }
        // console.log(myArr)
        // return myArr;
        return groupInfoReducer.students.filter((item) => {
            return !groupInfoReducer.studentTimeTables.some((table) => table.user.id === item.id);
        });
    }

    return (
        <div style={{padding: 10}}>
            <div style={{marginBottom: "10px"}} className={"header"}>
                <div style={{width: "200px"}} className={"logo"}>
                    <img width={100} height={80} src={logoImg} alt=""/>
                </div>

                <div className={"search"}>
                    <input placeholder={"search"} type="text" className={"form-control w-50"}/>
                    <button className={"btn btn-primary"}><i style={{fontSize: "15px"}}
                                                             className="fa-solid fa-magnifying-glass"></i></button>
                </div>

                <div className={"content"}>
                    <i style={{fontSize: "25px"}} className="fa-solid fa-bell"></i>
                    <h3>{groupInfoReducer.currentUser.firstName} {groupInfoReducer.currentUser.lastName}</h3>
                </div>
            </div>
            <div className={"main"}>
                <div className={"main_left"}>
                    <div style={{padding: 10}}>
                        <h3>{groupInfoReducer.currentGroup.name} - {groupInfoReducer.lastTimeTable ? groupInfoReducer.lastTimeTable.mentor.firstName : "Mentor hali belgilanmadi"} {groupInfoReducer.lastTimeTable ? groupInfoReducer.lastTimeTable.mentor.lastName : ""}</h3>
                        <div className={"d-flex align-items-center justify-content-between"}>
                            <h3>Narx: {groupInfoReducer.lastTimeTable ? groupInfoReducer.lastTimeTable.price : "Hali belgilanmadi"}</h3>
                            <button
                                className="main_btn my-1"><i
                                className="fa-solid fa-pen-to-square"></i></button>
                        </div>
                        <div className={"d-flex align-items-center justify-content-between"}>
                            <h3>Vaqt: {(groupInfoReducer.lastTimeTable ? groupInfoReducer.lastTimeTable.group.dayType : "") === "EVEN" ? "Juft" : (groupInfoReducer.lastTimeTable ? groupInfoReducer.lastTimeTable.group.dayType : "") === "ODD" ? "Toq" : "Har kun"}</h3>
                        </div>
                        <div className={"d-flex align-items-center justify-content-between"}>
                            <h3>Xonalar: {groupInfoReducer.currentGroup.roomName}</h3>
                            {
                                groupInfoReducer.expressPlus === "able" ?
                                    <button onClick={() => props.changeModalVisiblePlusTrue()}
                                            className="main_btn my-1">+
                                    </button>
                                    : ""
                            }
                        </div>
                        <hr/>
                        {
                            groupInfoReducer.timeTables.length>1 && groupInfoReducer.lastTimeTable.length !== 0?
                            <div>
                                <select
                                    onChange={(e) => props.selectTimeTable(e.target.value)}
                                    className={"form-select w-100 my-3"}
                                    defaultValue={""}
                                >
                                    <option value="" disabled={true}>Variantni tanlang</option>
                                    {
                                        groupInfoReducer.timeTables.map((item, index) => {
                                            return <option key={index} value={item?.id}>{item?.title}</option>
                                            return <option key={index} value={item?.id}>{item?.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                            :""
                        }
                        {
                            groupInfoReducer.lastTimeTable.length === 0 || groupInfoReducer.lastTimeTable.status === "CREATED" ?
                                <button onClick={StartTimeTable} className={"3 w-100 btn btn-dark my-3"}>Start</button>
                                : ""
                        }

                        {
                            groupInfoReducer.studentTimeTables.length!==0?
                                <div>
                                    <div className={"d-flex align-items-center justify-content-between"}>
                                        <h3 className={"my-"}>Students</h3>
                                        {/*<button onClick={() => setModalVisible(true)} className={"btn btn-dark"}>Add</button>*/}
                                    </div>
                                    <div>
                                        {
                                            groupInfoReducer.studentTimeTables.map((item, index) => {
                                                return <ul className={"main_list"} key={index}>
                                                    <li className={"d-flex align-items-center gap-1"}>
                                                        <div className={"dot"}></div>
                                                        {item.user?.firstName} {item.user?.lastName} || Phone: {item.user?.phone}
                                                    </li>
                                                </ul>
                                            })
                                        }
                                    </div>
                                </div>
                                :""
                        }
                    </div>
                </div>
                <div style={{padding: 10}} className={"main_right"}>
                    {
                        groupInfoReducer.studentTimeTables.length!==0?
                            <div>
                                <h1>Davomat</h1>
                                <table className={"table"}>
                                    <thead className={"table-dark"}>
                                    <tr>
                                        <th>Ism</th>
                                        {
                                            groupInfoReducer.lastTimeTable ? groupInfoReducer.lastTimeTable.dates.map((item, index) => {
                                                return <th style={{width: 100, paddingLeft: 0}} key={index}>
                                                    <p style={{
                                                        width: 30,
                                                        margin: 0,
                                                        padding: 0
                                                    }}>{item.substring(8)}-{getMonthName(item)}</p>
                                                </th>
                                            }) : ""
                                        }
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        groupInfoReducer.studentTimeTables.map((item, index) => {
                                            return <tr key={index}>
                                                <td> {item.user.firstName}</td>
                                                {
                                                    groupInfoReducer.timeTableDays.filter(i2 => i2.timeTableStudent.id === item.id).map((i1, index1) => {
                                                        return <td key={index1}>
                                                            <div className="checkbox-wrapper-2">
                                                                <input onChange={(e) => props.editAbsent({
                                                                    value: e.target.checked,
                                                                    item: i1
                                                                })}
                                                                       type="checkbox" value={i1.absent} checked={i1.absent}
                                                                       className="sc-gJwTLC ikxBAC"/>
                                                            </div>
                                                        </td>
                                                    })
                                                }
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                                {
                                    (currentDate === ((groupInfoReducer.lastTimeTable && groupInfoReducer.lastTimeTable.endDate ? groupInfoReducer.lastTimeTable.endDate.substring(8) : ""))) && groupInfoReducer.lastTimeTable.status === "STARTED" ?
                                        <button onClick={() => props.CompleteTimeTable()}
                                                className={"btn btn-primary"}>Complete</button>
                                        : ""
                                }
                            </div>
                            : ""
                    }
                </div>
            </div>
            <Rodal height={300} visible={groupInfoReducer.modalVisiblePlus}
                   onClose={() => props.changeModalVisiblePlusFalse()}>
                <div>
                    <h3 className={"my-3"}>AddStudent</h3>
                    <select value={groupInfoReducer.studentId} onChange={(e) => props.changeStudentId(e.target.value)}
                            defaultValue={""} className={"form-select"}>
                        <option value="" disabled={true}>Select student</option>
                        {
                            excludeUser().map((item, index) => {
                                return <option value={item.id} key={index}>{item.firstName} {item.lastName}</option>
                            })
                        }
                    </select>
                    <label className={"my-3"}>
                        Bir oylik kurs Narxi:
                        <input value={groupInfoReducer.price} onChange={(e) => props.changePrice(e.target.value)}
                               className={"form-control"} type="text"/>
                    </label>

                    <button onClick={() => props.saveStudentTimeTable()} style={{marginLeft: "290px"}}
                            className={"btn btn-dark"}>Save
                    </button>
                </div>
            </Rodal>
            <Rodal height={200} visible={groupInfoReducer.modalVisibleTime}
                   onClose={() => props.changeModalVisibleTime()}>
                <div>
                    <h3 className={"my-3"}>StartTime</h3>
                    <input value={groupInfoReducer.startDate} onChange={(e) => props.changeStartDate(e.target.value)}
                           className={"form-control my-3"} type="date"/>
                    <button onClick={() => props.StartDefaultTimeTable()} style={{marginLeft: "290px"}}
                            className={"btn btn-dark"}>Save
                    </button>
                </div>
            </Rodal>

            <Rodal height={350} visible={groupInfoReducer.modalVisibleTable}
                   onClose={() => props.changeModalVisibleTable()}>
                <div>
                    <h3 className={"my-3"}>AddTimeTable</h3>
                    <input value={groupInfoReducer.title} onChange={(e) => props.changeTitleTable(e.target.value)}
                           type="text" placeholder={"timeTableTitle"} className={"form-control my-3"}/>
                    <input value={groupInfoReducer.priceTimeTable}
                           onChange={(e) => props.changePriceTable(e.target.value)} type="text"
                           placeholder={"timeTablePrice"} className={"form-control my-3"}/>
                    <select value={groupInfoReducer.mentorId} onChange={(e) => props.changeMentorId(e.target.value)}
                            className={"form-select my-3"} defaultValue={""}>
                        <option value={""} disabled={true}>Mentorni Tanlang</option>
                        {
                            groupInfoReducer.mentors.map((item, index) => {
                                return <option key={index} value={item.id}>{item.firstName} {item.lastName}</option>
                            })
                        }
                    </select>
                    <input value={groupInfoReducer.startDateTimeTable}
                           onChange={(e) => props.changeStartDateTable(e.target.value)} className={"form-control my-3"}
                           type="date"/>
                    <button onClick={() => props.SaveTimeTable()} style={{marginLeft: "290px"}}
                            className={"btn btn-dark"}>Save
                    </button>
                </div>
            </Rodal>
        </div>
    );
}

export default connect(state => state, groupInfoModel)(Index);