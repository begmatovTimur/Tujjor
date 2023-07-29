import React, {useEffect, useRef, useState} from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {chartModel} from "../../../Redux/pages/Chart/reducers/chartReducer";
import groupReducer from "../../../Redux/reducers/groupReducer";

function App(props) {
    const {chartReducer} = props
    const [selectedType, setSelectedType] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        if (selectedType === "") {
            props.getGroup();
            props.getRoom();
        } else if (selectedType === "Juft") {
            props.getEvenGroup()
        } else {
            props.getOddGroup()
        }
    }, [selectedType])

    function selectBtn(x) {
        setSelectedType(x)
    }


    function yarim(start, end) {
        const start1 = moment(`2023-07-05 ${start}`, 'YYYY-MM-DD HH:mm:ss');
        const end1 = moment(`2023-07-05 ${end}`, 'YYYY-MM-DD HH:mm:ss');
        const duration = moment.duration(end1.diff(start1));
        const numberOfIntervals = duration.as('minutes') / 30;
        return numberOfIntervals
    }

    function detectPosition(x) {
        let y = x.substring(0, 2)
        let z = x.substring(3, 5)
        let a = 85
        if (y === 9) {
            if (z === 30) {
                return a * 1
            } else {
                return 10
            }
        } else if (y == 10) {
            if (z == 30) {
                return 3 * a
            } else {
                return 2 * a
            }
        } else if (y == 11) {
            if (z == 30) {
                return 5 * a
            } else {
                return 4 * a
            }
        } else if (y == 12) {
            if (z == 30) {
                return 7 * a
            } else {
                return 6 * a
            }
        } else if (y == 13) {
            if (z == 30) {
                return 9 * 80
            } else {
                return 8 * 80
            }
        } else if (y == 14) {
            if (z == 30) {
                return 11 * 80
            } else {
                return 10 * 80
            }
        } else if (y == 15) {
            if (z == 30) {
                return 13 * 80
            } else {
                return 12 * 80
            }
        } else if (y == 16) {
            if (z == 30) {
                return 15 * 80
            } else {
                return 14 * 80
            }
        } else if (y == 17) {
            if (z == 30) {
                return 17 * 80
            } else {
                return 16 * 80
            }
        } else if (y == 18) {
            if (z == 30) {
                return 19 * 80
            } else {
                return 18 * 80
            }
        } else if (y == 19) {
            if (z == 30) {
                return 21 * 80
            } else {
                return 20 * 80
            }
        } else if (y == 20) {
            if (z == 30) {
                return 23 * 80
            } else {
                return 22 * 80
            }
        } else {
            return 0
        }
    }

    function goToGroupInfo(groupId) {
        navigate("/adminHome/adminGroup/" + groupId)
    }

    return (
        <div>
            <h1 className={"text-center"}>Jadval</h1>
            <div className={"d-flex align-items-center gap-3"}>
                <button onClick={() => selectBtn('Juft')}
                        className={(selectedType === "Juft") ? "btn btn-dark" : "btn btn-outline-dark"}>Juft
                </button>
                <button onClick={() => selectBtn('Toq')}
                        className={(selectedType === "Toq") ? "btn btn-dark" : "btn btn-outline-dark"}>Toq
                </button>
            </div>
            <div className={"box"}>
                <div className={"top d-flex"} style={{width: 2000}}>
                    <div style={{paddingRight: 123, height: 60}} className={"border"}>
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        9:00
                    </div>
                    <div style={{width: 100}} className={"border m-0 d-flex justify-content-center align-items-center"}>
                        9:30
                    </div>
                    <div style={{width: 100}} className={"border m-0 d-flex justify-content-center align-items-center"}>
                        10:00
                    </div>
                    <div style={{width: 100}} className={"border m-0 d-flex justify-content-center align-items-center"}>
                        10:30
                    </div>
                    <div style={{width: 100}} className={"border m-0 d-flex justify-content-center align-items-center"}>
                        11:00
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        11:30
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        12:00
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        12:30
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        13:00
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        13:30
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        14:00
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        14:30
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        15:00
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        15:30
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        16:00
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        16:30
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        17:00
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        17:30
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        18:00
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        18:30
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        19:00
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        19:30
                    </div>
                    <div style={{width: 100}}
                         className={"border m-0 d-flex justify-content-center align-items-center p-1"}>
                        20:00
                    </div>
                </div>
                {
                    chartReducer.rooms.map((item, index) => {
                        return <div key={index} className={"border bottom d-flex"} style={{width: 2000}}>
                            <div className={"left-side p-3 border"} style={{width: 125}}>
                                {item.name}
                            </div>
                            <div className={"right-side d-flex align-items-center"} style={{position: "relative"}}>
                                {
                                    chartReducer.groups.filter(i => i.roomId === item.id).map((i1, index1) => {
                                        return <div key={index1} onClick={() => goToGroupInfo(i1.id)}
                                                    className={"bg-primary d-flex justify-content-center align-items-center text-white"}
                                                    style={{
                                                        cursor: "pointer",
                                                        height: 40,
                                                        border: "1px solid",
                                                        borderRadius: "7px",
                                                        position: "absolute",
                                                        left: detectPosition(i1.startTime),
                                                        width: (yarim(i1.startTime, i1.endTime) === 1 ? (yarim(i1.startTime, i1.endTime) * 116) : (yarim(i1.startTime, i1.endTime) * 76))
                                                    }}>
                                            {i1.name}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default connect(state => state, chartModel)(App);

