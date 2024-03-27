import React from "react";
import "./Menu.css";
const Menu = () => {
  return (
    <div class="menu">
      <img class="menu-avatar" src="./Ellipse33.svg" alt="" />
      <div className="menu-content">
        <div className="menu-weather">
          <img className="menu-icon" src="./menuWeather.svg" alt="" />
          <div className="menu-weather-text">weather</div>
        </div>
        <div className="menu-explore">
          <img className="menu-icon" src="./Explore.svg" alt="" />
          <div className="menu-weather-text">Explore</div>
        </div>
        <div className="menu-location">
          <img className="menu-icon" src="./Location.svg" alt="" />
          <div className="menu-weather-text">Cities</div>
        </div>
        <div className="menu-settings">
          <img className="menu-icon" src="./Settings-alt.svg" alt="" />
          <div className="menu-weather-text">Settings</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
