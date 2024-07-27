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

  handleChangeCriteria() {
    const message = this.createChatBotMessage('Would you like to change the criteria of patients to donate to?');
    this.updateChatbotState(message);
  }

  handleOrphanedChildrenWithCancer() {
    this.updateChatbotState(this.createChatBotMessage(
      'Your list has been updated as below:',
    ));
    this.updateChatbotState(this.createChatBotMessage(
      `
- Domain: Cancer (All)`,
    ));
    this.updateChatbotState(this.createChatBotMessage(
      `
- Age: <18`,
    ));
    this.updateChatbotState(this.createChatBotMessage(
      `
- Family Members: 0`,
    ));
  }

  handleDefault() {
    const message = this.createChatBotMessage('I didn\'t understand that. Could you please clarify?');
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
