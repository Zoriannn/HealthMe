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
} from "@ant-design/icons";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import Layout from "./general/Layout";
import { SettingActions } from "./reducers/settingReducer";

const getApi = () =>
  axios
    .request({
      method: "get",
      url: "https://service-testnet.maschain.com/api/wallet/wallet?type=1",
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
    


const healthProjects = [
  {
    title: "Emergency Surgery for John Doe",
    description:
      "John Doe requires an urgent surgery for a life-threatening condition. Your donation can save his life.",
    details:
      "John Doe, a 35-year-old father of two, has been diagnosed with a severe heart condition that requires immediate surgery. The estimated cost of the surgery is $25,000. Any contribution can make a significant difference.",
    buttonText: "Donate Now",
    image: "images/project 1.png",
  },
  {
    title: "Blood Donation Campaign",
    description:
      "Support our community blood donation campaign to ensure a stable supply of blood for emergencies.",
    details:
      "Our blood donation campaign aims to collect 500 units of blood to be used in local hospitals. The campaign will run for a month and includes several donation drives across the city. Your support helps save lives.",
    buttonText: "Contribute Now",
    image: "images/project2.jpeg",
  },
  {
    title: "Cancer Treatment for Jane Smith",
    description:
      "Jane Smith is battling cancer and needs funds for her ongoing treatment. Your help is crucial.",
    details:
      "Jane Smith, a 42-year-old woman, has been fighting cancer for two years. She needs ongoing chemotherapy and radiotherapy sessions, which are costly. The total amount required is $50,000. Your generosity can give her a fighting chance.",
    buttonText: "Support Now",
    image: "images/project3.png",
  },
  {
    title: "Medical Supplies for Rural Clinic",
    description:
      "Help us provide essential medical supplies to a rural clinic serving an underprivileged community.",
    details:
      "The rural clinic in question serves a community of over 10,000 people, many of whom lack access to basic healthcare. The clinic needs medical supplies, including medicines, bandages, and diagnostic tools, totaling $15,000. Your donation can improve healthcare access.",
    buttonText: "Donate Now",
    image: "images/project4.png",
  },
  {
    title: "Child Vaccination Program",
    description:
      "Fund our child vaccination program to protect children from preventable diseases.",
    details:
      "Our program aims to vaccinate 2,000 children against common preventable diseases. Vaccinations are crucial for the health and well-being of these children, and the total cost for the program is $20,000. Every donation helps us reach more children.",
    buttonText: "Give Now",
    image: "images/project5.jpeg",
  },
  {
    title: "Mental Health Support Group",
    description:
      "Support our mental health support group for individuals struggling with mental health issues.",
    details:
      "The support group provides counseling and therapy sessions for individuals dealing with mental health issues such as depression and anxiety. We need $10,000 to cover the costs of professional counselors and therapy materials. Your support can make a huge impact.",
    buttonText: "Support Now",
    image: "images/project6.jpeg",
  },
];

function ProjectList({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.setting.username);
  const [donatedAmount, setDonatedAmount] = useState(50000);

  useEffect(() => {
    getApi();
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, [dispatch]);
  const [showDetails, setShowDetails] = useState(
    Array(healthProjects.length).fill(false)
  );

  const toggleDetails = (index) => {
    setShowDetails((prev) => {
      const newShowDetails = [...prev];
      newShowDetails[index] = !newShowDetails[index];
      return newShowDetails;
    });
  };

  return (
    <Layout>
      <div className="text-xl flex flex-col justify-center align-center items-center my-24">
        <div className="w-3/4 my-2">
          <div className="grid grid-cols-3 gap-6">
            {healthProjects.map((project, index) => (
              <div className="project-card" key={index}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-title">{project.title}</div>
                <p>{project.description}</p>
                <div className="button-group">
                  <button
                    className="details-button"
                    onClick={() => toggleDetails(index)}
                  >
                    {showDetails[index] ? "Hide Details" : "Details"}
                  </button>
                  <button className="signup-button">
                    {project.buttonText}
                  </button>
                </div>
                {showDetails[index] && (
                  <div className="details">
                    <p>
                      {project.details} <a href="#">Read more</a>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectList;
