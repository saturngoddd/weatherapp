import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import * as helpers from "chart.js/helpers";
import { DateTime } from "luxon";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
window.ChartJS = ChartJS;
ChartJS.helpers = helpers;
import("chart.js-plugin-labels-dv");

export const LineChart = ({ hourlyData }) => {
  console.log(hourlyData);
  const weatherIcons = [];
  const windSpeed = [];
  const timezone = hourlyData?.timezone;
  const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

  const labelsData = hourlyData?.hourly
    ?.map((item, index) => {
      if (index % 2 === 0) {
        return formatToLocalTime(item?.dt, timezone, "hh:mm a");
      }
    })
    .filter((label) => label !== undefined);

  const tempData = hourlyData?.hourly
    ?.map((item, index) => {
      if (index % 2 === 0) {
        windSpeed.push(`${item.wind_speed}km/h`);
        const img = new Image();
        img.src =
          "https://openweathermap.org/img/wn/" + item.weather[0].icon + ".png";
        weatherIcons.push(img);
        return Math.floor(item?.temp);
      }
    })
    .filter((label) => label !== undefined);
  const labels = labelsData?.slice(0, 7);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: tempData?.slice(0, 7),
        backgroundColor: "transparent",
        borderColor: "#FFC355",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.5,
      },
      {
        label: "weatherIcons",
        data: weatherIcons?.slice(0, 7),
      },
      {
        label: "windSpeed",
        data: windSpeed?.slice(0, 7),
      },
    ],
  };
  const options = {
    layout: {
      padding: {
        left: 30,
        right: 30,
      },
    },
    scales: {
      y: {
        display: false,
        grace: 5,
        ticks: {
          display: false,
        },
      },
      x: {
        display: false,
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        anchor: "end",
        align: "top",
        font: {
          family: `Inter, sans-serif`,
          weight: "bold",
          size: 14,
        },
      },
    },
  };
  const chartAreaBackgroundColor = {
    id: "chartAreaBackgroundColor",
    beforeDatasetsDraw(chart, args, plugins) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();
      ctx.fillStyle = "#DEAB4D";
      ctx.fillRect(left, top, width, height);
    },
  };
  const timeLabels = {
    id: "timeLabels",
    afterDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        scales: { x, y },
      } = chart;
      chart.data.datasets[0].data.forEach((datapoint, index) => {
        ctx.font = "400 12px Inter, sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(
          index === 0 ? "Now" : chart.data.labels[index],
          x.getPixelForValue(index),
          y.getPixelForValue(datapoint) + 90
        );
      });
    },
  };
  const img1 = new Image();
  img1.src = "https://www.chartjs.org/img/chartjs-logo.svg";
  const lineWeatherIcons = {
    id: "lineWeatherIcons",
    afterDatasetsDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart;
      ctx.save();
      chart.data.datasets[0].data.forEach((datapoint, index) => {
        ctx.drawImage(
          chart.data.datasets[1].data[index],
          x.getPixelForValue(index) - 50 / 2,
          y.getPixelForValue(datapoint) + 20,
          50,
          50
        );
      });
    },
  };

  const windSpeedLabels = {
    id: "windSpeedLabels",
    afterDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        scales: { x, y },
      } = chart;
      chart.data.datasets[0].data.forEach((datapoint, index) => {
        ctx.font = "400 12px Inter, sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(
          chart.data.datasets[2].data[index],
          x.getPixelForValue(index),
          y.getPixelForValue(datapoint) + 75
        );
      });
    },
  };
  const plugins = [
    chartAreaBackgroundColor,
    ChartDataLabels,
    timeLabels,
    lineWeatherIcons,
    windSpeedLabels,
  ];
  return (
    <div
      style={{
        height: "30%",
        background: "#DEAB4D",
        width: "60%",
        borderRadius: "40px",
      }}
    >
      <Line
        data={data}
        width={1150}
        height={480}
        options={options}
        plugins={plugins}
      ></Line>
    </div>
  );
};
