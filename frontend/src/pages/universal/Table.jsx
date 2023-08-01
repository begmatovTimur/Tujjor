import Select from "react-select";
import { connect } from "react-redux";
import { tableActions } from "../../Redux/reducers/tableReducer";
import { useEffect } from "react";
import "./Table.css";
const Table = ({
  columnsProps,
  dataProps,
  columnOrderModalVisibility,
  columns,
  pagination,
  changeSizeMode,
  setColumnModalVisibility,
  changePage,
  claimData,
  filterVisibility,
  paginationApi,
  handlePageChange,
  chageSizeOfPage,
  sizeOfPage,
  changeCurrentPage,
  data,
  changeSizeModeOptions,
  columnOrderMode,
  currentPage,
  saveColumnOrder,
  setCurrentDragingColumn,
  currentDraggingColumn,
  dropColumn,
  modalColumns,
  setModalColumns,
}) => {
  useEffect(() => {
    claimData({ columns: columnsProps, data: dataProps });
    if (pagination === true && !paginationApi)
      alert("Pagination API is  required!");
      if(paginationApi) {
        chageSizeOfPage({
          api: paginationApi,
          size: 10,
          page: currentPage,
        });
      }
  }, [dataProps]);
 


  return (
    <div className="universal_table">
      {/* 👇 Pagination Per Page Changing Select 👇  */}
      {changeSizeMode && columns.length ? (
        <label className="w-25">
          <span>Items in per page:</span>

          <select
            className="form-select"
            defaultValue={"10"}
            onChange={(e) => {
              handlePageChange(0);
              chageSizeOfPage({
                api: paginationApi,
                size: parseInt(e.target.value),
                page: 0,
              });
            }}
          >
            {changeSizeModeOptions.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </label>
      ) : (
        ""
      )}

      {/* 👇 Column Order & Table Hide Columns 👇  */}
      <div className="d-flex align-items-end">
        {/* 👇 Hide / Show Columns 👇  */}
        <label className="w-25">
          <span>Hide / Show Columns</span>
          <Select
            isMulti
            name="columns"
            options={columns.map((item) => ({
              label: item.title,
              value: item.id,
            }))}
            onChange={(state, action) =>
              filterVisibility({ selectedItem: state, action })
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </label>

        {/* 👇 Column Order 👇  */}
        {columnOrderMode && columns.length ? (
          <button
            data-toggle="modal"
            data-target="#exampleModal"
            className="column_order"
            onClick={() => setColumnModalVisibility(true)}
          >
            Column Order
          </button>
        ) : (
          ""
        )}
      </div>

      {/* Bootstrap Modal */}

      {columnOrderModalVisibility ? (
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
                {modalColumns.map((item, index) => (
                  <div
                    draggable={true}
                    onDrop={(e) => {
                      e.preventDefault();
                      dropColumn(index);
                    }}
                    onDragStart={() => {
                      setCurrentDragingColumn(index);
                    }}
                    key={item.id}
                    onDragOverCapture={(e) => e.preventDefault()}
                    className={"w-100 d-flex bg-secondary text-white p-2"+(item.show?"":" hidden")}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setModalColumns(columns)}
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={saveColumnOrder}
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

      <div className="container">
        <div className="table-container">
          <table className="table mytable">
            <thead>
              <tr>
                {columns.map((item) => (
                  <th key={item.id} className={item.show ? "active" : "hidden"}>
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td className={col.show ? "" : "hidden"} key={col.id}>
                      {item[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 👇 Pagination 👇  */}

      {columns.length && pagination ? (
        <div className="d-flex gap-2 pagination justify-content-end">
          {dataProps.length > 1 ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                changePage({
                  current: currentPage - 1,
                  size: dataProps.length / sizeOfPage,
                });
                chageSizeOfPage({
                  api: paginationApi,
                  size: sizeOfPage,
                  page: currentPage,
                });
              }}
            >
              Prev
            </button>
          ) : (
            ""
          )}
          {Array.from(
            { length: Math.ceil(dataProps.length / sizeOfPage) },
            (_, index) => index + 1
          ).map((item, index) => (
            <button
              className="btn btn-primary"
              disabled={currentPage === index}
              key={index}
              onClick={() => {
                changePage({
                  current: index,
                  size: dataProps.length / sizeOfPage,
                });
                chageSizeOfPage({
                  api: paginationApi,
                  size: sizeOfPage,
                  page: index,
                });
              }}
            >
              {index + 1}
            </button>
          ))}
          {dataProps.length > 1 ? (
            <button
              className="btn btn-success"
              onClick={() => {
                if (dataProps.length / sizeOfPage === currentPage + 1) return;
                changePage({
                  current: currentPage + 1,
                  size: dataProps.length / sizeOfPage,
                });
                chageSizeOfPage({
                  api: paginationApi,
                  size: sizeOfPage,
                  page: currentPage + 1,
                });
              }}
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default connect((state) => state.table, tableActions)(Table);
