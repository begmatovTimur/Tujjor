import {connect} from 'react-redux';
import { agentActions } from './Redux/Reducers/agentReducer';
function Agents(props) {
    useEffect(()=>{
        props.getAgents()
    },[])
    console.log(props);
    return (
        <div>
AIPS
        </div>
    );
}

export default connect((state=>state.agents),agentActions)(Agents);