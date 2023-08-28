import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import {tableActions} from "../Table/Redux/Reducers/tableReducer";
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "../../Clients/Redux/Reducers/clientsReducer";


function LoadingBackdrop(props) {

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(tableActions.changeIsLoading())
    };
    return (
        <div>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.table.isLoading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
export default connect((state) => state, clientsAction)(LoadingBackdrop);