import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DailyForecast.css";
import { DateTime } from "luxon";
import Slider from "react-slick";
import { weatherIcon } from "../ui/weatherIcon";
const DailyForecast = ({ dailyData }) => {
  const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

  const weather = dailyData?.daily?.map((item, index) => {
    const day = formatToLocalTime(item?.dt, dailyData?.timezone, "cccc");
    const time = formatToLocalTime(item?.dt, dailyData?.timezone, "hh:mm a");
    const realFeel = item.feels_like.day;
    const wind_speed = item.wind_speed;
    const uvi = item.uvi;
    const condition = item.weather[0].main;
    return {
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

  console.log(weather);
  return (
    <div class="daily">
      <Slider {...settings}>
        {weather?.map((item) => {
          return (
            <Item day={item?.day} icon={weatherIcon(item.condition)}></Item>
          );
        })}
      </Slider>
      <div class="daily-time">
        <p className="time">{}</p>
      </div>
    </div>
  );
};

const Item = ({ day, icon }) => {
  return (
    <div className="item">
      <p className="item-text">{day.slice(0, 3)}</p>
      <img class="item-icon" src={icon} alt="" />
    </div>
  );
};

export default DailyForecast;
