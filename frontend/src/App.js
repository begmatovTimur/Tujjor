import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Table from "./pages/universal/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let columns = [
    {
      id: 1,
      title: "Email",
      key: "email",
      type: "string",
      show: true,
    },
    {
      id: 2,
      title: "Body",
      key: "body",
      type: "string",
      show: true,
    },
    {
      id: 3,
      title: "Name",
      key: "name",
      type: "string",
      show: true,
    },
  ];
  const [data,setData] = useState([]);
  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/comments").then(({data})=>{
      setData(data)
    })
  },[])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/table"
          element={
            <Table
              columnsProps={columns}
              dataProps={data}
              paginationApi={"https://jsonplaceholder.typicode.com/comments?_page={page }&_limit={limit}"}
              pagination={true} 
              changeSizeMode={true} 
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App