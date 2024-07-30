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

  hhandleMoney() {
    const messages = [
      'By default, your sum of money will be distributed to patients who match the criteria below:',
      '- Domain: All',
      '- Age: All',
      '- Family Members: All',
      'Would you like to change the criteria of patients to donate to?'
    ];
  
    messages.forEach((message) => {
      const randomDelay = Math.random() * (1300 - 500) + 500; 
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, randomDelay);
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
  
    messages.forEach((message) => {
      const randomDelay = Math.random() * (1200 - 500) + 500; 
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, randomDelay);
    });
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
