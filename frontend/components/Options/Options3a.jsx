import React from "react";
import styles from "./Options.module.css"

const Options3a = (props) => {
  const options = [
    {
      text: "OK",
      handler: props.actionProvider.handlePerso10,
      id: 1,
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <div className="justify-end flex">
      <button key={option.id} onClick={option.handler} className="rounded-lg p-3 px-5 bg-black mx-2 bg-customgradienthint">
        {option.text}
      </button>
    </div>
    
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options3a;
