import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Aos from 'aos';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import Chatbot from "react-chatbot-kit";
import config1 from "./chatbot1/config1";
import MessageParser1 from "./chatbot1/MessageParser1";
import ActionProvider1 from "./chatbot1/ActionProvider1";

function RequestPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, []);

  return (
    <Layout>
      <div className='flex flex-row h-screen'>
        <div className='w-1/3 p-4'>
          <Chatbot
          config={config1}
          messageParser={MessageParser1}
          actionProvider={ActionProvider1}
          />
        </div>
        <div className='w-2/3 p-4'>
          <img src="./images/smart_contract.png" alt="smart_contract" className="w-full h-fit object-cover" />
        </div>
      </div>
    </Layout>
  );
}

export default RequestPage;