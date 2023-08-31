import {connect} from 'react-redux';
import { agentActions } from './Redux/Reducers/agentReducer';
import { useEffect } from 'react';
import Table from 'pages/universal/Table/Table';
Table
function Agents(props) {
    useEffect(()=>{
        props.getAgents()
    },[])
    console.log(props);
    return (
        <div>
        
        </div>
    );
}

export default connect((state=>state.agents),agentActions)(Agents);