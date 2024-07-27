import React from "react";
import styles from "./Options.module.css"

const Options3 = (props) => {
  const options = [
    {
      text: "Confused with buying stocks",
      handler: props.actionProvider.handlePerso10,
      id: 1,
      uniqueId: "options3-33331",
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <div className="justify-center flex">
      <button key={option.id} onMouseEnter={()=>{
         document.getElementById("options3-33331").classList.add('hidden')
        option.handler();
      }} className="rounded-lg p-3 px-5 bg-black mx-2 bg-customgradienthint" id={option.uniqueId}>
        {option.text}
      </button>
    </div>
    
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default Options3;
