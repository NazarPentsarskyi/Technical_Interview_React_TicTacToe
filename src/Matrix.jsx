import { useState } from "react";

const Matrix = () => {

  let arrayVelue = ["0","0","0","0","0","0","0","0","0"];

  const [textX, setTextX] = useState(arrayVelue);
  const [xPlay, setXPlay] = useState(true);

  const handlerX = (index) =>{
    const updateText = [...textX];
    updateText[index] = (xPlay === true ? 'X' : 'O');
    console.log(index);

    setTextX(updateText);
    console.log(updateText);
    setXPlay(!xPlay);
  }

  return (
    <div className="matrix">
    {textX.map((item, index) => {
      return (
        <button key={index} onClick = {() => handlerX(index)}>{item}</button>)})
      }      
    </div>
  )
}

export default Matrix