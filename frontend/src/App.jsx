import {useState} from 'react';
import Table from "./universal/Table";
function App() {
  let [columns,setColumns] = useState([
    {
      id: 1,
      title: "Region",
      key: "region",
      show: true,
      type: "string",
    },
    {
      id: 2,
      title: "Name",
      key: "name",
      show: true,
      type: "string",
    },
    {
      id: 3,
      title: "Description",
      key: "description",
      show: true,
      type: "string",
    },
  ]);
  let data = [
    {
      id: 1,
      region: "Bukhara",
      name: "Sodiq",
      description: "lorem ipsum dolor sit amet, consectetur adip",
    },
    {
      id: 2,
      region: "Tashkent",
      name: "Marupov",
      description: "lorem ipsum dolor sit amet, consectetur adip",
    },
    {
      id: 3,
      region: "Anddijon",
      name: "Timur",
      description: "lorem ipsum dolor sit amet, consectetur adip",
    },
  ];
  return (
    <div>
      <h1>Hello World</h1>
      <Table
        columns={columns}
        data={data}
        setColumns={setColumns}
        pagination={false}
        changeSizeMode={false}
        changeSizeOptions={[10, 20, 30, 40, 50]}
      />
    </div>
  );
}

export default App;
