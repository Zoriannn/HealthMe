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
      { text: '\nYou are eligible, would you like to proceed. [The contract stated the payment will be directly paid to the hospital]', options: { widget: "Complete" } }
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
