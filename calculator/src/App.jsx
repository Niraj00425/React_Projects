import Display from "./components/Display";
import ButtonsContainer from "./components/ButtonsContainer";
import styles from "./App.module.css";
import { useState } from "react";

function App() {

  let [calVal, setCalVal] = useState("");
  
  const onButtonClick = (buttonText) => {
    if(buttonText === 'C') {
      setCalVal("");
    }else if(buttonText === '='){
      const result = eval(calVal);
      setCalVal(result);
    }else {
      const newDisplayvalue = calVal + buttonText;
      setCalVal(newDisplayvalue);
    }
  };

  return (
    <div className={styles.calculator}>
      <Display displayValue={calVal}></Display>
      <ButtonsContainer onButtonClick={onButtonClick}></ButtonsContainer>
    </div>
  );
}

export default App;
