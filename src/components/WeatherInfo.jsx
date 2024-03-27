import React from "react";
import "./WeatherInfo.css";
import { useFormatDate } from "../hooks/useFormatDate";
import { weatherIcon } from "../ui/weatherIcon";

export const WeatherInfo = ({ data, setIsSearchOpen }) => {
  const icon = weatherIcon(data?.weather[0]["main"]);
  return (
    <div className="weather">
      <div className="city" onClick={() => setIsSearchOpen(true)}>
        <img className="city__icon" src="./icons/Vector.svg" alt="" />
        <p className="city__name">{data?.name}</p>
      </div>
      <p className="weather__condition">{data?.weather[0]["main"]}</p>
      <div className="weather__icon">
        <img src={icon} alt="" />
      </div>
      <div className="weather__information">
        <p className="weather__temperature">{Math.floor(data?.main?.temp)}°C</p>
        <p className="weather__date">
          {useFormatDate(data?.dt, data?.timezone)}
        </p>
      </div>
    </div>
  );
};
