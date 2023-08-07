import './DashboardButton.css'
import {useNavigate} from "react-router-dom";

function DashboardButton(props) {
    const navigate = useNavigate();
    return (
        <div className={"dashboard_button"} onClick={()=>navigate(props.path)}>
            <button>
                {props.icon}
                <span>{props.title}</span>
            </button>
        </div>
    );
}

export default DashboardButton;