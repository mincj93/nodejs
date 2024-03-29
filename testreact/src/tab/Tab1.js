import React, { useState } from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setTabValue1, setTabValue1Empty } from '../redux/tabStore';

const Tab1 = () => {

    let dispatch = useDispatch();

    return (
        <div className='tab1'>
            탭1입니다.
            <button onClick={() => { dispatch(setTabValue1(10)) }}>탭1 값 10 세팅</button>
            <button onClick={() => { dispatch(setTabValue1Empty()) }}>탭1 초기화</button>
        </div>
    );
};

export default Tab1;