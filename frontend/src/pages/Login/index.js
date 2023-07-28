import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginModel } from "../../Redux/reducers/loginReducer";
import { Button } from "reactstrap";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
function Index(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { loginReducer } = props;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      loginReducer.navigateTo !== "" &&
      location.pathname !== loginReducer.navigateTo
    ) {
      navigate(loginReducer.navigateTo);
    }
  });
  return (
    //     <MDBInput wrapperclassName='mb-4' label='PhoneNumber' value={loginReducer.phone} onChange={(e)=>props.changePhone(e.target.value)}  id='formControlLg' type='tel' size="lg"/>
    // <MDBInput wrapperclassName='mb-4' label='Password' id='formControlLg' value={loginReducer.password} onChange={(e)=>props.changePassword(e.target.value)} type='text' size="lg"/>
    //
    // <MDBBtn onClick={()=>props.loginUser()} className="mb-0 px-5" size='lg'>Login</MDBBtn>
    <div>
      {/* <div id="modalchaLogIn">
        <div className="form">
          <h1 style={{ fontFamily: "cursive", marginBottom: "15px" }}>
            Tizimga kirish
          </h1>
          <TextField
            value={loginReducer.phone}
            onChange={(e) => props.changePhone(e.target.value)}
            style={{ width: "100%" }}
            type={"text"}
            id="outlined-basic"
            label="Telefon raqamingizni kiriting"
            variant="outlined"
          />
          <TextField
            value={loginReducer.phone}
            onChange={(e) => props.changePhone(e.target.value)}
            style={{ width: "100%" }}
            type={"password"}
            id="outlined-basic"
            label="Parolingizni kiriting"
            variant="outlined"
          />
          <FormControl
            style={{ marginTop: 10, width: "100%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Parolingizni kiriting
            </InputLabel>
            <OutlinedInput
              value={loginReducer.password}
              onChange={(e) => props.changePassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Parolingizni kiriting"
            />
          </FormControl>

          <Button
            onClick={loginhere}
            style={{
              backgroundColor: "#1c4b78",
              marginTop: 20,
              marginBottom: 13,
              width: "100%",
              height: 50,
            }}
            variant="contained"
          >
            Kirish
          </Button>
        </div>
      </div> */}
      <ToastContainer />
    </div>
  );
}

export default connect((state) => state, loginModel)(Index);
