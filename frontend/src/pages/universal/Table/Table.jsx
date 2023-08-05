import Select from "react-select";
import { connect, useDispatch } from "react-redux";
import { tableActions } from "../../../Redux/reducers/tableReducer";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import "./Table.css";
import Filter from "../Filter/Filter";
import axios from "axios";
import Dropdown from "../Dropdown/Dropdown";
const Table = (props) => {
  useEffect(() => {
    props.claimData({ columns: props.columnsProps, data: props.dataProps });
    if (props.pagination === true && !props.paginationApi)
      alert("Pagination API is  required!");
    if (props.paginationApi) {
      props.changePaginationTo({
        api: props.paginationApi,
        size:
          props.sizeOfPage === 0
            ? props.changeSizeModeOptions[0]
            : props.sizeOfPage,
        page: props.currentPage,
      });
    }
  }, [props.dataProps]);

  function handleChange(e, page) {
    props.handlePageChange(page);
    props.changePaginationTo({
      api: props.paginationApi,
      size: props.sizeOfPage,
      page: props.page,
    });
  }
  const [optionsActive] = useState([
    { value: "", label: "All" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ]);
  return (
    <div className="universal_table">
      <Filter
        search={[
          {
            name: "active",
            multi: false,
            options: optionsActive,
            defaultValue: { value: "", label: "All" },
            placeholder: "Active",
          },
        ]}
      />
      <div>
        <div className="d-flex justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-end">
            <Dropdown
              multiSelect={false}
              dropdownId="1"
              body={props.changeSizeModeOptions}
              onItemClick={(item) => {
                props.handlePageChange(1);
                props.changePaginationTo({
                  api: props.paginationApi,
                  size: item,
                  page: 1,
                });
              }}
            />
            <Dropdown
              customTitle="Table Setup"
              multiSelect={true}
              dropdownId="2"
              body={props.columnsProps.map((item) => item.title)}
              onItemClick={(item) => {
                props.filterVisibility(item);
              }}
            />
            <button
              style={{ width: "100px" }}
              className="custom_btn"
              download
              onClick={() => {
                props.getExcelFile(props.data);
              }}
            >
              Excel
            </button>

            {/* 👇 Column Order 👇  */}
            <button
              data-toggle="modal"
              data-target="#exampleModal"
              className="custom_btn"
              onClick={() => props.setColumnModalVisibility(true)}
            >
              Column Order
            </button>
          </div>

          {/* 👇 Column Order 👇  */}
          {props.columnOrderMode && props.columns.length ? (
            <Filter quickSearch></Filter>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Bootstrap Modal */}

      {props.columnOrderModalVisibility ? (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body d-flex flex-column gap-1">
                {props.modalColumns.map((item, index) => (
                  <div
                    draggable={true}
                    onDrop={(e) => {
                      e.preventDefault();
                      props.dropColumn(index);
                    }}
                    onDragStart={() => {
                      props.setCurrentDragingColumn(index);
                    }}
                    key={item.id}
                    onDragOverCapture={(e) => e.preventDefault()}
                    className={
                      "w-100 d-flex bg-secondary text-white p-2" +
                      (item.show ? "" : " hidden")
                    }
                  >
                    {item.title}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => props.setModalColumns(props.columns)}
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={props.saveColumnOrder}
                  data-dismiss="modal"
                  type="button"
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* 👇 Table Data 👇  */}

      <table className="table mytable">
        <thead>
          <tr>
            {props.columns.map((item) => (
              <th className={item.show ? "" : " hidden"} key={item.id}>
                {item.show ? item.title : ""}
              </th>
            ))}
            {props.additionalColumns ? <th>More</th> : ""}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => (
            <tr key={item.id}>
              {props.columns.map((col) =>
                col.type === "jsx" ? (
                  <td className={col.show ? "" : " hidden"}>
                    {col.data ? col.data(item) : ""}
                  </td>
                ) : (
                  <td className={col.show ? "" : " hidden"} key={col.id}>
                    {item[col.key]}
                  </td>
                )
              )}
              {props.additionalColumns ? (
                <td>{props.additionalColumns}</td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 👇 Pagination 👇  */}
      <div className="d-flex justify-content-end pe-5">
        {props.columns.length ? (
          <Pagination
            onChange={(e, page) => props.handleChange(e, props.page)}
            page={props.currentPage}
            count={props.totalPages}
            variant="outlined"
            shape="rounded"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default connect((state) => state.table, tableActions)(Table);
