import React, { useEffect, useState } from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setTabValue3, setTabValue3Empty } from '../redux/tabStore';

const Tab3 = () => {
    
    let dispatch = useDispatch();
    

    return (
        <div className='tab3'>
            탭3입니다.
            <button onClick={() => { dispatch(setTabValue3(30)) }}>탭3 값 30 세팅</button>
            <button onClick={() => { dispatch(setTabValue3Empty()) }}>탭3 초기화</button>
        </div>
    );
};

export default Tab3;