import React from "react";
import styles from "./Options.module.css"
import { useDispatch } from "react-redux";
import { SettingActions } from "../reducers/settingReducer";

const Options5b = (props) => {
  const dispatch = useDispatch();

  const options3 = [
    {
        text: "I recently invested in a mix of stocks...",
        handler: ()=>{
          dispatch(SettingActions.setUserInputLatest(3));
          props.actionProvider.handlePerso4();
        },
        id: 1,
        uniqueId: "options3-1"
    }
  ]

  const buttonsMarkup = options3.map((option) => (
    <div className="flex justify-end"><button key={option.id} onClick={()=>{
      document.getElementById("options3-1").classList.add('hidden')
      
      option.handler()}} className="rounded-lg p-1 bg-customgradienthint my-1 mx-1 " id={option.uniqueId}>
    {option.text}
  </button></div>
    
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options5b;