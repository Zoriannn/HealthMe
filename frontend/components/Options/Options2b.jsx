import React from "react";
import styles from "./Options.module.css"

const Options2b = (props) => {
  const options2b = [
    {
      text: "What does the big green candlestick represent?",
      handler: props.actionProvider.handlePerso8,
      id: 1,
    },
  ];

  const buttonsMarkup = options2b.map((option) => (
    <div className="flex justify-end">
    <button key={option.id} onClick={option.handler} className="rounded-lg p-3 px-5 bg-black mx-2 my-2 bg-customgradienthint">
      {option.text}
    </button>
    </div>
    
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options2b;