import React from 'react';
import {useNavigate} from "react-router-dom";

function Index(props) {
    const navigate = useNavigate();

    return (
        <div className={"container my-4"}>
            <h3>Click to login...</h3>
            <hr/>
            <button onClick={()=>navigate('./login')}>Login</button>
        </div>
    );
}

export default Index;