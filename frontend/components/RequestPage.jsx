/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Aos from 'aos';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import record from '../record.json';

function RequestPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, [dispatch]);

  return (
    <Layout>
      <div className='App'>
        {record.map((item) => (
          <div key={item.id} className='record-item'>
            <h2>{item.name}</h2>
            <p>Age: {item.age}</p>
            <p>Contact Number: {item.contactNumber}</p>
            <p>Medical Domain: {item.medicalDomain}</p>
            <p>Treatment Detail: {item.treatmentDetail}</p>
            <p>Financial Need: {item.financialNeed}</p>
            <p>Impact of Donation: {item.impactOfDonation}</p>
            <p>Verification Documents: {item.verificationDocuments}</p>
            <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default RequestPage;
