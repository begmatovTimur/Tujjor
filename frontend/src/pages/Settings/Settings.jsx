import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {settingsActions} from "../../Redux/reducers/settingsReducer";
import "./Settings.css";

const Settings = ({data, getData, activeButtonIndex, setCurrentIndex}) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(getData());
    }, []);
    useEffect(() => {
        if (localStorage.getItem("selectedSettingsButton") && data.length) {
            if (parseInt(localStorage.getItem("selectedSettingsButton")) < 3) {
                navigate(
                    "/admin/settings" +
                    data[localStorage.getItem("selectedSettingsButton")].path
                );
            }
        }
    }, [data]);
    return (
        <div className="settings">
            <div className="content">
                <div className="left  pt-3">
                    <button className="btn_panel">Settings Panel</button>
                    {data.map((item, index) => (
                        <button
                            key={item.id}
                            className={
                                "settings_button" +
                                (activeButtonIndex === index ? " active_button" : " ")
                            }
                            onClick={() => {
                                navigate("/admin/settings" + item.path);
                                localStorage.setItem("selectedSettingsButton", index);
                                setCurrentIndex(index);
                            }}
                        >
                            <span>{index + 1}</span>. {item.name}
                        </button>
                    ))}
                </div>
                <div className="right">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default connect((state) => state.settings, settingsActions)(Settings);
