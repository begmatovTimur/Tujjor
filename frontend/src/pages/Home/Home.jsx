import React from 'react';
import {useNavigate} from "react-router-dom";

function Home(props) {
    const navigate = useNavigate();

    return (
        <div className={""}>
            <h3>Click to login...</h3>
            <hr/>
            <button className={'btn btn-outline-primary'} onClick={()=>navigate('./login')}>Login</button>
        </div>
    );
}

export default Home;