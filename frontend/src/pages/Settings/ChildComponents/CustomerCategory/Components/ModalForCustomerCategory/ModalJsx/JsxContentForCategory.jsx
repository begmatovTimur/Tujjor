import React, {useEffect} from 'react';
import uploadImg from "../../../../../../../images/uploadImg.jpg"
import sovgaImg from "../../../../../../../images/imagesForCategory/sovga.png"
import kyimImg from "../../../../../../../images/imagesForCategory/kiyim.png"
import oziqOvqatImg from "../../../../../../../images/imagesForCategory/oziq-ovqat.png"
import "./modalCss.css"
import {connect} from "react-redux";
import {customerCategoryActions} from "../../../Redux/Reducers/customerCategoryReducer";

function JsxContentForCategory(props) {

    const {customerCategory} = props;

    const images = [
        sovgaImg,
        kyimImg,
        oziqOvqatImg,
    ]

    useEffect(()=>{
        props.getPhoto()
    },[customerCategory.image])

    return (
        <div>
            <div className={"top"}>
                <label>
                    Upload File (<i>optional</i>):
                    <input onChange={(e) => props.handlePhoto(e)} className={"d-none"} type="file"/>
                    {
                        customerCategory.image ?
                            <img id={"imageCategory"} className={"topImg"} alt=""/>
                            :
                            <img className={"topImg"} src={uploadImg} alt=""/>
                    }
                </label>
            </div>
            <div className={"bottom"}>
                <p className={"m-0"}>Options:</p>
                {
                    images.map((item, index) => {
                        return (
                            <img onClick={() => props.saveOptionPhoto(item)} key={index} width={50} height={50} src={item} alt=""/>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default connect((state) => state, customerCategoryActions)(JsxContentForCategory);