/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  PlusOutlined,
  UpOutlined,
  CloseCircleFilled,
  AndroidFilled,
  UserOutlined,
} from '@ant-design/icons';
import _, { stubTrue } from 'lodash';
import axios from 'axios';
import Aos from 'aos';
import LoadingModal from '../dialog/LoadingModal';
import AlertModal from '../dialog/AlertModal';
import { SettingActions } from '../reducers/settingReducer';
import MenuSection from './MenuSection';

function Layout(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state) => state.setting.loading);
  const isAlert = useSelector((state) => state.setting.alert);
  const isChatbotOpen = useSelector((state) => state.setting.isChatbotOpen);

  useEffect(() => {
    Aos.init();
  }, []);

  const middleMenu = [
    {
      key: 0,
      label: 'Learning',
      action: () => {
        dispatch(SettingActions.setIsChatbotOpen(false));
        dispatch(SettingActions.setLoading(true));
        dispatch(SettingActions.setSelected(0));
        router.push('/learning');
        dispatch(SettingActions.setSelected(0));
        dispatch(SettingActions.setIsChatbotOpen(false));
      },
    },
    {
      key: 1,
      label: 'Trading',
      action: () => {
        dispatch(SettingActions.setLoading(true));
        dispatch(SettingActions.setSelected(1));
        dispatch(SettingActions.setIsChatbotOpen(false));
        router.push('/assistant');
      },
    },
    {
      key: 2,
      label: 'Forum',
      action: () => {
        dispatch(SettingActions.setIsChatbotOpen(false));
        dispatch(SettingActions.setLoading(true));
        dispatch(SettingActions.setSelected(2));
        router.push('/forum');
        dispatch(SettingActions.setIsChatbotOpen(false));
      },
    },
  ];

  return (
    <>
      <div className=''>
        <div className=''>
          <div className=''>
            <div className='relative bg-custom h-screen overflow-hidden text-black'>
              <div className='col-span-10'>
                <div
                  id='page-container'
                  className='col-span-10 h-screen overflow-y-auto hidden-scrollbar'
                >
                  <div className=''>
                    <div
                      id='pageHeader'
                      className='col-span-6 z-50 md:col-span-2 bg-white pb-1 pt-3 px-5 flex justify-between align-center shadow-xl shadow shadow-gray-200'
                    >
                      <div className='flex justify-between gap-3'>
                        {' '}
                        <span className='md:-mt-1 main-menu-logo ml-0.5 cursor-pointer'>
                          {/* <img
                            alt='healthme Logo'
                            onClick={() => {
                              dispatch(SettingActions.setLoading(true));
                              router.push('/');

                              dispatch(SettingActions.setSelected(null));
                              dispatch(SettingActions.setLoading(false));
                            }}
                            src='/images/logo.png'
                          /> */}
                        </span>
                        <div className='border-l-2 border-black my-2 border-gray-200'>
                          {' '}
                        </div>
                        <UserOutlined
                          style={{ fontSize: '32px', color: '#1B57F0' }}
                          className='pt-1 cursor-pointer'
                          onClick={() => {
                            dispatch(SettingActions.setIsChatbotOpen(true));
                          }}

                        />
                      </div>

                      <div className='flex items-center align-center'>
                        <MenuSection menuRow={middleMenu} />
                      </div>

                      <div className='col-span-5 col-start-8 md:col-span-10 flex items-center align-center '>
                        <div className='flex items-center justify-end md:justify-between w-full'>
                          <div className='w-full md:w-auto'>
                            <div className='flex justify-end gap-3 items-center flex-wrap' />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='relative container mx-auto'>
                      <div className='mb-auto h-screen'>
                        <div className='h-screen'>
                          <div className='grid grid-cols-12'>
                            <div
                              className={`${
                                isChatbotOpen ? 'col-span-9' : 'col-span-12'
                              } h-screen px-4`}
                            >
                              <div className='games-container'>
                                <div className='relative'>{props.children}</div>
                              </div>
                            </div>
                            {isChatbotOpen && (
                              <div
                                className=' shadow-2xl shadow-gray-500  col-span-3 bg-white text-white  transition-opacity duration-500 ease-in-out'
                                id='chatbot-region'
                              >
                                <div className='col-span-3 w-full h-full' />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modals */}
      <div className='text-white'>
        {isLoading && <LoadingModal />}
        {isAlert.length > 0 && (
          <AlertModal message={isAlert[0]?.msg} action={isAlert[1]} />
        )}
      </div>
    </>
  );
}

export default Layout;
