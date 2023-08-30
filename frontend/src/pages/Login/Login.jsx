import React, {useEffect, useRef} from "react";
import "./login.css";
import {connect} from "react-redux";
import {loginModel} from "./Redux/Reducers/loginReducer";
import {Button} from "reactstrap";
import {ToastContainer} from "react-toastify";
import logo from "images/logo.png";
import PhoneInput from "react-phone-input-2";
import gif from "../../images/loading.gif";
import "react-phone-input-2/lib/style.css";

function Login(props) {
    const { loginReducer } = props;
  useEffect(()=>{
      document.getElementsByClassName("phoneInp")[0].focus()
      props.hasPermissionRoleSuperVisor();
  },[])
  return (
    <div>
      <img id={"logoForLogin"} src={logo} alt="#" />
      <div id="loginForm">
        <div id={"informationCompany"}>Company information...</div>
          <form onSubmit={(e)=>props.loginHere(e)}>
              <div className="form">
                  <PhoneInput
                      inputStyle={{ width: "100%"}}
                      country={"uz"}
                      value={loginReducer.phone}
                      onChange={(e) => props.changePhone(e)}
                      className={"phoneInp"}
                  />
                  <div style={{position:"relative", display:"flex"}}>
                      <input
                          className={"form-control"}
                          value={loginReducer.password}
                          onChange={(e) => props.changePassword(e.target.value)}
                          style={{ width: "100%", marginTop: "20px", paddingRight:"50px"}}
                          type={loginReducer.showPassword ? "text" : "password"}
                          id="outlined-basic"
                          label="Enter your password"
                          variant="outlined"
                          placeholder={"Type a password..."}
                      />
                      {!loginReducer.showPassword ? (
                          <button
                              type={"button"}
                              className={"eyes_button"}
                              onClick={() => props.setShowPassword()}
                          >
                <i className="fa-solid fa-eye fa-xl"></i>
              </button>
                      ) : (
                          <button
                              type={"button"}
                              className={"eyes_button"}
                              onClick={() => props.setShowPassword()}
                          >
                <i className="fa-solid fa-eye-slash fa-xl"></i>
              </button>
                      )}
                  </div>
                  <div className={"d-flex justify-content-between"}>
                      <label className={"my-3 d-flex align-items-center gap-1"}>
                          <input
                              value={loginReducer.remember}
                              onChange={(e) => props.rememberMe(e.target.checked)}
                              style={{ width: "20px", height: "20px" }}
                              type="checkbox"
                          />{" "}
                          Remember me
                      </label>
                      <Button
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
          </form>
        <h6 style={{ textAlign: "left", marginTop: "25px" }}>
          Support Servise: 998 97 300 20 27
        </h6>
      </div>
      <ToastContainer />
    </div>
  );
}

export default connect((state) => state, loginModel)(Login);