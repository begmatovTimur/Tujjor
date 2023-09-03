import {connect} from 'react-redux';
import { agentActions } from './Redux/Reducers/agentReducer';
import { useEffect } from 'react';
import Table from 'pages/universal/Table/Table';

function Agents(props) {
    useEffect(()=>{
        props.getAgents()
    },[])
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
            title: "Id",
            key: "id",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Telephone",
            key: "phone",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Username",
            key: "username",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        // props.editeClients(item);
                    }}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ),
        },
        ]
   
    return (
        <div>
        <UniversalModal
            modalTitle={"Add Category"}
            isOpen={customerCategory.openModal}
            closeFunction={() => props.handleClose()}
            width={40}
            checkPage={getCheckPage()}
            functionforSaveBtn={() => props.saveCategory()}
            inpData={[
                {
                    id: 1,
                    title: "Username",
                    value: customerCategory.region,
                    onChange: (e) => props.handleRegion(e.target.value),
                    type: "text",
                },
                {
                    id: 2,
                    title: "Code ",
                    value: customerCategory.code,
                    onChange: (e) => props.handleCode(e.target.value),
                    type: "number",
                },
                {
                    id: 3,
                    title: "Name ",
                    value: customerCategory.name,
                    onChange: (e) => props.handleName(e.target.value),
                    type: "text",
                }
            ]}
        />
        <Table
    localStoragePath="agents"
    pagination={false}
    changeSizeMode={false}
    paginationApi={""}
    dataProps={props.agents}
    columnOrderMode={false}
    changeSizeModeOptions={["All", 5, 20, 50, 100, 200]}
    columnsProps={columns}
    fileName={"agents"}
    excelPath={"/excel?component=clients&"} 
/>
        </div>
    );
}

export default connect((state=>state.agents),agentActions)(Agents);