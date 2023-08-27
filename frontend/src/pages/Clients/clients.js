import React, {useEffect, useState} from "react";
import "./clients.css";
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "../../Redux/reducers/clientsReducer";
import Table from "../universal/Table/Table";
import Filter from "../universal/Filter/Filter";
import {teritoryAction} from "../../Redux/reducers/teritoryReducer";
import {customerCategoryActions} from "../../Redux/reducers/customerCategoryReducer";
import HeaderForClient from "./HeaderForClient/HeaderForClient";
import ModalForClient from "./ModalForClient/ModalForClient";
import TableForClient from "./TableForClient/TableForClient";
import FilterForClient from "./FilterForClient/FilterForClient";

function Clients(props) {
  const { clients } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    props.getClients();
    localStorage.setItem("sidebar_button", "5")
  }, []);

  useEffect(() => {
    dispatch(teritoryAction.getCities());
    dispatch(customerCategoryActions.getCategory());
  }, [dispatch]);

  return (
    <div id={"fatherDivForClients"}>
      <div id={"clientsFatherDiv"}>
          <HeaderForClient/>
          <div>
            <FilterForClient/>
            <TableForClient/>
          </div>
      </div>
      <ModalForClient/>
    </div>
  );
}

export default connect((state) => state, clientsAction)(Clients);
