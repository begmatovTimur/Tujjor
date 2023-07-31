import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Admin(props) {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Hello admin</h1>
            <hr/>
            <button className='btn btn-primary' onClick={()=>navigate("/admin/settings")}>Settings</button>
            <Outlet />
        </div>
    );
}

export default Admin;