import React, { useReducer, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Edit from './pages/Edit';  
import Diary from './pages/Diary';
import New from './pages/New';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' : {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case 'EDIT' : {
      newState = state.map((it)=>it.id === action.data.id ? {...action.data} : it);
      break;
    }
    default :
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// const dummyData = [
//   {
//     id:1,
//     emotion:1,
//     content:'오늘의 일기 1번 오늘의 일기 1번 오늘의 일기 1번 오늘의 일기 1번',
//     date:1685904010252,
//   },
//   {
//     id:2,
//     emotion:3,
//     content:'오늘의 일기 2번',
//     date:1685904010253,
//   },
//   {
//     id:3,
//     emotion:4,
//     content:'오늘의 일기 3번',
//     date:1685904010254,
//   },
// ]

function App() {  
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(()=>{
    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData).sort((a,b)=>parseInt(b.id) - parseInt(a.id)); //dataId 가장큰값으로 정렬
    
    
      if(diaryList.length>=1){
        dataId.current = parseInt(diaryList[0].id)+1; //가장큰값으로 정렬한 값에 +1
      }

      dispatch({type:'INIT',data:diaryList});
    }
  },[])

  const dataId = useRef(4);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type:'CREATE',
      data:{
        id:dataId.current,
        date:new Date(date).getTime(),
        content,
        emotion,
      }
    });
    dataId.current += 1;
  }

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type:'REMOVE',targetId});
  }

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type:'EDIT',
      data:{
        id:targetId,
        date:new Date(date).getTime(),
        content,
        emotion,
      }
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate, onRemove, onEdit,
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/new" element={<New/>} />
              <Route path="/edit/:id" element={<Edit/>} />
              <Route path="/diary/:id" element={<Diary/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
   </DiaryStateContext.Provider>
  );
}

export default App;
