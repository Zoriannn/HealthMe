class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    if (lowercase.includes("change") || lowercase.includes("criteria")) {
      this.actionProvider.handleChangeCriteria();
    } else if (lowercase.includes("children with cancer")) {
      this.actionProvider.handleOrphanedChildrenWithCancer();
    } else if (lowercase.includes("50000")){
      this.actionProvider.handleMoney();
    }
  }
}

export default MessageParser;