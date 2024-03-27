import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiKey = "8820af77df17064394cb8666a9f0a000";
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/",
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) => `2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
    }),
    getWeatherByHoursAndDaily: builder.query({
      query: (data) =>
        `3.0/onecall?lat=${data?.coord?.lat}&lon=${data?.coord?.lon}&exclude=minutely&units=metric&appid=${apiKey}`,
    }),
  }),
});

export const { useGetWeatherByCityQuery, useGetWeatherByHoursAndDailyQuery } =
  weatherApi;
