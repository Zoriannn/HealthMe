import { createChatBotMessage } from "react-chatbot-kit";
import PaymentButton from "./PaymentButton";

const config = {
  initialMessages: [
    createChatBotMessage(`Good morning, Jason`),
    createChatBotMessage(`How much would you like to contribute as a donation?`),
  ],
  widgets: [
    {
      widgetName: "paymentButton",
      widgetFunc: (props) => <PaymentButton {...props} />,
    },
  ],
};

export default config;
