const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick, isSeleted }) => {
  return(
    <div 
      className={["EmotionItem", isSeleted ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`].join(' ')} 
      onClick={()=>onClick(emotion_id)}
    >
      <img src={emotion_img} alt=""/>
      <span>{emotion_descript}</span>
    </div>
  )
}

export default EmotionItem;