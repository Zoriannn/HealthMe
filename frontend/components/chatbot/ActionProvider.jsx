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

 

  handleMoney(){
    this.updateChatbotState(this.createChatBotMessage(
      'By default, your sum of money will be distributed to patients who match the criteria below:',
    ));
    this.updateChatbotState(this.createChatBotMessage(
      `
- Domain: All`,
    ));
    this.updateChatbotState(this.createChatBotMessage(
      `
- Age: All`,
    ));
    this.updateChatbotState(this.createChatBotMessage(
      `
- Family Members: All`,
    ));
    this.updateChatbotState(this.createChatBotMessage(
      `
      Would you like to change the criteria of patients to donate to?`,
    ));
  }

  handleChangeCriteria() {
    const message = this.createChatBotMessage('Would you like to change the criteria of patients to donate to?');
    this.updateChatbotState(message);
  }

  handleOrphanedChildrenWithCancer(){
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
- Family Members:0`,
    ));
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
