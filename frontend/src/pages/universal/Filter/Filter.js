import React, {useState} from 'react';
import Select from "react-select";
import Table from "../Table/Table";
import {connect, useDispatch} from "react-redux";
import tableReducer, {tableActions} from "../../../Redux/reducers/tableReducer";

function Filter(props) {

    const [options] = useState([
        { value: '10', label: 'Option 1️⃣' },
        { value: '20', label: 'Option 2️⃣' },
        { value: '30', label: 'Option 1️3' },
        { value: '40', label: 'Option 2️⃣4' },

    ]);
    const [optionsDay] = useState([
        { value: '1', label: 'Mon' },
        { value: '2', label: 'Tue' },
        { value: '3', label: 'Wen' },

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
    const [selectedValues, setSelectedValues] = useState([]);
    const dispatch = useDispatch()
    const handleSelectChange = (selectedOptions) => {
        setSelectedValues(selectedOptions);
    };
    const ClearIndicator = (props) => {
        return (
            <div>
                <button
                    className="btn-clear"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClearSelection();
                    }}
                >
                    X
                </button>
            </div>
        );
    };

    const handleClearSelection = () => {
        setSelectedValues([]);
    };

    function handleChangeActive(obj) {
         const {name,value} = obj
        props.changeInputForms({...formInputsProps, [name]: value})
    }


    const active=(
        <div className="my-2" style={{ width: 300 }}>
            <Select
                options={options}
                style={{width: 70}}
                styles={customStyles}
                onChange={(e)=>handleChangeActive({name: "active",value: e})}
                placeholder="Active.."
                isClearable={true}
            />
        </div>)
    const city=(
        <div className="my-2" style={{ width: 450 }}>
            <Select
                options={options}
                isMulti
                styles={customStyles}
                onChange={(e)=>handleChangeActive({name: "city",value: e})}
                placeholder="City.."
            />
        </div>)
    const weekDays=(
        <div className="my-2" style={{ width: 350 }}>
            <Select
                options={optionsDay}
                styles={customStyles}
                isMulti
                placeholder="day week.."
                onChange={(e)=>handleChangeActive({name: "weekDays",value: e})}
            />
        </div>
    )
    const tin=(
        <div className="my-2" style={{ width: 300 }}>
            <Select
                options={options}
                styles={customStyles}
                placeholder="Tin.."
                onChange={(e)=>handleChangeActive({name: "tin",value: e})}
                isClearable={true}
            />
        </div>)
    const customerCategories=(
        <div className="my-2" style={{ width: 400 }}>
            <Select
                options={optionsDay}
                styles={customStyles}
                isMulti
                onChange={(e)=>handleChangeActive({name: "customerCategories",value: e})}
                placeholder="Costumer Categories.."
            />
        </div>)

    const quickSearch=(
        <label className='' style={{height:30}}><span style={{width:60, height:30}}>Quick search:</span>
            <input type='search' style={{width:180, height:30 }} className='my-1' placeholder=''/>
        </label>
    )

    const formInputs = {
        active,
        city,
        weekDays,
        tin,
        customerCategories,
        quickSearch
    }
    // console.log(formInputs.active.props.children.props)
    return (
        <div>
            <div className='row'>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",width:"1380px"}}>
                {
                    props.filter.map((item,index)=>{
                        return (
                            <div key={index}>
                                {
                                    formInputs[item]
                                }
                            </div>
                        )
                    })
                }
                    <button className={"btn btn-primary"} style={{display: "inline-block",height:40}} >Filter</button>
                    {
                        formInputs[props.search]
                    }
            </div>
            </div>
        </div>
    );
}

export default connect(state=>state,tableActions)(Filter);