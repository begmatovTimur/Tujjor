import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { connect, useSelector } from "react-redux";
import { teritoryAction } from "../../Redux/reducers/teritoryReducer";
import Table from "../universal/Table/Table";
import axios from "axios";
import apiCall from "../../Config/apiCall";
import "./Teritory.css";

const style = {
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  bgColor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "10px",
  overflow: "auto",
};

function Teritory(props) {
  // const [data, setData] = useState([]);
  //
  // let columns = [
  //   {
  //     id: 1,
  //     title: "Region",
  //     key: "region",
  //     type: "text",
  //     show: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Name",
  //     key: "name",
  //     type: "text",
  //     show: true,
  //   },
  // ];
  //
  // useEffect(() => {
  //   apiCall("/territory", "GET", ).then(
  //     ({ data }) => {
  //       setData(data);
  //     }
  //   );
  // }, []);
  //
  //
  // const { teritory } = props;
  // function handleMapClick(event) {
  //   const coords = event.get("coords");
  //   const latitude = coords[0];
  //   const longitude = coords[1];
  //   props.handleTemplate([longitude, latitude]);
  //   props.handleMapState({ center: [latitude, longitude], zoom: 10 });
  // }

  function a(data) {
    console.log(data)
  };

  const { teritory } = props;

  useEffect(() => {
    props.getTeritory();
  }, []);

  function handleMapClick(event) {
    const coords = event.get("coords");
    const latitude = coords[0];
    const longitude = coords[1];
    props.handleTemplate([longitude, latitude]);
    props.handleMapState({ center: [latitude, longitude], zoom: 10 });
  }

  const columns = [
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
    },{
      id: 4,
      title: "Edit",
      key: "button",
      type: "jsx",
      show: true,
      data: (item)=><button className="btn btn-warning" onClick={()=>a(item)}>Edit</button>
    }
  ];

  return (
    <div style={{ width: "100%" }}>
      <div className="d-flex flex-column align-items-start">
        <div className="title">Territory</div>
        <div className="btn btn-success ms-4" onClick={() => props.handleOpen()}>
          Add Territory +
        </div>
      </div>

      <Table
        pagination={true}
        changeSizeMode={true}
        paginationApi={"http://localhost:8080/api/territory/pagination?page={page}&limit={limit}"}
        dataProps={teritory.teritories}
        columnOrderMode={true}
        changeSizeModeOptions={[1,2,3,4,5]}
        columnsProps={columns}
      />

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
          <div className={"d-flex gap-3 p-5 bg-white"}>
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
                  {teritory.template &&
                    teritory.longitute !== "" &&
                    teritory.latitude !== "" && (
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
    </div>
  );
}

export default connect((state) => state, teritoryAction)(Teritory);
