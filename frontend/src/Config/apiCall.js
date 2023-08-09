import axios from "axios";
import {ErrorNotify} from "../tools/Alerts";
export const domen = "http://localhost:8080/api";
export default function (url, method, data,searchParam="") {
    let item = localStorage.getItem("access_token");
    return axios({
        baseURL:domen,
        url,
        method: method,
        data,
        headers: {
            "token": item,
            "searchParam": searchParam
        },
    }).catch((err)=>{
        console.log(err)
        if (err.response.status === 403){
            axios({
                url: "http://localhost:8080/api/auth/refresh?refreshToken="+localStorage.getItem("refresh_token"),
                method: "POST"
            }).then((res)=>{
                localStorage.setItem("access_token", res.data)
                axios({
                    url: "http://localhost:8080/api" + url,
                    method: method,
                    data: data,
                    headers: {
                        "token": localStorage.getItem("access_token"),
                        "searchParam": searchParam
                    }
                })
            }).catch((err)=>{
                window.location = "/login"
            })
        }else if(err.response.status===404){
            ErrorNotify(err.response.data)
        }else if(err.response.status===500){
            ErrorNotify(err.response.data)
        }
    })
}