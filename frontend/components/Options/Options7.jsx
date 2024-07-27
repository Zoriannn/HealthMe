import React from "react";
import styles from "./Options.module.css"
import { useDispatch } from "react-redux";
import { SettingActions } from "../reducers/settingReducer";

const Options7 = (props) => {
  const dispatch = useDispatch();

  const options7 = [
    {
        text: "Ok",
        handler: ()=>{
          props.actionProvider.handlePerso11()
        },
        id: 1,
    },
    {
      text: "No",
      id: 2,
  }
  ]

  const buttonsMarkup = options7.map((option) => {

    console.log(option.text)
    if(option.text == 'Ok'){
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

export default Options7;