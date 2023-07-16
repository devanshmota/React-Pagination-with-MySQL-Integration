import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Pager from './Components/Pager';


function App() {

  const [data, setData] = useState([]);
  let [sort, setSort] = useState('');
  const [order, setOrder] = useState('DESC');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [numberOfResults, setNumberOfResults] = useState(0);

  useEffect(() => {

    fetchData();
  }, [sort, order, limit, page]);

  const fetchData = () => {
    axios
      .get('http://localhost:8000/data', {
        params: { sort, order, limit, page },
      })
      .then((res) => {
        setData(res.data);
        setNumberOfResults(res.data.length);

      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleColumnClick = (column) => {
    if (sort === column) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSort(column);
      setOrder('ASC');
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col" onClick={() => handleColumnClick('Name')} style={{ cursor: 'pointer' }}>

                  {sort === 'Name' ? (order === 'ASC' ? 'Name ▲' : 'Name ▼') : 'Name'}

                </th>

                <th scope="col" onClick={() => handleColumnClick('Continent')} style={{ cursor: 'pointer' }}>

                  {sort === 'Continent' ? (order === 'ASC' ? 'Continent ▲' : 'Continent ▼') : 'Continent'}

                </th>

                <th scope="col" onClick={() => handleColumnClick('Region')} style={{ cursor: 'pointer' }}>

                  {sort === 'Region' ? (order === 'ASC' ? 'Region ▲' : 'Region ▼') : 'Region'}

                </th>

                <th scope="col" onClick={() => handleColumnClick('LifeExpectancy')} style={{ cursor: 'pointer' }}>

                  {sort === 'LifeExpectancy' ? (order === 'ASC' ? 'LifeExpectancy ▲' : 'LifeExpectancy ▼') : 'LifeExpectancy'}

                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{(page - 1) * limit + index + 1}</th>
                  <td>{item.Name}</td>
                  <td>{item.Continent}</td>
                  <td>{item.Region}</td>
                  <td>{item.LifeExpectancy}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pager
            page={page}
            setPage={setPage}
            numberOfResults={numberOfResults}
          />
        </div>
      </div>
    </>
  );
}

export default App;
