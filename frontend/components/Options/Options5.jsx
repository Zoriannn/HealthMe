import React from "react";
import styles from "./Options.module.css"
import { useDispatch } from "react-redux";
import { SettingActions } from "../reducers/settingReducer";

const Options5 = (props) => {
  const dispatch = useDispatch();


  const options = [
    {
      text: "1 : High-Stakes Tech Startup",
      handler: ()=>{
        dispatch(SettingActions.setUserInputLatest(1));
        props.actionProvider.handlePerso1();
      }
        ,
      id: 1,
    },
    { text: "2 : Conservative Stock Market Investment", handler: () => {}, id: 2 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="rounded-lg p-1 bg-customgradientoption mx-1 my-1">
      {option.text}
    </button>
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options5;
