import React, {useEffect} from "react";
import {connect} from "react-redux";
import {teritoryAction} from "./Redux/Reducers/teritoryReducer";
import "./Teritory.css";
import TerritoryHeader from "./Components/HeaderForTerritory/TerritoryHeader";
import TerritoryFilter from "./Components/FilterForTerritory/TerritoryFilter";
import TableForTerritory from "./Components/TableForTerritory/TableForTerritory";
import ModalForTerritory from "./Components/ModalForTerritory/ModalForTerritory";

function Territory(props) {

  useEffect(() => {
    props.getTeritory();
  }, []);

  return (
    <div id={"fatherDivForTerritory"}>
      <TerritoryHeader/>
      <TerritoryFilter/>
      <TableForTerritory/>
      <ModalForTerritory/>
    </div>
  );
}

export default connect((state) => state, teritoryAction)(Territory);