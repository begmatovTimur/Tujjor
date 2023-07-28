import Select from "react-select";
import "./Table.css";
const Table = ({
  columns,
  data,
  pagination,
  changeSizeMode,
  changeSizeOptions,
  setColumns,
}) => {
  function filterVisibility(selectedItem, action) {
    console.log(action);
    if (action.action === "select-option") {
      columns.map((item) => {
        if (action.option.value === item.id) {
          item.show = false;
        }
      });
    } else if (action.action === "remove-value") {
      columns.map((item) => {
        if (action.removedValue.value === item.id) {
          item.show = true;
        }
      });
    }
    setColumns([...columns]);
  }

  return (
    <div>
      {changeSizeMode ? (
        <select className="form-select w-25" defaultValue={"10"}>
          {changeSizeOptions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        ""
      )}
      <Select
        isMulti
        name="columns"
        options={columns.map((item) => ({ label: item.title, value: item.id }))}
        onChange={filterVisibility}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <table className="table">
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
  );
};

export default Table;
