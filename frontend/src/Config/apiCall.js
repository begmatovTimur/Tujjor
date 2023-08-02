import axios from "axios";

export default function (url, method, data,searchParam) {
    let item = localStorage.getItem("access_token");
    console.log(item);
    return axios({
        url: "http://localhost:8080" + url,
        method: method,
        data,
        headers: {
            "token": item,
            "searchParam": searchParam
        },
    }).catch((err)=>{
        if(err.response)
        if (err.response.status === 403){
            axios({
                url: "http://localhost:8080/api/users/refresh?refreshToken="+localStorage.getItem("refresh_token"),
                method: "POST"
            }).then((res)=>{
                localStorage.setItem("access_token", res.data)
                axios({
                    url: "http://localhost:8080" + url,
                    method: method,
                    data: data,
                    headers: {
                        "key": item
                    }
                })
            })
        }
    })
}