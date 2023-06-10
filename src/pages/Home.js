import React, { useState, useContext, useEffect } from 'react';
import { DiaryStateContext } from '../App';

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from './../components/DiaryList';

const Home = () => {
  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장`; 
  },[]);


  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`;

  useEffect(()=>{
    //현재년도의 현재월의 1일
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();

    //현재년도의 현재월의 마지막날
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth()+1,
      0,
      23,
      59,
      50
    ).getTime();

    //firstDay, lastDay사이에 작성된 일기를 추리면 된다.
    setData(diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay))
  },[diaryList, curDate]);

  useEffect(()=>{
    console.log(data);
  },[data])

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate())
    )
  }

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
    )
  }

  return(
    <div>
      <MyHeader 
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={decreaseMonth}/>}
        rightChild={<MyButton text={'>'} onClick={increaseMonth}/>}
      />
      <DiaryList diaryList={data}/>
    </div>
  )
}

export default Home;