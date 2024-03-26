import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'; // 페이징


const lg = console.log;

function App() {

  let [list, setList] = useState([]);

  const getList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/list');
      setList(response.data);
    } catch (error) {
      console.error('Error fetching list:', error);
      // 오류 처리, 예: 사용자에게 오류 메시지 표시
    }
  };

  useEffect(() => {

  }, [list])

  return (
    <div className="App">
      <button onClick={() => {
        getList()
      }}>리스트 조회</button><br></br>
      <br></br>
      ===========리스트============<br></br>
      <div>
        <table border={1} width={'100%'}>
          <thead>
            <tr>
              <td>아이디</td>
              <td>title</td>
              <td>content</td>
            </tr>
          </thead>
          <tbody>
            {
              list.map((row, idx) => (
                <tr>
                  <td>{row._id}</td>
                  <td>{row.title}</td>
                  <td>{row.content}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
