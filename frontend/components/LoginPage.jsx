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
function LoginPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, []);

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <div className='text-xl flex flex-col justify-center items-center my-24'>
        <div className='flex mb-6'>
          <button
            onClick={() => handleTabChange('login')}
            className={`px-6 py-2 font-bold ${activeTab === 'login' ? 'border-b-2 border-red-500' : 'text-gray-700'}`}
          >
            Log In
          </button>
          <button
            onClick={() => handleTabChange('signup')}
            className={`px-6 py-2 font-bold ${activeTab === 'signup' ? 'border-b-2 border-red-500' : 'text-gray-700'}`}
          >
            Sign Up
          </button>
        </div>
        {activeTab === 'login' && (
          <div className='border border-gray-300 rounded-lg p-8 shadow-lg w-full max-w-sm'>
            <form>
              <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700'>Email:</label>
                <input
                  type='email'
                  id='email'
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  placeholder='Enter your email'
                />
              </div>
              <div className='mb-6'>
                <label htmlFor='password' className='block text-gray-700'>Password:</label>
                <input
                  type='password'
                  id='password'
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  placeholder='Enter your password'
                />
              </div>
              <button
                type='button' // Change to 'button' to prevent form submission
                className='w-full bg-red-500 text-white py-2 px-4 rounded font-bold'
              >
                Sign In
              </button>
            </form>
          </div>
        )}
        {activeTab === 'signup' && (
          <div className='border border-gray-300 rounded-lg p-8 shadow-lg w-full max-w-sm'>
            <form>
              <div className='mb-4'>
                <label htmlFor='signup-email' className='block text-gray-700'>Email:</label>
                <input
                  type='email'
                  id='signup-email'
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  placeholder='Enter your email'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='signup-password' className='block text-gray-700'>Password:</label>
                <input
                  type='password'
                  id='signup-password'
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  placeholder='Enter your password'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='confirm-password' className='block text-gray-700'>Confirm Password:</label>
                <input
                  type='password'
                  id='confirm-password'
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  placeholder='Confirm your password'
                />
              </div>
              <button
                type='button' // Change to 'button' to prevent form submission
                className='w-full bg-red-500 text-white py-2 px-4 rounded font-bold'
              >
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default LoginPage;
