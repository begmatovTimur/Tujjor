import React, {useEffect} from "react";
import {Map, Placemark, YMaps, ZoomControl,} from "react-yandex-maps";
import {connect} from "react-redux";
import {teritoryAction} from "../../Redux/reducers/teritoryReducer";
import Table from "../universal/Table/Table";
import "./Teritory.css";
import UniversalModal from "../universal/Modal/UniverModal";
import Filter from "../universal/Filter/Filter";

function Teritory(props) {
  const { teritory } = props;

  useEffect(() => {
    props.getTeritory();
  }, []);

  function handleMapClick(event) {
    console.log(event);
    const coords = event.get("coords");
    const latitude = coords[0];
    const longitude = coords[1];
    props.handleTemplate([longitude, latitude]);
    props.handleMapState({ center: [latitude, longitude], zoom: 10 });
  }

  const columns = [
    {
      id: 0,
      title: "№",
      key: "index",
      type: "index",
      show: true,
    },
    {
      id: 1,
      title: "Title",
      key: "name",
      type: "text",
      show: true,
    },
    {
      id: 2,
      title: "Region",
      key: "region",
      type: "text",
      show: true,
    },
    {
      id: 3,
      title: "Code",
      key: "code",
      type: "text",
      show: true,
    },
    {
      id: 4,
      title: "Update",
      key: "button",
      type: "jsx",
      show: true,
      data: (item) => (
        <button
          className="custom_edit_btn"
          onClick={() => {
            props.editeTeritory(item);
          }}
        >
          <i className="fa fa-edit"></i>
        </button>
      ),
    },
  ];

  function checkInpValue() {
    if (teritory.title !== "" || teritory.region !== "" || teritory.code !== "" || teritory.active !==false || teritory.longitute !== "" || teritory.latitute !==""){
      return true;
    }
    return false;
  }

  return (
    <div  style={{ width: "100%", backgroundColor: "#eee"}}>
      <div style={{overflow:"hidden"}} className="d-flex flex-column align-items-start">
        <b className="title">Territory</b>
        <div
          className="custom_add_btn"
          style={{ cursor: "pointer" }}
          onClick={() => props.handleOpen()}
        >
          <i style={{ fontSize: "20px" }} className="fa fa-plus"></i>Add
          Territory
        </div>
      </div>
      <Filter
        search={[
          {
            name: "active",
            multi: false,
            options: teritory.optionsActive,
            defaultValue: { value: "", label: "All" },
            placeholder: "Active",
            selfEmployer: true,
          },
        ]}
      />
      <div style={{height:"75%"}}>
        <Table
            pagination={true}
            changeSizeMode={true}
            excelPath={"/excel?component=territory&"}
            fileName={"territories"}
            localStoragePath="territoryColumns"
            excelWithoutSearch={false}
            paginationApi={"/territory/pagination?page={page}&limit={limit}"}
            dataProps={teritory.teritories}
            columnOrderMode={true}
            changeSizeModeOptions={["All",1,20,30,40,50]}
            columnsProps={columns}
        />
      </div>
      <UniversalModal
        modalTitle={
          teritory.itemForTeritoryEdite === ""
            ? "Add teritory"
            : "Edite teritory"
        }
        checkPage={checkInpValue()}
        isOpen={teritory.openModal}
        closeFunction={() => props.handleClose()}
        width={60}
        functionforSaveBtn={() => props.saveTeritory()}
        JsxData={
          <div className={"w-50"}>
            <YMaps
              query={{
                apikey: "e24090ad-351e-4321-8071-40c04c55f144\n",
                lang: "en_US",
                coordorder: "latlong",
                load: "package.full",
              }}
            >
              <Map
                width={400}
                height={300}
                defaultState={{
                  center: teritory.defaultCenter,
                  zoom: 10,
                }}
                onClick={handleMapClick}
                modules={["templateLayoutFactory"]}
              >
                <ZoomControl options={{ float: "right" }} />
                {teritory.mapState.center[0] === "" ||
                teritory.mapState.center[1] === "" ? (
                  ""
                ) : (
                  <Placemark
                    geometry={teritory.mapState.center}
                    modules={["geoObject.addon.balloon"]}
                  />
                )}
              </Map>
            </YMaps>
            <div className={"d-flex my-3 g-4"}>
              <label>
                Long:
                <input disabled={true} type="text" value={teritory.longitute} />
              </label>
              <label>
                Lat:
                <input disabled={true} type="text" value={teritory.latitute} />
              </label>
            </div>
            <button
              type={"button"}
              className={"btn btn-danger"}
              onClick={() => props.clearAllTeritory()}
            >
              Clear
            </button>
          </div>
        }
        inpData={[
          {
            id: 1,
            title: "Title* ",
            value: teritory.title,
            onChange: (e) => props.handleTitle(e.target.value),
            type: "text",
          },
          {
            id: 2,
            title: "Region ",
            value: teritory.region,
            onChange: (e) => props.handleRegion(e.target.value),
            type: "text",
          },
          {
            id: 3,
            title: "Code ",
            value: teritory.code,
            onChange: (e) => props.handleCode(e.target.value),
            type: "text",
          },
          {
            id: 4,
            title: "Active ",
            value: teritory.active,
            onChange: (e) => props.handleActive(e.target.checked),
            type: "checkbox",
          },
        ]}
      />
    </div>
  );
}

export default connect((state) => state, teritoryAction)(Teritory);