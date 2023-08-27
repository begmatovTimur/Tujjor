import React, {useEffect, useState} from "react";
import "./clients.css";
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "../../Redux/reducers/clientsReducer";
import UniversalModal from "../universal/Modal/UniverModal";
import Table from "../universal/Table/Table";
import Filter from "../universal/Filter/Filter";
import {teritoryAction} from "../../Redux/reducers/teritoryReducer";
import {customerCategoryActions} from "../../Redux/reducers/customerCategoryReducer";
import JsxContentForAddClientModal from "./forClientAddModal/JsxContentForAddClientModal";

function Clients(props) {
  const { clients } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    props.getClients();
    localStorage.setItem("sidebar_button", "5")
  }, []);

  useEffect(() => {
    dispatch(teritoryAction.getCities());
    dispatch(customerCategoryActions.getCategory());
  }, [dispatch]);

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
      title: "Client name",
      key: "clientName",
      type: "text",
      show: true,
    },
    {
      id: 2,
      title: "Company name",
      key: "companyName",
      type: "text",
      show: true,
    },
    {
      id: 3,
      title: "Telephone",
      key: "telephone",
      type: "text",
      show: true,
    },
    {
      id: 4,
      title: "Territory",
      key: "region",
      type: "text",
      show: true,
    },
    {
      id: 5,
      title: "Address",
      key: "address",
      type: "text",
      show: true,
    },
    {
      id: 6,
      title: "Category",
      key: "categoryName",
      type: "text",
      show: true,
    },
    {
      id: 7,
      title: "Activity",
      key: "active",
      type: "boolean",
      show: true,
    },
    {
      id: 8,
      title: "Registration Date",
      key: "registrationDate",
      type: "text",
      show: true,
    },
    {
      id: 9,
      title: "Update",
      key: "button",
      type: "jsx",
      show: true,
      data: (item) => (
        <button
          className="custom_edit_btn"
          onClick={() => {
            props.editeClients(item);
          }}
        >
          <i className="fa fa-edit"></i>
        </button>
      ),
    },
  ];

  const [optionsActive] = useState([
    { value: "", label: "All" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ]);

  const [optionsAllWeeks] = useState([
    { value: "1", label: "All Weeks" },
    { value: "2", label: "Odd Weeks" },
    { value: "3", label: "Even Weeks" },
  ]);

  const [optionsTin] = useState([
    { value: "", label: "Tin" },
    { value: "true", label: "With Tin" },
    { value: "false", label: "Without Tin" },
  ]);

  const [optionsLocation] = useState([
    { value: "1", label: "Location" },
    { value: "2", label: "Yes" },
    { value: "3", label: "No" },
  ]);

  function generateOptionsOfCity() {
    const optionsCity = [];
    props.teritory.regions.map((item) => {
      optionsCity.push({
        value: item.id,
        label: item.region,
      });
    });
    return optionsCity;
  }

  function generateOptionsOfCategory() {
    const optionsCategory = [];
    props.customerCategory.categories.map((item) => {
      optionsCategory.push({
        label: item.name,
        value: item.id,
      });
    });
    return optionsCategory;
  }

  function checkInpValue() {
    if (clients.teritoryId !== ""
        || clients.name !== ""
        || clients.address !== ""
        || clients.telephone !== ""
        || clients.tin !== ""
        || clients.active !== false
        || clients.categoryId !== ""
        || clients.companyName !== ""
        || clients.longitute !== ""
        || clients.latitute !== ""){
      return true;
    }else {
      return false
    }
  }

  return (
    <div style={{border:"1px solid", width: "100%", height:"100%", backgroundColor: "#dae2e3"}}>
      <div id={"clientsFatherDiv"}>
        <div style={{ height: "100%"}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #dae2e3",
              marginTop: "10px",
            }}
          >
            <p style={{ fontSize: "30px" }}>Clients</p>
            <button
              onClick={() => props.openModal()}
              style={{
                display: "block",
                height: "40px",
                backgroundColor: "#4dce4d",
                border: "none",
                padding: "5px 15px",
                color: "white",
              }}
            >
              + Add Client
            </button>
          </div>
          <div>
            <Filter
              search={[
                {
                  name: "active",
                  multi: false,
                  options: optionsActive,
                  defaultValue: { value: "", label: "All" },
                  placeholder: "Active",
                  selfEmployer: false,
                },
                {
                  name: "city",
                  multi: true,
                  options: generateOptionsOfCity(),
                  defaultValue: { value: "", label: "All" },
                  placeholder: "City",
                  selfEmployer: false,
                },
                {
                  name: "customerCategories",
                  multi: true,
                  options: generateOptionsOfCategory(),
                  defaultValue: { value: "", label: "All" },
                  placeholder: "Customer categories",
                  selfEmployer: false,
                },
                {
                  name: "day",
                  multi: false,
                  defaultValue: { value: "", label: "All" },
                  placeholder: "day",
                  selfEmployer: false,
                },
                {
                  name: "allWeeks",
                  multi: false,
                  options: optionsAllWeeks,
                  defaultValue: { value: "", label: "All" },
                  placeholder: "All weeks",
                  selfEmployer: false,
                },
                {
                  name: "tin",
                  multi: false,
                  options: optionsTin,
                  defaultValue: { value: "", label: "All" },
                  placeholder: "Tin",
                  selfEmployer: false,
                },
                {
                  name: "location",
                  multi: false,
                  defaultValue: { value: "", label: "All" },
                  placeholder: "Location",
                  selfEmployer: false,
                },
                {
                  name: "withInventory",
                  multi: false,
                  defaultValue: { value: "", label: "All" },
                  placeholder: "With Inventory",
                  selfEmployer: false,
                },
              ]}
              filterButton={true}
            />
            <Table
              localStoragePath="clients"
              pagination={true}
              changeSizeMode={true}
              paginationApi={"/client/pagination?page={page}&limit={limit}"}
              dataProps={clients.clients}
              columnOrderMode={true}
              changeSizeModeOptions={["All", 5, 20, 50, 100, 200]}
              columnsProps={columns}
              fileName={"clients"}
              excelPath={"/excel?component=clients&"}
            />
          </div>
        </div>
      </div>
      <UniversalModal
          checkPage={checkInpValue()}
        modalTitle={clients.editeClient === "" ? "Add Client" : "Edite Client"}
        isOpen={clients.openModal}
        closeFunction={() => props.closeModal()}
        width={70}
        functionforSaveBtn={() => props.saveClients()}
        height={200}
        JsxData={
          <JsxContentForAddClientModal/>
        }
      />
    </div>
  );
}

export default connect((state) => state, clientsAction)(Clients);
