import React, { useEffect, useState } from "react";
import Select from "react-select";
import Table from "../Table/Table";
import { connect, useDispatch } from "react-redux";
import tableReducer, {
  tableActions,
} from "../../../Redux/reducers/tableReducer";
import './Filter.css'
function Filter(props) {
  const [options] = useState([
    { value: "10", label: "Option" },
    { value: "20", label: "Option" },
    { value: "30", label: "Option" },
    { value: "40", label: "Option" },
  ]);
  const [optionsActive] = useState([
    { value: "", label: "All" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ]);
  const [optionsWeeks] = useState([
    { value: "1", label: "All weeks" },
    { value: "2", label: "Every weeks" },
    { value: "3", label: "Odd weeks" },
  ]);
  const [optionsTin] = useState([
    { value: "1", label: "TIN" },
    { value: "2", label: "With TIN" },
    { value: "3", label: "Without TIN" },
  ]);
  const [optionsDay] = useState([
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
    { value: "6", label: "Sunday" },
  ]);
  const formInputsProps = props.table.formInputs;

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: 8,
      minHeight: 34,
      border: "1px solid #d1d1d1",
    }),
  };

  function handleChangeActive(obj) {
    const { name, value } = obj;
    props.changeInputForms({ ...formInputsProps, [name]: value });
    props.getActiveData(props.paginationApi);
  }

  function handleChangeSearch(val) {
    props.changeQuickSearch(val);
    props.getQuickSearchData(props.paginationApi);
  }
  return (
    <div>
      <div className="row">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {props.search
            ? props.search.map((item, index) => {
                return (
                  <div className={"my-2"} style={{ width: 300 }}>
                    <Select
                      key={index}
                      options={item.options}
                      styles={customStyles}
                      isMulti={item.multi}
                      onChange={(e) =>
                        handleChangeActive({ name: item.name, value: e })
                      }
                      placeholder={item.placeholder}
                    />
                  </div>
                );
              })
            : ""}
          {props.quickSearch ? (
            <label className="" style={{ height: 30 }}>
              <span style={{ width: 60, height: 30 }}>Quick search:</span>
              <input
                value={formInputsProps.quickSearch}
                onChange={(e) => handleChangeSearch(e.target.value)}
                type="search"
                style={{ width: 180, height: 30 }}
                className="my-1 quickSearch"
                placeholder=""
              />
            </label>
          ) : (
            ""
          )}
          {

            props.filterButton
                ?
            <button
              onClick={() => props.getFilteredData(props.paginationApi)}
              className={"btn btn-primary"}
              style={{ display: "inline-block", height: 40 }}
            >
              Filter
            </button>
          : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => state, tableActions)(Filter);
