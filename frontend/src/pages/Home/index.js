import React from 'react';
import {useNavigate} from "react-router-dom";

function Index(props) {
    const navigate = useNavigate();

    return (
        <div className={"container my-4"}>
            <hr/>
            <button onClick={()=>navigate('./login')}>Login</button>
            <button className='btn btn-success' onClick={()=>navigate("/table")}>Universal Table</button>
        </div>
    );
}

export default Index;