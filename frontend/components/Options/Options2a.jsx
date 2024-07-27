import React from "react";
import styles from "./Options.module.css"

const Options2a = (props) => {
  const options2a = [
    {
      text: "Is the stock's liquidity sufficient?",
      handler: props.actionProvider.handlePerso7,
      id: 1,
    },
  ];

  const buttonsMarkup = options2a.map((option) => (
    <div className="flex justify-center align-center item-center">
    <button key={option.id} onClick={option.handler} className="rounded-lg p-3 px-5 bg-black mx-2 my-2 bg-customgradienthint">
      {option.text}
    </button>
    </div>
    
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options2a;