import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate'; // 페이징
import Paging from './Paging'; // 페이징 라이브러리
import Tab1 from './tab/Tab1';
import Tab2 from './tab/Tab2';
import Tab3 from './tab/Tab3';

import { useSelector, useDispatch } from 'react-redux';
import { setTabValue3, setTabValue3Empty } from './redux/tabStore';


const lg = console.log;

function App() {

  let [list, setList] = useState([]);
  const [tabNum, setTabNum] = useState(0);
  const ref = useRef();
  const dispatch = useDispatch();

  let reduxState = useSelector((state) => state)

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
    dispatch(setTabValue3(30))
  },[])

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
                <tr key={idx}>
                  <td onClick={() => { alert(row._id) }} ref={ref}>{row._id}</td>
                  <td>{row.title}</td>
                  <td>{row.content}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <button onClick={()=>{setTabNum(0)}}>탭 1</button>
      <button onClick={()=>{setTabNum(1)}}>탭 2</button>
      <button onClick={()=>{setTabNum(2)}}>탭 3</button>
      <button onClick={()=>{alert(JSON.stringify(reduxState))}}>탭 값들 출력</button>
      <TabContent tabNum={tabNum} />
    </div>
  );
}

function TabContent({ tabNum }) {
  return [<Tab1 />, <Tab2 />, <Tab3 />][tabNum]
}


export default App;
