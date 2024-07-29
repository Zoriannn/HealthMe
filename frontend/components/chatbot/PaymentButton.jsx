import React from "react";

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

  return <div>{buttonsMarkup}</div>;
};

export default PaymentButton;
