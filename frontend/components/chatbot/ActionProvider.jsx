import React from "react";
import PaymentButton from "./PaymentButton";

class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  handleMoney() {
    const messages = [
      'By default, your sum of money will be distributed to patients who match the criteria below:',
      '- Domain: All',
      '- Age: All',
      '- Family Members: All',
      'Would you like to change the criteria of patients to donate to?'
    ];

    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, index * 1500);
    });
  }

  handleChangeCriteria() {
    const message = this.createChatBotMessage('Would you like to change the criteria of patients to donate to?');
    this.updateChatbotState(message);
  }

  handleOrphanedChildrenWithBlindness() {
    const messages = [
      'Your list has been updated as below:',
      '- Domain: Blindness (All)',
      '- Age: <18',
      '- Family Members: 0'
    ];

    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, index * 1500);
    });

    // Add the button message after the previous messages
    setTimeout(() => {
      const paymentButtonMessage = this.createChatBotMessage(
        "",
        {
          widget: "paymentButton"
        }
      );
      this.updateChatbotState(paymentButtonMessage);
    }, messages.length * 1500);
  }

  handleLast() {
    this.updateChatbotState(this.createChatBotMessage(`Processing completed`));
  }

  handleProceedToPayment = () => {
    this.updateChatbotState(this.createChatBotMessage(`Proceeding to payment...`));
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
