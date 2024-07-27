import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Aos from 'aos';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

function DonatePage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, []);

  return (
    <Layout>
      <div className='flex flex-row h-screen'>
        <div className='w-1/2 p-4'>
          <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          />
        </div>
        <div className='w-1/2 p-4'>
          {/* Future content for the right side */}
        </div>
      </div>
    </Layout>
  );
}

export default DonatePage;