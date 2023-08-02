import React, {useState} from 'react';
import Select from "react-select";
import Table from "../Table/Table";
import {connect, useDispatch} from "react-redux";
import tableReducer, {tableActions} from "../../../Redux/reducers/tableReducer";

function Filter(props) {

    const [options] = useState([
        { value: '10', label: 'Option' },
        { value: '20', label: 'Option' },
        { value: '30', label: 'Option' },
        { value: '40', label: 'Option' },
    ]);
    const [optionsActive] = useState([
        { value: '', label: 'All' },
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' },
    ]);
    const [optionsWeeks] = useState([
        { value: '1', label: 'All weeks' },
        { value: '2', label: 'Every weeks' },
        { value: '3', label: 'Odd weeks' },
    ]);
    const [optionsTin] = useState([
        { value: '1', label: 'TIN' },
        { value: '2', label: 'With TIN' },
        { value: '3', label: 'Without TIN' },
    ]);
    const [optionsDay] = useState([
        { value: '1', label: 'Monday' },
        { value: '2', label: 'Tuesday' },
        { value: '3', label: 'Wednesday' },
        { value: '4', label: 'Thursday' },
        { value: '5', label: 'Friday' },
        { value: '6', label: 'Saturday' },
        { value: '6', label: 'Sunday' },

    ]);
    const formInputsProps = props.table.formInputs

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: 8,
            minHeight: 34,
            border: '1px solid #d1d1d1',
        }),
    };

    function handleChangeActive(obj) {
        const {name,value} = obj
        props.changeInputForms({...formInputsProps, [name]: value})
        props.getActiveData(props.paginationApi)
    }


    const active=(
        <div className="my-2" style={{ width: 300 }}>
            <Select
                options={optionsActive}
                style={{width: 70}}
                styles={customStyles}
                onChange={(e)=>handleChangeActive({name: "active",value: e})}
                placeholder="Active"
                isClearable={true}
            />
        </div>)
    const city=(
        <div className="my-2" style={{ width: 450 }}>
            <Select
                isMulti
                styles={customStyles}
                onChange={(e)=>handleChangeActive({name: "city",value: e})}
                placeholder="City"
            />
        </div>)
    const weekDays=(
        <div className="my-2" style={{ width: 350 }}>
            <Select
                options={optionsWeeks}
                styles={customStyles}
                isMulti
                placeholder="All weeks"
                onChange={(e)=>handleChangeActive({name: "weekDays",value: e})}
            />
        </div>
    )
    const tin=(
        <div className="my-2" style={{ width: 300 }}>
            <Select
                options={optionsTin}
                styles={customStyles}
                placeholder="TIN"
                onChange={(e)=>handleChangeActive({name: "tin",value: e})}
                isClearable={true}
            />
        </div>)
    const customerCategories=(
        <div className="my-2" style={{ width: 400 }}>
            <Select
                styles={customStyles}
                isMulti
                onChange={(e)=>handleChangeActive({name: "customerCategories",value: e})}
                placeholder="Costumer Categories"
            />
        </div>)
    const day=(
        <div className="my-2" style={{ width: 400 }}>
            <Select
                options={optionsDay}
                styles={customStyles}
                isMulti
                onChange={(e)=>handleChangeActive({name: "day",value: e})}
                placeholder="Day"
            />
        </div>)

    function handleChangeSearch(val) {
        props.changeQuickSearch(val)
        props.getQuickSearchData(props.paginationApi)
    }

    const quickSearch=(
        <label className='' style={{height:30}}><span style={{width:60, height:30}}>Quick search:</span>
            <input onChange={(e)=>handleChangeSearch(e.target.value)} type='search' style={{width:180, height:30 }} className='my-1' placeholder=''/>
        </label>
    )

    const formInputs = {
        active,
        city,
        weekDays,
        tin,
        customerCategories,
        quickSearch,
        day
    }
    // console.log(formInputs.active.props.children.props)
        return (
        <div>
            <div className='row'>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",width:"1380px"}}>
                {
                   props.filter? props.filter.map((item,index)=>{
                        return (
                            <div key={index}>
                                {
                                    formInputs[item]
                                }
                            </div>
                        )
                    }):""
                }
                    {
                        formInputs[props.search]
                    }
                    {
                        formInputsProps.city === ""&&formInputsProps.city.length===0&&formInputsProps.tin===""&&formInputsProps.quickSearch===""&& formInputsProps.customerCategories.length===0  && formInputsProps.active?
                            <button onClick={()=>props.getFilteredData(props.paginationApi)} className={"btn btn-primary"} style={{display: "inline-block",height:40}} >Filter</button>
                            :""
                    }
                    <button onClick={()=>props.getFilteredData(props.paginationApi)} className={"btn btn-primary"} style={{display: "inline-block",height:40}} >Filter</button>


            </div>
            </div>
        </div>
    );
}

export default connect(state=>state,tableActions)(Filter);