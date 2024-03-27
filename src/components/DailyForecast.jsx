import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DailyForecast.css";
import { DateTime } from "luxon";
import Slider from "react-slick";
import { weatherIcon } from "../ui/weatherIcon";
const DailyForecast = ({ dailyData }) => {
  const [index, setIndex] = useState(0);
  const dailyItems = [
    { icon: "./realfeel.svg", label: "Real Feel", value: "realFeel" },
    { icon: "./wind.svg", label: "Wind", value: "wind_speed" },
    { icon: "./uvi.svg", label: "UV Index", value: "uvi" },
  ];
  const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

  const weather = dailyData?.daily?.map((item, index) => {
    const day = formatToLocalTime(item?.dt, dailyData?.timezone, "cccc");
    const time = formatToLocalTime(item?.dt, dailyData?.timezone, "hh:mm a");
    const realFeel = Math.floor(item.feels_like.day) + "°";
    const wind_speed = Math.floor(item.wind_speed) + " m/s";
    const uvi = item.uvi;
    const condition = item.weather[0].main;
    return {
      dt: item.dt,
      day,
      time,
      realFeel,
      wind_speed,
      uvi,
      condition,
    };
  });
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div class="daily">
      <Slider {...settings}>
        {weather?.map((item, index) => {
          return (
            <Item
              onClick={() => setIndex(index)}
              day={item?.day}
              icon={weatherIcon(item.condition)}
            ></Item>
          );
        })}
      </Slider>
      <div className="daily-content">
        <div class="daily-time">
          <img src="./timeIcon.svg" alt="" />
          <p className="time">{weather && weather[index]?.time + " GMT"}</p>
        </div>
        <p className="air-conditions">AIR CONDITIONS</p>
        {dailyItems.map((item) => {
          return (
            <div className="daily-items">
              <img src={item.icon} alt="" className="real-feel-icon" />
              <div className="real-feel-content">
                <p className="daily-items-label">{item.label}</p>
                <p className="daily-items-value">
                  {weather && weather[index][`${item.value}`]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Item = ({ day, icon, ...rest }) => {
  return (
    <div {...rest} className="item">
      <p className="item-text">{day.slice(0, 3)}</p>
      <img class="item-icon" src={icon} alt="" />
    </div>
  );
};

export default DailyForecast;
