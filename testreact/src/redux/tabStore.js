import { configureStore, createSlice } from '@reduxjs/toolkit'

const lg = console.log;

let tabValue1 = createSlice({
    name: 'tabValue1',
    initialState: 0,
    reducers: {
        setTabValue1(state, action) {
            lg(`tab1 값 ${action.payload} 세팅`);
            return state = action.payload;
        },
        setTabValue1Empty(state) {
            lg(`tab1 값 초기화`);
            state = 0;
            return state;
        }
    }
})

export let { setTabValue1, setTabValue1Empty } = tabValue1.actions;


let tabValue2 = createSlice({
    name: 'tabValue2',
    initialState: 0,
    reducers: {
        setTabValue2(state, action) {
            lg(`tab2 값 ${action.payload}  세팅`);
            return state = action.payload;
        },
        setTabValue2Empty(state) {
            lg(`tab2 값 초기화`);
            state = 0;
            return state;
        }
    }
})

export let { setTabValue2, setTabValue2Empty } = tabValue2.actions;



let tabValue3 = createSlice({
    name: 'tabValue3',
    initialState: 0,
    reducers: {
        setTabValue3(state, action) {
            lg(`tab3 값 ${action.payload}  세팅`);
            return state = action.payload;
        },
        setTabValue3Empty(state) {
            lg(`tab3 값 초기화`);
            state = 0;
            return state;
        }
    }
})

export let { setTabValue3, setTabValue3Empty } = tabValue3.actions;

export default configureStore({
    reducer: {
        tabValue1: tabValue1.reducer,
        tabValue2: tabValue2.reducer,
        tabValue3: tabValue3.reducer
    }
}) 