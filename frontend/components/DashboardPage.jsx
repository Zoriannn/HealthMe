import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Aos from "aos";
import {
  DollarOutlined,
  UserOutlined,
  TrophyOutlined,
  SmileOutlined,
  FundOutlined,
  RiseOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import {
  Card, Col, Row, Statistic, Progress, List, Avatar, Table, Tag, Space, Timeline, message, notification, Button,
} from 'antd';
import { Pie, Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import 'aos/dist/aos.css';
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css';
import 'chart.js/auto';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// Dynamically import MapContainer, TileLayer, Marker, and Popup from react-leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const getTransactionApi = () =>
  axios
    .request({
      method: "get",
      url: "https://service-testnet.maschain.com/api/token/get-token-transaction?wallet_address=0xdA383c9CaCa3dbfCbF8535fFB9B8E8F3eD9CD70c&contract_address=0x03B8a1a8eF80AeD20d8dF9f1A18dE8150BD49C83&filter=from",
      headers: {
        "Content-Type": "application/json",
        client_id:
          "0264a6a2135d0b766d212db38a1a0fcd2334c651acb32b69098c2fb0c6c98db9",
        client_secret:
          "sk_59bb96279047f2365169a00b7ced5e4d39f5ed5e7da417b3d5c1d849dd697318",
      },
    })
    .then((response) => console.log(response))
    .catch((error) => false);

function DashboardPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.setting.username);
  const [donatedAmount, setDonatedAmount] = useState(50000);
  const [L, setL] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [impactMetrics, setImpactMetrics] = useState({
    peopleHelped: 152,
    projectsFunded: 23,
    resourcesProvided: 3000,
  });

  useEffect(() => {
    //getTransactionApi();
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import Leaflet dynamically and set the state
      import("leaflet").then((leaflet) => {
        delete leaflet.Icon.Default.prototype._getIconUrl;

        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        });

        setL(leaflet);
      });

      // Import Leaflet CSS
      require("leaflet/dist/leaflet.css");
    }
  }, []);

  useEffect(() => {
    // Simulate fetching recent donations
    setRecentDonations([
      { donor: 'John Doe', amount: 100, date: '2024-07-23' },
      { donor: 'Jane Smith', amount: 250, date: '2024-07-22' },
      { donor: 'Alice Johnson', amount: 50, date: '2024-07-21' },
    ]);

    // Simulate fetching top donors
    setTopDonors([
      { name: 'John Doe', amount: 10000 },
      { name: 'Jane Smith', amount: 7500 },
      { name: 'Alice Johnson', amount: 5000 },
    ]);
  }, []);

  const openNotification = () => {
    notification.open({
      message: 'New Donation!',
      description: 'John Doe just donated $100.',
      icon: <DollarOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const tilesInfo = [
    {
      label: "Donated Amount",
      amount: donatedAmount,
      antdIcon: (
        <DollarOutlined style={{ fontSize: "40px", color: "orange" }} />
      ),
    },
    {
      label: 'People Helped',
      amount: impactMetrics.peopleHelped,
      antdIcon: <UserOutlined style={{ fontSize: '40px', color: 'blue' }} />,
    },
    {
      label: "Leadership Ranking",
      amount: "5th",
      antdIcon: <TrophyOutlined style={{ fontSize: "40px", color: "green" }} />,
    },
    {
      label: 'Funds Raised',
      amount: '$500,000',
      antdIcon: <FundOutlined style={{ fontSize: '40px', color: 'purple' }} />,
    },
    {
      label: 'Donation Growth',
      amount: '15%',
      antdIcon: <RiseOutlined style={{ fontSize: '40px', color: 'red' }} />,
    },
    {
      label: 'Funds Raised',
      amount: '$500,000',
      antdIcon: <FundOutlined style={{ fontSize: '40px', color: 'purple' }} />,
    },
    {
      label: 'Donation Growth',
      amount: '15%',
      antdIcon: <RiseOutlined style={{ fontSize: '40px', color: 'red' }} />,
    },
  ];

  const notifications = [
    {
      message: 'Your donation to Chauncey Bowen has been processed',
      date: '2024-07-20',
    },
    {
      message: 'Your donation to Toni Petersen has been processed',
      date: '2024-07-19',
    },
    {
      message: 'New leaderboard update: You are now ranked 5th in the world!',
      date: '2024-07-18',
    },
  ];

  const recentActivities = [
    { activity: "Cashed in RM200", date: "2024-07-22" },
    { activity: "Cashed in RM500", date: "2024-07-23" },
    { activity: "Cashed in RM100", date: "2024-07-21" },
  ];

  const donationLocations = [
    {
      id: 1, name: 'Chauncey Bowen', position: [3.139, 101.6869], amount: '$100',
    }, // Kuala Lumpur, Malaysia
    {
      id: 2, name: 'Toni Petersen', position: [1.3521, 103.8198], amount: '$250',
    }, // Singapore
    {
      id: 3, name: 'Meritxell Mata', position: [13.7563, 100.5018], amount: '$50',
    }, // Bangkok, Thailand
  ];

  const successStories = [
    {
      image: '/images/bg1.png',
      quote: 'Charity A used the donations to build a new school for children in need.',
    },
    {
      image: '/images/bg1.png',
      quote: 'Charity B provided clean water to over 1,000 families.',
    },
    // Add more stories as needed
  ];

  // Data for Pie Chart
  const pieData = {
    labels: ['Malaysia', 'Singapore', 'Thailand'],
    datasets: [
      {
        data: [300, 500, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Data for Line Chart
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Donation Trends',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return (
    <Layout>
      <div className='w-2/3  mx-auto my-12 px-4 '>
        <header className='mb-8'>
          <div
            className='text-white text-center p-6 rounded-xl shadow-md'
            style={{
              backgroundImage: 'url(\'/images/welcomeBanner.png\')',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h1 className='ml-14 text-3xl font-bold text-gray-800'>
              Welcome to HealthMe,
              {' '}
              {username || 'Jing Jie'}
            </h1>
            <p className='mt-2 ml-14 text-xl text-gray-800 '>
              Your Wealth For All. The Help For Everyone
            </p>
          </div>
        </header>

        <Row>
          <div className='grid w-full grid-cols-3 gap-6 my-8'>
            <div className='bg-white p-6 rounded-xl shadow-md flex w-full items-center'>
              <div className='text-orange-500 text-4xl mr-4'>
                <DollarOutlined style={{ fontSize: '40px' }} />
              </div>
              <div>
                <div className='text-gray-500 text-sm'>Donated Amount</div>
                <div className='text-2xl font-bold text-orange-500'>50,000</div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md flex items-center'>
              <div className='text-blue-500 text-4xl mr-4'>
                <UserOutlined style={{ fontSize: '40px' }} />
              </div>
              <div>
                <div className='text-gray-500 text-sm'>People Helped</div>
                <div className='text-2xl font-bold text-blue-500'>152</div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md flex items-center'>
              <div className='text-red-500 text-4xl mr-4'>
                <RiseOutlined style={{ fontSize: '40px' }} />
              </div>
              <div>
                <div className='text-gray-500 text-sm'>Donation Growth</div>
                <div className='text-2xl font-bold text-red-500'>15%</div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md flex items-center'>
              <div className='text-green-500 text-4xl mr-4'>
                <TrophyOutlined style={{ fontSize: '40px' }} />
              </div>
              <div>
                <div className='text-gray-500 text-sm'>Leadership Ranking</div>
                <div className='text-2xl font-bold text-green-500'>5th</div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md flex items-center'>
              <div className='text-yellow-500 text-4xl mr-4'>
                <TrophyOutlined style={{ fontSize: '40px' }} />
              </div>
              <div>
                <div className='text-gray-500 text-sm'>Next Rank Progress</div>
                <div className='relative pt-1'>
                  <div className='overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200'>
                    <div style={{ width: '70%' }} className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500' />
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md flex items-center'>
              <div className='text-indigo-500 text-4xl mr-4'>
                <HeartOutlined style={{ fontSize: '40px' }} />
              </div>
              <div>
                <div className='text-gray-500 text-sm'>VIP Status</div>
                <div className='text-2xl font-bold text-indigo-500'>Diamond</div>
              </div>
            </div>
          </div>
        </Row>

        <div className='my-8 rounded-lg'>
  <div className='bg-white p-6 rounded-lg shadow-md'>
    <h2 className='text-lg font-bold mb-3'>My Donation Pool</h2>
    <div className='relative pt-1'>
      <div className='overflow-hidden h-6 mb-4 text-xs flex rounded bg-blue-200'>
        <div style={{ width: '60%' }} className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-yellow-500'></div>
      </div>
    </div>
    <div className='flex justify-between mt-2'>
      <span className='text-black font-bold' style={{ fontSize: '15px' }}>
        0
      </span>
      <span className='text-black font-bold' style={{ fontSize: '15px' }}>
        60,000 $HeMe
      </span>
    </div>
  </div>
</div>

<div className="my-8">
  <Card>
  <h2 className="text-2xl font-bold text-center mb-6">Success Stories</h2>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 500 }}
          pagination={{ clickable: true }}
        >
          {successStories.map((story, index) => (
            <SwiperSlide key={index} >
              <div
                className="h-64 flex items-center justify-center text-white text-center p-8 rounded-lg"
                style={{
                  backgroundImage: `url(${story.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <p className="text-xl font-semibold bg-black bg-opacity-50 p-4 rounded-lg">{story.quote}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
  </Card>
      
      </div>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card hoverable title='Notifications' className='rounded-xl shadow-md'>
              <List
                itemLayout='horizontal'
                dataSource={notifications}
                renderItem={(notification) => (
                  <List.Item>
                    <List.Item.Meta
                      title={notification.message}
                      description={notification.date}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col span={12}>
            <Card hoverable title='Recent Activities' className='rounded-xl shadow-md'>
              <List
                itemLayout='horizontal'
                dataSource={recentActivities}
                renderItem={(activity) => (
                  <List.Item>
                    <List.Item.Meta
                      title={activity.activity}
                      description={activity.date}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className='my-8'>
          <Col span={12}>
            <Card hoverable title='Donation Distribution by Country' className='rounded-xl shadow-md'>
              <Pie data={pieData} />
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable title='Donation Trends' className='rounded-xl shadow-md'>
              <Line data={lineData} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card hoverable title='Top Donors' className='rounded-xl shadow-md'>
              <List
                itemLayout='horizontal'
                dataSource={topDonors}
                renderItem={(donor) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
                      title={donor.name}
                      description={`Donated $${donor.amount}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable title='Impact Metrics' className='rounded-xl shadow-md'>
              <List>
                <List.Item>
                  <Statistic title='People Helped' value={impactMetrics.peopleHelped} />
                </List.Item>
                <List.Item>
                  <Statistic title='Projects Funded' value={impactMetrics.projectsFunded} />
                </List.Item>
                <List.Item>
                  <Statistic title='Resources Provided' value={impactMetrics.resourcesProvided} />
                </List.Item>
              </List>
            </Card>
          </Col>
        </Row>

        <div className='my-8'>
          <Card hoverable title='Donation Milestones' className='rounded-xl shadow-md'>
            <Timeline>
              <Timeline.Item>Reached $10,000 on 2024-06-10</Timeline.Item>
              <Timeline.Item>Reached $50,000 on 2024-06-20</Timeline.Item>
              <Timeline.Item>Reached $100,000 on 2024-07-01</Timeline.Item>
              <Timeline.Item>Reached $500,000 on 2024-07-20</Timeline.Item>
            </Timeline>
          </Card>
        </div>

        <div className='my-8'>
          {L && (
            <Card hoverable className='rounded-xl shadow-md'>
              <h2 className='text-lg font-bold mb-3'>Donation Map</h2>
              <MapContainer
                center={[3.139, 101.6869]}
                zoom={5}
                scrollWheelZoom={false}
                style={{ height: '500px', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {donationLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={location.position}
                    icon={L.icon({
                      iconUrl: '/images/marker-icon.png',
                      iconSize: [32, 32],
                    })}
                  >
                    <Popup>
                      <b>{location.name}</b>
                      <br />
                      Donation Amount:
                      {' '}
                      {location.amount}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Card>
          )}
        </div>

        <div className='my-8'>
          <Card hoverable title='Your Donation Transactions' className='rounded-xl shadow-md'>
            <table className='w-full bg-gray-100 rounded-md shadow-md'>
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
          </Card>
        </div>

        <div className='my-8'>
          <Card hoverable title='Stories and Testimonials' className='rounded-xl shadow-md'>
            <List
              itemLayout='vertical'
              dataSource={[
                {
                  title: 'Charity A Impact Story',
                  description: 'Charity A used the donations to build a new school for children in need.',
                  avatar: '/images/story1.jpg',
                },
                {
                  title: 'Charity B Success Story',
                  description: 'Charity B provided clean water to over 1,000 families.',
                  avatar: '/images/story2.jpg',
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>

        <div className='my-8'>
          <Card hoverable title='Matching Gift Opportunities' className='rounded-xl shadow-md'>
            <List
              itemLayout='horizontal'
              dataSource={[
                { company: 'Company A', matchAmount: '$5000', endDate: '2024-08-31' },
                { company: 'Company B', matchAmount: '$10000', endDate: '2024-12-31' },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.company}
                    description={`Matching up to ${item.matchAmount} until ${item.endDate}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>

        <div className='my-8'>
          <Card hoverable title='Social Media Integration' className='rounded-xl shadow-md'>
            <Button type='primary' icon={<UserOutlined />} onClick={() => message.info('Shared on Social Media')}>
              Share Your Donation Activity
            </Button>
          </Card>
        </div>

        <div className='my-8'>
          <Card hoverable title='Transparent Financial Reports' className='rounded-xl shadow-md'>
            <Table
              columns={[
                { title: 'Category', dataIndex: 'category', key: 'category' },
                { title: 'Amount', dataIndex: 'amount', key: 'amount' },
              ]}
              dataSource={[
                { key: '1', category: 'Administrative Costs', amount: '$50,000' },
                { key: '2', category: 'Project Funding', amount: '$200,000' },
                { key: '3', category: 'Marketing', amount: '$30,000' },
                { key: '4', category: 'Miscellaneous', amount: '$20,000' },
              ]}
              pagination={false}
            />
          </Card>
        </div>

        <div className='my-8'>
          <Card hoverable title='Gamification Elements' className='rounded-xl shadow-md'>
            <List
              itemLayout='horizontal'
              dataSource={[
                { title: 'Bronze Donor', description: 'Donate $100' },
                { title: 'Silver Donor', description: 'Donate $500' },
                { title: 'Gold Donor', description: 'Donate $1000' },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#FFD700' }} icon={<TrophyOutlined />} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;
