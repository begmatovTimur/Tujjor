import {connect} from 'react-redux';
import { agentActions } from './Redux/Reducers/agentReducer';
import { useEffect } from 'react';
import Table from 'pages/universal/Table/Table';

function Agents(props) {
    useEffect(()=>{
        props.getAgents()
    },[])
    console.log(props);
    return (
        <div>
        <Table
    localStoragePath="agents"
    pagination={true}
    changeSizeMode={true}
    // paginationApi={"/client/pagination?page={page}&limit={limit}"}
    dataProps={props.agents.agents}
    columnOrderMode={true}
    changeSizeModeOptions={["All", 5, 20, 50, 100, 200]}
    columnsProps={["Id",""]}
    fileName={"clients"}
    excelPath={"/excel?component=clients&"} 
/>
        </div>
    );
}

export default connect((state=>state.agents),agentActions)(Agents);