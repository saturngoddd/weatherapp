import { useEffect, useState } from "react";
import "./App.css";
import { WeatherInfo } from "./components/WeatherInfo";
import { SearchModal } from "./components/searchModal";
import {
  useGetWeatherByCityQuery,
  useGetWeatherByHoursAndDailyQuery,
} from "./services/weatherApi";
import { LineChart } from "./components/LineChart";
import Menu from "./components/Menu";

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [city, setCity] = useState("Bishkek");
  const { data, isSuccess, isError, isFetching } =
    useGetWeatherByCityQuery(city);
  const condition = data?.weather[0].main;
  useEffect(() => {
    if (!isFetching) {
      if (isSuccess) {
        setIsSearchOpen(false);
      } else {
        setIsSearchOpen(true);
        setCity("");
      }
    }
  }, [isSuccess, isError, isFetching]);
  console.log(condition);
  // const { data: hourlyData } = useGetWeatherByHoursAndDailyQuery(data);
  return (
    <div className="App">
      <div className="container">
        <WeatherInfo data={data} setIsSearchOpen={setIsSearchOpen} />
        <SearchModal
          isCityFound={isSuccess}
          setCity={setCity}
          setIsSearchOpen={setIsSearchOpen}
          isSearchOpen={isSearchOpen}
        />
        <div className="flex">
          <Menu />
          {/* <LineChart hourlyData={hourlyData} /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
