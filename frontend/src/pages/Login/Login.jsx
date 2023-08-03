import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginModel } from "../../Redux/reducers/loginReducer";
import { Button } from "reactstrap";
import { ToastContainer } from "react-toastify";
import logo from "../../images/logo.png";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import gif from "../../images/loading.gif";
import "react-phone-input-2/lib/style.css";
import { ErrorNotify, SuccessNotify } from "../../tools/Alerts";

function Login(props) {
  const { loginReducer } = props;
  const navigate = useNavigate();

  function loginfunction() {
    props.setLoading(true);
    if (!props.loginReducer.loading) {
      setTimeout(() => {
        if (loginReducer.phone === "" || loginReducer.password === "") return;
        axios({
          url: "http://localhost:8080/api/auth/login",
          method: "POST",
          data: {
            phone: loginReducer.phone,
            password: loginReducer.password,
            rememberMe: loginReducer.remember,
          },
        })
          .then((res) => {
            console.log("res");
            props.setLoading(false);
            SuccessNotify("You logined successfully!")
            localStorage.setItem("access_token", res.data.access_token);
            if (res.data.refresh_token !== "") {
              localStorage.setItem("refresh_token", res.data.refresh_token);
              localStorage.setItem("no_token", "success");
            } else {
              localStorage.setItem("no_token", "sorry");
            }
            props.changePhone("");
            props.changePassword("");
            props.rememberMe(false);

            navigate("/admin");
          })
          .catch((err) => {
            console.log(err);
            props.setLoading(false);
            ErrorNotify("Password Or Username Is Wrong!");
            localStorage.clear();
          });
      }, 1000);
    }
  }

  return (
    <div>
      <img id={"logoForLogin"} src={logo} alt="#" />
      <div id="loginForm">
        <div id={"informationCompany"}>Company information...</div>
        <div className="form">
          <PhoneInput
            inputStyle={{ width: "100%" }}
            country={"us"}
            value={loginReducer.phone}
            onChange={(e) => props.changePhone(e)}
          />
          <input
            className={"form-control"}
            value={loginReducer.password}
            onChange={(e) => props.changePassword(e.target.value)}
            style={{ width: "100%", marginTop: "20px" }}
            type={"password"}
            id="outlined-basic"
            label="Enter your password"
            variant="outlined"
            placeholder={"Type a password..."}
          />
          <div className={"d-flex justify-content-between"}>
            <label className={"my-3"}>
              <input
                value={loginReducer.remember}
                onChange={(e) => props.rememberMe(e.target.checked)}
                style={{ width: "20px", height: "20px" }}
                type="checkbox"
              />{" "}
              Remember me
            </label>
            <Button
              onClick={loginfunction}
              style={{
                backgroundColor: "#65b965",
                marginTop: 20,
                width: "30%",
              }}
              variant="contained"
            >
              {props.loginReducer.loading ? (
                <img src={gif} width={25} alt="Loading Gif" />
              ) : (
                <>
                  To come in <i className="fa-solid fa-circle-arrow-right"></i>
                </>
              )}
            </Button>
          </div>
        </div>
        <h6 style={{ textAlign: "left", marginTop: "25px" }}>
          Support Servise: +998 99 999 99 99
        </h6>
      </div>
      <ToastContainer />
    </div>
  );
}

export default connect((state) => state, loginModel)(Login);
