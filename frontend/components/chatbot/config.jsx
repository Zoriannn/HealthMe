import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Your sum of money will be distributed to patients who match the criteria below:`),
    createChatBotMessage(`- Domain: All`),
    createChatBotMessage(`- Age: All`),
    createChatBotMessage(`- Family Members: All`),
    createChatBotMessage("Would you like to change the criteria of patients to donate to?")
  ]
}

export default config;