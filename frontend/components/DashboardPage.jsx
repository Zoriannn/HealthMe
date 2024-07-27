/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState, useEffect } from "react";

import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
// import Link from 'next/link';
import _ from "lodash";
import Aos from "aos";
import { ArrowRightOutlined } from "@ant-design/icons";
import Layout from "./general/Layout";
import { SettingActions } from "./reducers/settingReducer";
import { logoIcon } from "../images";
import { routes } from "../route";
import ProgressBar from "@ramonak/react-progress-bar";

function DashboardPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = `./images/malaysiaMap.png`;

    image.onload = () => {
      // Draw the image
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Define the arrow positions
      const arrows = [
        { startX: 210, startY: 340, endX: 210, endY: 340, color: "red" },
        { startX: 550, startY: 590, endX: 550, endY: 590, color: "blue" },
      ];

      // Draw arrows
      arrows.forEach((arrow) => {
        drawCurvedArrow(
          ctx,
          arrow.startX,
          arrow.startY,
          arrow.endX,
          arrow.endY,
          arrow.color
        );
      });
    };
  }, []);

  const drawCurvedArrow = (ctx, startX, startY, endX, endY, color) => {
    const controlX = (startX + endX) / 2;
    const controlY = startY - 50; // Adjust this value to change the curve height

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw arrowhead
    const headlen = 10; // length of head in pixels
    const angle = Math.atan2(endY - controlY, endX - controlX);
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - headlen * Math.cos(angle - Math.PI / 6),
      endY - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      endX - headlen * Math.cos(angle + Math.PI / 6),
      endY - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.lineTo(endX, endY);
    ctx.fillStyle = color;
    ctx.fill();
  };

  return (
    <Layout>
      <div className="text-xl flex flex-col justify-center align-center items-center my-24">
        <div className="w-full flex">
          <div>0</div>
          <ProgressBar
            className="w-full px-0.5"
            completed={90.3}
            animateOnRender={true}
          />
          <div>20,000 $HeMe</div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{ border: "1px solid black" }}
        />
      </div>
    </Layout>
  );
}

export default DashboardPage;
