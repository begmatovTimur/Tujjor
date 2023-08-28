import React, {useEffect} from "react";
import {Map, Placemark, YMaps, ZoomControl,} from "react-yandex-maps";
import {connect} from "react-redux";
import {teritoryAction} from "./Redux/Reducers/teritoryReducer";
import Table from "../../../universal/Table/Table";
import "./Teritory.css";
import UniversalModal from "../../../universal/Modal/UniverModal";
import Filter from "../../../universal/Filter/Filter";
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