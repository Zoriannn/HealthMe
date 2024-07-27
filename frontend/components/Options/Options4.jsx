import React from "react";
import styles from "./Options.module.css"

const Options4 = (props) => {
  const options = [
    {
      text: "Stock quiz",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "ETH price", handler: () => {}, id: 2 },
    { text: "Trending stocks for today", handler: () => {}, id: 3 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="rounded-lg p-1 my-1  bg-black mx-2">
      {option.text}
    </button>
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options4;
