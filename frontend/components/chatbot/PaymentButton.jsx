import React from "react";
import styles from "./button.module.css"

const PaymentButton = (props) => {


  
  const options = [
    {
      text: "Proceed to payment",
      handler: props.actionProvider.handleProceedToPayment,
      id: 1,
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button
      key={option.id}
      onClick={option.handler}
      className="payment-button"
    >
      {option.text}
    </button>
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default PaymentButton;
