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
import Dragger from 'antd/lib/upload/Dragger';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useFetcher } from 'react-router-dom';

function RequestPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, []);

  const verifyUploadProps = {
    name: 'attachments',
    multiple: true,
    // accept: 'image/jpg, .pdf',
    async onChange(e) {
if(e.fileList.length >1){
  await navigator.clipboard.writeText("I have uploaded my salary slip.");
}
else{
  await navigator.clipboard.writeText("Here, I have uploaded the invoice.");
}
      
    },
    onDrop(e) {
      //uploadToServer(e);
    },
  };
  
  return (
    <Layout>
      <div className='flex flex-row h-5/6'>
        <div className='w-1/3 p-4'>
          <Chatbot
          config={config1}
          messageParser={MessageParser1}
          actionProvider={ActionProvider1}
          />
           <div className='w-full'>
                <Button onClick={() => router.reload()} className='w-full bg-black text-white rounded-lg px-5 py-3 my-5'>Complete & Restart</Button>
               </div>
        </div>
        <div className='w-2/3 p-4'>
               <Dragger {...verifyUploadProps}>
                 <div className='p-3 w-full border rounded-lg flex flex-col mt-2.5'>
                   <div
                     className='items-center align-center flex justify-center h-1/5'
                     style={{
                       height: '8em',
                     }}
                   >
                     <UploadOutlined style={{ fontSize: '6em', opacity: '0.6' }} />
                   </div>
                   <div
                     className='flex justify-center align-center mb-3'
                     style={{ opacity: '0.6' }}
                   >
                    Upload File
                   </div>
                   {/* <div>
                     <Button
                       className='flex border-2 border rounded-lg h-10 w-full text-center items-center justify-center button-primary'
                     >
                       <span className='font-semibold text-sm uppercase leading-none'>
                        Choose to Upload
                       </span>
                     </Button>
                   </div> */}
                 </div>
               </Dragger>

              
        </div>
      </div>
    </Layout>
  );
}

export default RequestPage;