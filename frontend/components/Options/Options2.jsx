import React from "react";
import styles from "./Options.module.css"

const Options2 = (props) => {
  const options = [
    {
      text: "Why is it suitable",
      handler: props.actionProvider.handlePerso6,
      id: 1,
    },
    {
        text: "Explain more",
        handler: () => {}, 
        id: 2 
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="rounded-lg p-3 px-5 bg-black mx-2 bg-customgradientoption">
      {option.text}
    </button>
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options2;
