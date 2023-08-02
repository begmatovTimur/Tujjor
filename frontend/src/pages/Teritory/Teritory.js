import React, { useState, useEffect } from "react";
import Table from "../universal/Table/Table";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { connect } from "react-redux";
import { teritoryAction } from "../../Redux/reducers/teritoryReducer";
import apiCall from '../../Config/apiCall';
import "./Teritory.css";
import axios from "axios";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "10px",
  overflow: "auto",
};

function Teritory(props) {
  const [data, setData] = useState([]);

  let columns = [
    {
      id: 1,
      title: "Name",
      key: "name",
      type: "text",
      show: true,
    },
    {
      id: 2,
      title: "Email",
      key: "email",
      type: "text",
      show: true,
    },
    {
      id: 3,
      title: "Body",
      key: "body",
      type: "text",
      show: true,
    },
  ];

  useEffect(() => {
    apiCall("/api/territory","GET").then(({data})=>{
      setData(data)
    })
  }, []);

  const { teritory } = props;
  function handleMapClick(event) {
    const coords = event.get("coords");
    const latitude = coords[0];
    const longitude = coords[1];
    props.handleTemplate([longitude, latitude]);
    props.handleMapState({ center: [latitude, longitude], zoom: 10 });
  }

  return (
    <div className="teritory">
      <div className="title">Territory</div>
      <div className="d-flex justify-content-end w-100">
        <button
          className="btn btn-success ms-4 "
          onClick={() => props.handleOpen()}
        >
          Add Territory +
        </button>
      </div>
      <Modal
        open={teritory.openModal}
        onClose={() => props.handleOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              width: "100%",
              height: "50px",
              padding: "10px 0px 0px 45px",
              fontSize: "18px",
              color: "white",
              background: "rgba(64, 125, 178, 0.9)",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Add Teritory
          </div>
          <div className={"d-flex gap-3 p-5"}>
            <div className={"w-50 d-flex flex-column gap-4"}>
              <form className={"d-flex flex-column gap-3"}>
                <label className={"d-flex gap-5"}>
                  Title*{" "}
                  <input
                    required={true}
                    value={teritory.title}
                    onChange={(e) => props.handleTitle(e.target.value)}
                    className={"form-control"}
                    type="text"
                  />
                </label>
                <label className={"d-flex gap-5"}>
                  Region{" "}
                  <input
                    required={true}
                    value={teritory.region}
                    onChange={(e) => props.handleRegion(e.target.value)}
                    className={"form-control"}
                    type="text"
                  />
                </label>
                <label className={"d-flex gap-5"}>
                  Code{" "}
                  <input
                    required={true}
                    value={teritory.code}
                    onChange={(e) => props.handleCode(e.target.value)}
                    className={"form-control"}
                    type="text"
                  />
                </label>
                <label className={"d-flex gap-5"}>
                  active{" "}
                  <input
                    required={true}
                    value={teritory.active}
                    onChange={(e) => props.handleActive(e.target.checked)}
                    className={"form-check-input"}
                    type="checkbox"
                  />
                </label>
              </form>
              <button
                onClick={() => props.saveTeritory()}
                style={{
                  width: "22%",
                  height: "40px",
                  borderRadius: "7px",
                  background: "rgba(64, 125, 178, 0.9)",
                  border: "none",
                  color: "white",
                  display: "block",
                  margin: "60% auto -30px",
                }}
              >
                Add
              </button>
            </div>
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
                    center: [39.7756, 64.4253],
                    zoom: 10,
                  }}
                  onClick={handleMapClick}
                  modules={["templateLayoutFactory"]}
                >
                  <ZoomControl options={{ float: "right" }} />
                  {teritory.template && (
                    <Placemark
                      geometry={teritory.mapState.center}
                      options={{ balloonContentLayout: teritory.template }}
                      modules={["geoObject.addon.balloon"]}
                    />
                  )}
                </Map>
              </YMaps>
              <div className={"d-flex my-3 g-4"}>
                <label>
                  Long:
                  <input
                    disabled={true}
                    type="text"
                    value={teritory.longitute}
                  />
                </label>
                <label>
                  Lat:
                  <input
                    disabled={true}
                    type="text"
                    value={teritory.latitute}
                  />
                </label>
              </div>
              <button
                className={"btn btn-danger"}
                onClick={() => props.clearAllTeritory()}
              >
                Clear
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <Table
        pagination={true}
        changeSizeMode={true}
        dataProps={data}
        columnOrderMode={true}
        changeSizeModeOptions={[10, 20, 30, 40, 50]}
        columnsProps={columns}
        paginationApi={
          "https://jsonplaceholder.typicode.com/comments?_page={page}&_limit={limit}"
        }
      />
    </div>
  );
}

export default connect((state) => state, teritoryAction)(Teritory);
