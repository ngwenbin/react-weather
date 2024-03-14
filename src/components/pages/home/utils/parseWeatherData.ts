import { WeatherResponse } from "@/pages/api/getWeather";
import { v4 as uuidv4 } from "uuid";

export type WeatherData = {
  id: string;
  weatherMain: string;
  weatherDescription: string;
  city: string;
  countryCode: string;
  temperatureMax: number;
  temperatuerMin: number;
  humidity: number;
  time: number;
  lat: number;
  lon: number;
};

export const parseWeatherData = (input: WeatherResponse): WeatherData => {
  const { name, main, weather, sys, coord } = input;
  return {
    id: uuidv4(),
    city: name,
    time: Date.now(),
    temperatuerMin: main.temp_min,
    temperatureMax: main.temp_max,
    weatherMain: weather[0].main,
    weatherDescription: weather[0].description,
    countryCode: sys.country,
    humidity: main.humidity,
    lat: coord.lat,
    lon: coord.lon,
  };
};
