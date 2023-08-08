import Select from "react-select";
import { connect, useDispatch } from "react-redux";
import { tableActions } from "../../../Redux/reducers/tableReducer";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import Filter from "../Filter/Filter";
import axios from "axios";
import Dropdown from "../Dropdown/Dropdown";
import UniversalModal from "../Modal/UniverModal";
import "./Table.css";
const Table = (props) => {
  useEffect(() => {
    props.claimData({ columns: props.columnsProps, data: props.dataProps });
    if (props.pagination === true && !props.paginationApi)
      alert("Pagination API is  required!");
    if (props.paginationApi) {
      props.changePaginationTo({
        api: props.paginationApi,
        size: props.changeSizeModeOptions[0],
        page: props.currentPage,
      });
    }
  }, [props.dataProps]);
  function handleChange(e, page) {
    props.handlePageChange(page);
    props.changePaginationTo({
      api: props.paginationApi,
      size: props.sizeOfPage,
      page,
    });
  }
  const [optionsActive] = useState([
    { value: "", label: "All" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ]);
  return (
    <div className="universal_table">
      {/*<Filter*/}
      {/*  search={[*/}
      {/*    {*/}
      {/*      name: "active",*/}
      {/*      multi: false,*/}
      {/*      options: optionsActive,*/}
      {/*      defaultValue: { value: "", label: "All" },*/}
      {/*      placeholder: "Active",*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
      <div className="bg-white d-flex flex-column gap-2 p-2">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-end ">
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
                className="custom_btn"
                onClick={() => props.setColumnModalVisibility(true)}
              >
                Column Order
              </button>
            </div>

            {/*/!* 👇 Column Order 👇  *!/*/}
            {/*{props.columnOrderMode && props.columns.length ? (*/}
            {/*  <Filter quickSearch></Filter>*/}
            {/*) : (*/}
            {/*  ""*/}
            {/*)}*/}
          </div>
        </div>

        {/* Universal Modal */}
        {
          <UniversalModal
            modalTitle={"Columns order"}
            isOpen={props.columnOrderModalVisibility}
            closeFunction={() => props.setColumnModalVisibility(false)}
            width={33}
            functionforSaveBtn={() => props.saveColumnOrder()}
            JsxData={
              <div className="modal-body d-flex flex-column gap-1">
                {props.modalColumns.map((item, index) => (
                  item.show?<div
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
                </div>:""
                ))}
              </div>
            }
          />
        }


        {/* 👇 Table Data 👇  */}

        <div style={{ height: '350px', overflow: 'auto' }}>
          <table className="table mt-2 mytable">
            <thead className={"table_thead"}>
            <tr>
              {props.columns.map((item) => (
                  <th className={item.show ? '' : 'hidden'} key={item.id}>
                    {item.show ? item.title : ''}
                  </th>
              ))}
              {
                props.additionalColumns?
                props.additionalColumns ? <th>More</th> : '' :""}
            </tr>
            </thead>
            <tbody>
            {
              props.data?
              props.data.map((item,index) => (
                <tr key={item.id}>
                  {props.columns.map((col) =>
                      col.type === 'jsx' ? (
                          <td width={50} className={col.show ? '' : 'hidden'}>
                            {col.data ? col.data(item) : ''}
                          </td>
                      ) : (
                          <td className={col.show ? '' : 'hidden'} key={col.id}>
                            {col.key==="active"? col.type==="index"?index+1:item[col.key] === true? <p className={'text-success'}>active</p>:
                              <p className={'text-danger'}>no active</p>
                              : col.type==="index"?index+1:item[col.key]}
                          </td>
                      )
                  )}
                  {props.additionalColumns ? <td>{props.additionalColumns}</td> : ''}
                </tr>
            ))
            :""
            }
            </tbody>
          </table>
        </div>

      </div>

      {/* 👇 Pagination 👇  */}
      <div className="d-flex justify-content-end pe-5">
        {props.columns.length ? (
          <Pagination
            onChange={(e, page) => {
              handleChange(e, page);
            }}
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
