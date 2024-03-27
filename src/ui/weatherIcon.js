export const weatherIcon = (option) => {
  if (option === "Clear") {
    return `./icons/clearsky.svg`;
  }
  if (option === "Clouds") {
    return `./icons/clouds.svg`;
  }
  if (option === "Rain") {
    return `./icons/showerrain.svg`;
  }
  if (option === "Thunderstorm") {
    return `./icons/thunderstorm.svg`;
  }
  if (option === "Snow") {
    return `./icons/thunderstorm.svg`;
  }
};
