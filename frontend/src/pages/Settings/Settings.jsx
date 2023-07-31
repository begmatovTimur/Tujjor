import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { settingsActions } from "../../Redux/reducers/settingsReducer";
import { useEffect } from "react";
import "./Settings.css";
const Settings = ({ data, getData, activeButtonIndex, setCurrentIndex }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);
  console.log();
  return (
    <div className="settings">
      <div className="left">
        {data.map((item, index) => (
          <button
            key={item.id}
            className={
              "settings_button" +
              (activeButtonIndex === index ? " active_button" : " ")
            }
            onClick={() => {
              navigate("/admin/settings"+item.path);
              localStorage.setItem("selectedSettingsButton", index);
              setCurrentIndex(index);
            }}
          >
            {index + 1}. {item.name}
          </button>
        ))}
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
};

export default connect((state) => state.settings, settingsActions)(Settings);
