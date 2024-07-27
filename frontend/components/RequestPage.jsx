/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Aos from 'aos';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import record from '../record.json';

function RequestPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
    setIsClient(true); 
  }, [dispatch]);

  const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < record.length; i += 3) {
      grid.push(
        <div key={i} className='row'>
          {record.slice(i, i + 3).map((item) => (
            <div key={item.id} className='square'>
              <h2>{item.name}</h2>
              <p>Age: {item.age}</p>
              <p>Contact Number: {item.contactNumber}</p>
              <p>Medical Domain: {item.medicalDomain}</p>
              <p>Treatment Detail: {item.treatmentDetail}</p>
              <p>Financial Need: {item.financialNeed}</p>
              <p>Impact of Donation: {item.impactOfDonation}</p>
              <p>Verification Documents: {item.verificationDocuments}</p>
              <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
              <div className='button-container'>
                <button className='btn'>Button 1</button>
                <button className='btn'>Button 2</button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return grid;
  };

  return (
    <Layout>
      <div className='App'>
        {isClient ? generateGrid() : null}
      </div>
    </Layout>
  );
}

export default RequestPage;
