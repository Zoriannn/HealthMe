import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(
      `How much money do you want to donate?`),
  ]
}

export default config;