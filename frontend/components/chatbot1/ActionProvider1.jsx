class ActionProvider1 {
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

  handleQuestion() {
    const messages = [
      'Analysing...',
      'Amount: RM26000',
      `
  Age: 43 & Disabled(verified)`,
      `
  There is a donation available for your case. Please submit your current salary slip.`,
    ];
  
    messages.forEach((message) => {
      const randomDelay = Math.random() * (1300 - 500) + 500; 
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, randomDelay);
    });
  }
  

  handleQuestion2() {
    const messages = [
      { text: 'Analysing...', options: {} },
      { text: '\nAnalysis Completed!', options: {} },
      { text: '\nYou are verified as B40. You are eligible, would you like to proceed. [The contract stated the payment will be directly paid to the hospital]', options: { widget: "Complete" } },
      { text: '\nThe donation details have been sent to your potential donor!', options: {} },
    ];
  
    messages.forEach((message) => {
      const randomDelay = Math.random() * (1300 - 500) + 500; 
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message.text, message.options));
      }, randomDelay);
    });
  }
  


  handleEnd() {
    this.updateChatbotState(this.createChatBotMessage(
      'Processing completed',
    ));
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider1;
