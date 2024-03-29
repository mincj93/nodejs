import React, { useState } from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setTabValue2, setTabValue2Empty } from '../redux/tabStore';

const Tab2 = () => {

    let dispatch = useDispatch();

    return (
        <div className='tab2'>
            탭2입니다.
            <button onClick={() => { dispatch(setTabValue2(20)) }}>탭2 값 20 세팅</button>
            <button onClick={() => { dispatch(setTabValue2Empty()) }}>탭2 초기화</button>
        </div>
    );
};

export default Tab2;