import React from "react";
import styles from "./Options.module.css"
import { useDispatch } from "react-redux";
import { SettingActions } from "../reducers/settingReducer";


const Options5a = (props) => {

  const dispatch = useDispatch();

  const options2 = [
    {
        text: "A: Wealth Accumulation",
        handler: () => {},
        id: 1,
    },
    {
        text: "B: Income Generation",
        handler: () => {},
        id: 2,
    },
    {
        text: "C: Capital Preservation",
        handler: () => {},
        id: 3,
    },
    {
        text: "D: Socially Responsible Investing",
        handler: ()=>{
          dispatch(SettingActions.setUserInputLatest(2));
          props.actionProvider.handlePerso3()
        },
        id: 4,
    },

  ]

  const buttonsMarkup = options2.map((option) => (
    <button key={option.id} onClick={option.handler} className="rounded-lg p-1  bg-customgradientoption my-1 mx-1">
      {option.text}
    </button>
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options5a;