import React, { useEffect } from 'react';

const EditButton = (data) => {
    useEffect(()=>{
        console.log(data);
    },[])
    return (
        <button className='btn btn-warning'>Edit</button>
    );
}

export default EditButton;
