import { createChatBotMessage } from "react-chatbot-kit";
import PaymentButton2 from "./PaymentButton2";

const config1 = {
  botName: "HealthMe",
  initialMessages: [
    createChatBotMessage(
      `Good Morning, Jason`),
    createChatBotMessage(
      `I noticed that you want to make a donation to John Doe.`),
    createChatBotMessage(
      `I have updated your Donation Contract to match the medical condition of John Doe and similar patients.`),
    createChatBotMessage(
      `Click the button below to proceed to payment`),
  ],
  widgets: [
    {
      widgetName: "paymentButton",
      widgetFunc: (props) => <PaymentButton2 {...props} />,
    },
  ],
}

export default config1;