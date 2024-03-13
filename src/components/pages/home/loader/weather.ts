import {
  GetWeatherRequestBody,
  GetWeatherResponse,
  WeatherResponse,
} from "@/pages/api/getWeather";
import { useState } from "react";

export const useWeather = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [data, setData] = useState<WeatherResponse>();

  const getWeather = async (input: GetWeatherRequestBody) => {
    try {
      setIsLoading(true);
      setErrors("");
      const response = await fetch("/api/getWeather", {
        method: "POST",
        body: JSON.stringify(input),
      });
      const data = (await response?.json()) as GetWeatherResponse;
      if (data.error) {
        throw new Error(data.error);
      }
      setData(data.data);
      return data;
    } catch (err) {
      const error = err as Error;
      setErrors(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { getWeather, errors, isLoading, data };
};
