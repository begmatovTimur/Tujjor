import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Pagination from "@mui/material/Pagination";
import Filter from "../Filter/Filter";
import Dropdown from "../Dropdown/Dropdown";
import UniversalModal from "../Modal/UniverModal";
import { tableActions } from "../../../Redux/reducers/tableReducer";
import { jsxDEV } from "react/jsx-dev-runtime"; // Make sure you import jsxDEV

import "./Table.css";

const Table = (props) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    props.reorderColumns({ sourceIndex, destinationIndex });
  };

  useEffect(() => {
    try {
      props.claimData({
        columns: localStorage.getItem(props.localStoragePath)
          ? JSON.parse(localStorage.getItem(props.localStoragePath)).length?JSON.parse(localStorage.getItem(props.localStoragePath)).map(
              (item) => {
                if (props.columnsProps[item.id] === undefined) {
                  localStorage.removeItem(props.localStoragePath);
                  return;
                }
                return { ...props.columnsProps[item.id], show: item.show };
              }
            ):props.columnsProps
          : props.columnsProps,
        data: props.dataProps,
        localPath: props.localStoragePath,
      });
    } catch (e) {
       props.claimData({
        columns: props.columnsProps,
        data: props.dataProps,
        localPath: props.localStoragePath,
      });
      localStorage.removeItem(props.localStoragePath);
    }
    if (props.pagination === true && !props.paginationApi)
      alert("Pagination API is required!");
    if (props.paginationApi) {
      props.changePaginationTo({
        api: props.paginationApi,
        size: props.changeSizeModeOptions[0],
        page: props.currentPage,
      });
    }
  }, [props.dataProps]);

  const getValueByKeys = (obj, keys) => {
    const keysArray = keys.split("+").map((key) => key.trim());
    const values = keysArray.map((key) =>
      key.split(".").reduce((acc, k) => (acc && acc[k]) || "", obj)
    );
    return values.join(" ");
  };

  const handleChange = (e, page) => {
    props.handlePageChange(page);
    props.changePaginationTo({
      api: props.paginationApi,
      size: props.sizeOfPage,
      page,
    });
  };

  useEffect(() => {
    props.changeLoadingActive(true);
    setTimeout(() => {
      props.changeLoadingActive(false);
    }, 1000);
    return ()=>{
      props.emptyFilters()
    }
  }, []);




  // console.log(props.data.length?(JSON.parse(localStorage.getItem(props.localStoragePath))).map(item=>{
  //   console.log(props.data[item].name);
  // }):[]);
  // console.log(props.data.lenght?JSON.parse(localStorage.getItem(props.localStoragePath)).map(item=>props.data[item]):"");
  return (
    <div className="universal_table">
      {props.isLoading ? (
        <div
          className="bg-white d-flex justify-content-center align-items-center gap-2 p-2"
          style={{ height: "30vh" }}
        >
          <div>
            <div id="loading-bar-spinner" className="spinner">
              <div className="spinner-icon"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white d-flex flex-column gap-2 p-2">
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-end ">
                  {props.changeSizeMode ? (
                    <Dropdown
                      multiSelect={false}
                      customTitle={"By "+props.changeSizeModeOptions[0]}
                      dropdownId="1"
                      body={props.changeSizeModeOptions.map(item=>({title:item}))}
                      onItemClick={(item) => {
                        props.handlePageChange(1);
                        props.changePaginationTo({
                          api: props.paginationApi,
                          size: item,
                          page: 1,
                        });
                      }}
                    />
                  ) : (
                    ""
                  )}
                  <Dropdown
                    customTitle="Table Setup"
                    multiSelect={true}
                    dropdownId="2"
                    body={props.columns.length!==0?props.columns.map(item=>({title:item.title,show:item.show})):props.copyOfColumns.map(item=>({title:item.title,show:item.show}))}
                    onItemClick={(item) => {
                      props.filterVisibility(item);
                    }}
                  />
                  <button
                    style={{ width: "100px" }}
                    className="custom_btn"
                    download
                    onClick={() => {
                      props.getExcelFile({
                        excelWithoutSearch: props.excelWithoutSearch,
                        path: props.excelPath,
                        fileName: props.fileName,
                      });
                    }}
                  >
                    Excel
                  </button>
                  <button
                    className="custom_btn"
                    onClick={() => props.setColumnModalVisibility(true)}
                  >
                    Column Order
                  </button>
                </div>
                {props.columnOrderMode && props.columns.length ? (
                  <Filter quickSearch></Filter>
                ) : (
                  ""
                )}
              </div>
            </div>
            <UniversalModal
              modalTitle={"Columns order"}
              height="300px"
              isOpen={props.columnOrderModalVisibility}
              closeFunction={() =>
                props.setColumnModalVisibility(false) &
                props.setModalColumns(props.columns)
              }
              width={33}
              functionforSaveBtn={() => props.saveColumnOrder()}
              JsxData={
                <div className="modal-body d-flex flex-column gap-1">
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="columnList" direction="vertical">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {props.modalColumns.map((item, index) =>
                            item.show ? (
                              <Draggable
                                key={item.id.toString()}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={
                                      "w-100 d-flex bg-secondary text-white p-2" +
                                      (item.show ? "" : " hidden")
                                    }
                                    style={{
                                      ...provided.draggableProps.style,
                                      left: 0,
                                      top: 0,
                                      position: "relative",
                                    }}
                                  >
                                    {item.title}
                                  </div>
                                )}
                              </Draggable>
                            ) : (
                              ""
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              }
            />
            <div style={{ height: "380px", overflow: "auto" }}>
              <table className="table mt-2 mytable">
                <thead className={"table_thead"}>
                  <tr>
                    {(props.columns.length === 0
                      ? props.columnsProps
                      : props.columns
                    ).map((item) => (
                      <th className={item.show ? "" : "hidden"}>
                        {item.title}
                      </th>
                    ))}
                    {props.additionalColumns ? <th>More</th> : ""}
                  </tr>
                </thead>
                <tbody>
                  {props.columns.length === 0 ? (
                    <tr>
                      <th colSpan={5} className="text-center">
                        No Data
                      </th>
                    </tr>
                  ) : (
                    ""
                  )}
                  {props.columns.length != 0 &&
                    props.data.map((item, index) => (
                      <tr key={item.id}>
                        {props.columns.map((col) =>
                          col.type === "jsx" ? (
                            <td width="20" className={col.show ? "" : "hidden"}>
                              {col.data(item)}
                            </td>
                          ) : col.type === "index" ? (
                            <td className={col.show ? "" : "hidden"}>
                              {index +
                                1 +
                                props.sizeOfPage * (props.currentPage - 1)}
                            </td>
                          ) : col.type === "boolean" && col.key === "active" ? (
                            <td
                              className={
                                item[col.key]  ? "text-success" + (col.show?"": " hidden") : "text-danger" + (col.show?"": " hidden")
                              }
                            >
                              {item[col.key] ? "active" : "unactive "}
                            </td>
                          ) : col.type !== "jsx" ? (
                            <td className={col.show ? "" : "hidden"}>
                              {getValueByKeys(item, col.key)}
                            </td>
                          ) : (
                            ""
                          )
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {props.pagination && props.data.length && props.columns.length ? (
              <div className="d-flex justify-content-end pt-2">
                <Pagination
                  onChange={(e, page) => handleChange(e, page)}
                  page={props.currentPage}
                  count={props.totalPages}
                  variant="outlined"
                  shape="rounded"
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default connect((state) => state.table, tableActions)(Table);
