import React from 'react';
import { connect } from 'react-redux';
import { agentAction } from './Redux/Reducers/AgentReducer';
import { useEffect } from 'react';
function Agents(props) {
    // useEffect(()=>{
    //     props.getAgents()
    // },[])
    console.log(props);
    return (
        <div>
            
        </div>
    );
}

export default connect((state)=>state,agentAction)(Agents);