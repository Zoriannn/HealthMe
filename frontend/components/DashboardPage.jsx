import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Aos from 'aos';
import {
  DollarOutlined, UserOutlined, TrophyOutlined, SmileOutlined,
} from '@ant-design/icons';
import ProgressBar from '@ramonak/react-progress-bar';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';

// Fix for default marker icon not showing
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Dynamically import MapContainer, TileLayer, Marker, and Popup from react-leaflet
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

function DashboardPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.setting.username);

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = './images/malaysiaMap.png';

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const arrows = [
        {
          startX: 210, startY: 340, endX: 210, endY: 340, color: 'red',
        },
        {
          startX: 550, startY: 590, endX: 550, endY: 590, color: 'blue',
        },
      ];

      arrows.forEach((arrow) => {
        drawCurvedArrow(
          ctx,
          arrow.startX,
          arrow.startY,
          arrow.endX,
          arrow.endY,
          arrow.color,
        );
      });
    };
  }, []);

  const drawCurvedArrow = (ctx, startX, startY, endX, endY, color) => {
    const controlX = (startX + endX) / 2;
    const controlY = startY - 50;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    const headlen = 10;
    const angle = Math.atan2(endY - controlY, endX - controlX);
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - headlen * Math.cos(angle - Math.PI / 6),
      endY - headlen * Math.sin(angle - Math.PI / 6),
    );
    ctx.lineTo(
      endX - headlen * Math.cos(angle + Math.PI / 6),
      endY - headlen * Math.sin(angle + Math.PI / 6),
    );
    ctx.lineTo(endX, endY);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const tilesInfo = [
    {
      label: 'Donated Amount',
      amount: '50,000',
      antdIcon: <DollarOutlined style={{ fontSize: '40px', color: 'orange' }} />,
    },
    {
      label: 'People Helped',
      amount: '152',
      antdIcon: <UserOutlined style={{ fontSize: '40px', color: 'blue' }} />,
    },
    {
      label: 'Leadership Ranking',
      amount: '5th',
      antdIcon: <TrophyOutlined style={{ fontSize: '40px', color: 'green' }} />,
    },
  ];

  const notifications = [
    { message: 'Your donation to Charity A has been processed', date: '2024-07-20' },
    { message: 'Your donation to Charity A has been processed', date: '2024-07-19' },
    { message: 'New leaderboard update: You are now ranked 5th', date: '2024-07-18' },
  ];

  const recentActivities = [
    { activity: 'Cashed in RM200', date: '2024-07-22' },
    { activity: 'Cashed in RM500', date: '2024-07-23' },
    { activity: 'Cashed in RM100', date: '2024-07-21' },
  ];

  const donationLocations = [
    { id: 1, name: 'Charity A', position: [3.1390, 101.6869], amount: '$100' }, // Kuala Lumpur, Malaysia
    { id: 2, name: 'Charity B', position: [1.3521, 103.8198], amount: '$250' }, // Singapore
    { id: 3, name: 'Charity C', position: [13.7563, 100.5018], amount: '$50' }, // Bangkok, Thailand
  ];

  return (
    <Layout>
      <div className="text-xl flex flex-col justify-center align-center items-center my-24">
        <div className="w-2/3 my-5 text-lg align-center justify-center items-center flex">
          Hello {" "} {username}
          {" "}
          <span className='ml-3'><SmileOutlined style={{ fontSize: '50px' }} /></span>
        </div>
        <div className="w-2/3 my-5">
          <div className="grid grid-cols-3 gap-6">
            {tilesInfo.map((i, index) => (
              <div key={index} className="bg-gray-100 shadow-md rounded-md p-4 flex flex-col items-center hover:bg-gray-200 transition duration-200 ease-in-out transform hover:scale-105">
                <div className="mb-2 text-center">{i.antdIcon}</div>
                <div className="text-[25px] text-center ">{i.label}</div>
                <div className="font-bold text-2xl text-center">{i.amount}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 my-5">
          <h2 className="text-lg font-bold mb-3">Donation Pool</h2>
          <ProgressBar
            className="w-full"
            completed={60}
            animateOnRender
            bgColor="#4caf50"
            baseBgColor="#e0e0e0"
            height="30px"
            labelAlignment="outside"
            labelColor="#fff"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>0</span>
            <span>60,000 $HeMe</span>
          </div>
        </div>
        <div className="w-2/3 my-5 bg-gray-100 p-5 shadow-md rounded-md hover:bg-gray-200 transition duration-200 ease-in-out">
          <h2 className="text-lg font-bold mb-3">Notifications</h2>
          <div className="flex flex-col space-y-2">
            {notifications.map((notification, index) => (
              <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out">
                <div>{notification.message}</div>
                <div className="text-sm text-gray-500">{notification.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 my-5 bg-gray-100 p-5 shadow-md rounded-md hover:bg-gray-200 transition duration-200 ease-in-out">
          <h2 className="text-lg font-bold mb-3">Recent Activities</h2>
          <div className="flex flex-col space-y-2">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out">
                <div>{activity.activity}</div>
                <div className="text-sm text-gray-500">{activity.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 my-5">
          <MapContainer center={[3.1390, 101.6869]} zoom={5} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
          </MapContainer>
        </div>
        <div className="w-2/3 my-5">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{ border: '1px solid black' }}
          />
        </div>
        <div className="w-2/3 my-5">
          <div className="table-container">
            <table className="w-full bg-gray-100 rounded-md shadow-md">
              <caption className="font-bold text-lg mb-3">Your Donation Transactions</caption>
              <thead>
                <tr className="bg-gray-200 hover:bg-gray-300 transition duration-200 ease-in-out">
                  <th className="p-2">Donation Amount</th>
                  <th className="p-2">Token Amount</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Recipient</th>
                  <th className="p-2">Donation Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-200 transition duration-200 ease-in-out">
                  <td className="p-2">$100</td>
                  <td className="p-2">100 Tokens</td>
                  <td className="p-2">2024-07-20</td>
                  <td className="p-2">Charity A</td>
                  <td className="p-2">One-Time</td>
                </tr>
                <tr className="hover:bg-gray-200 transition duration-200 ease-in-out">
                  <td className="p-2">$250</td>
                  <td className="p-2">250 Tokens</td>
                  <td className="p-2">2024-07-21</td>
                  <td className="p-2">Charity B</td>
                  <td className="p-2">Recurring</td>
                </tr>
                <tr className="hover:bg-gray-200 transition duration-200 ease-in-out">
                  <td className="p-2">$50</td>
                  <td className="p-2">50 Tokens</td>
                  <td className="p-2">2024-07-22</td>
                  <td className="p-2">Charity C</td>
                  <td className="p-2">One-Time</td>
                </tr>
                <tr className="hover:bg-gray-200 transition duration-200 ease-in-out">
                  <td className="p-2">$75</td>
                  <td className="p-2">75 Tokens</td>
                  <td className="p-2">2024-07-23</td>
                  <td className="p-2">Charity A</td>
                  <td className="p-2">Recurring</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;