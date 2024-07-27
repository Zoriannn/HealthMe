import React from "react";
import styles from "./Options.module.css"
import { useDispatch } from "react-redux";
import { SettingActions } from "../reducers/settingReducer";

const Options6 = (props) => {
  const dispatch = useDispatch();
  const options1 = [
    {
        text: "Sell",
        id: 1,
    },
    {
      text: "Keep",
      handler: ()=>{
        props.actionProvider.handlePerso5()
      },
      id: 2,
  }
  ]

  const buttonsMarkup = options1.map((option) => {

    console.log(option.text)
    if(option.text == 'Yes'){
    return  <button key={option.id} onClick={option.handler} className="rounded-lg p-1 px-3 bg-customgradientyes my-1 mx-1">
      {option.text}
    </button>
    }
    else{
    return  <button key={option.id} onClick={option.handler} className="rounded-lg p-1 px-3 bg-customgradientno my-1 mx-1">
      {option.text}
    </button>
    }
   
  });

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options6;