/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
// import Link from 'next/link';
import _ from 'lodash';
import Aos from 'aos';
import { ArrowRightOutlined } from '@ant-design/icons';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import { logoIcon } from '../images';
import { routes } from '../route';
function HomePage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, []);

  return (
    <Layout>

      <div className='text-xl flex flex-col justify-center align-center items-center my-24'>

        <div className='w-2/5'>
          <img src="./images/logo.png" alt="logo" />
    
        </div>

        <div className='ml-5 text-xl font-bold'>
          {'      '}

          Practise with AI Guidance.
          {' '}
          {' '}
          Enhance Your Investment Confidence.
        </div>

        <div className='mt-20'>

        <div
          className='bg-red-500 rounded-full p-5 px-10 font-bold text-white cursor-pointer text-2xl'
          onClick={() => {
            router.push('/login'); 
            dispatch(SettingActions.setSelected(3));
          }}
        >
          Getting Started →
        </div>


        </div>
        <div className='items-center align-center mt-5 font-bold justify-center'>
          Build Your Personality Profile First!
          {' '}

        </div>

      </div>

    </Layout>
  );
}

export default HomePage;
