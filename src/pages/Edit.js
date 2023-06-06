import React,{ useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DiaryStateContext } from './../App';
import DiaryEdit from './../components/DiaryEdit';

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  //컴포넌트가 마운트되었을때 id값이 맞는 것을 찾는다.
  useEffect(()=>{
    if(diaryList.length >= 1){
      const targetDiary = diaryList.find((it)=> parseInt(it.id) === parseInt(id));
      //targetDiary 잘못전달되었을때 (undefined)
      if(targetDiary){
        setOriginData(targetDiary)
      } else {
        alert('없는 일기 입니다');
        navigate('/', {replace:true});
      }
    }
  },[id, diaryList]);
  
  return <div>{originData &&  <DiaryEdit isEdit={true} originData={originData}/>}</div>
}

export default Edit;