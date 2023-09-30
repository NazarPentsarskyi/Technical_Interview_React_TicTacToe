// import { useState } from "react";

const Matrix = () => {

  let arrayVelue = ["0","0","0","0","0","0","0","0","0"];

  // const [textX, setTextX] = useState('');

  const handlerX = (index) =>{
    console.log(index);

    arrayVelue[index] = 'X';
    console.log(arrayVelue);

}

  return (

    <>
    
    {arrayVelue.map((item,index) => {
      return (
        <button key={index} onClick = {() => handlerX(index)}>{item}</button>)})
      }

      {/* <button onClick = {handlerX}>{textX}</button> */}
      
    
    </>
  )
}

export default Matrix