import Select from "react-select";
import { connect } from "react-redux";
import { tableActions } from "../../Redux/reducers/tableReducer";
import { useEffect } from "react";
import "./Table.css";
const Table = ({
  columnsProps,
  dataProps,
  columns,
  pagination,
  changeSizeMode,
  changePage,
  claimData,
  filterVisibility,
  paginationApi,
  handlePageChange,
  chageSizeOfPage,
  sizeOfPage,
  changeCurrentPage,
  data,
  currentPage,
}) => {
  useEffect(() => {
    claimData({ columns: columnsProps, data: dataProps });
    if(pagination===true && !paginationApi) alert("Pagination API is  required!");
    if (paginationApi) {
      chageSizeOfPage({
        api: paginationApi,
        size: 10,
        page: currentPage,
      });
    }
  }, [dataProps]);

  return (
    <div className="universal_table">
      {changeSizeMode && columns.length ? (
        <label className="w-25">
          <span>Items in per page:</span>

          <select
            className="form-select"
            defaultValue={"10"}
            onChange={(e) => {
              handlePageChange(0) 
              chageSizeOfPage({
                api: paginationApi,
                size: parseInt(e.target.value),
                page: 0,
              });
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </label>
      ) : (
        ""
      )}
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
                    <td className={col.show ? "active" : "hidden"} key={col.id}>
                      {item[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
