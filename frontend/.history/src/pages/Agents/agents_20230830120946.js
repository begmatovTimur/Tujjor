import {connect} from 'react-redux';
import { agentAction } from './Redux/Reducers/agentReducer';
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

export default connect((state=>state.agents,{...agentAction}))(Agents);