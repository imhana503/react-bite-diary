import { useEffect } from 'react';
import DiaryEdit from './../components/DiaryEdit';

const New = () => {
  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - 새일기`; 
  },[]);

  return(
    <DiaryEdit/>
  )
}

export default New;