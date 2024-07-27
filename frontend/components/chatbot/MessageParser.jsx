class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    if (lowercase.includes("change") || lowercase.includes("criteria")) {
      this.actionProvider.handleChangeCriteria();
    } else if (lowercase.includes("orphaned children with cancer")) {
      this.actionProvider.handleOrphanedChildrenWithCancer();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;