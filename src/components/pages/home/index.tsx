import { Button, Input } from "@/components/common";
import { FormEvent, useState } from "react";
import { useWeather } from "./loader/weather";
import { GetWeatherRequestBody } from "@/pages/api/getWeather";
import { WeatherDisplay } from "./components/WeatherDisplay";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { WeatherData, parseWeatherData } from "./utils/parseWeatherData";
import { WeatherSearchRecord } from "./components/WeatherSearchRecord";

export const HomePage = () => {
  const { getWeather, isLoading, errors } = useWeather();
  const { value: weatherHistory, setValue: setWeatherHistory } =
    useLocalStorage<WeatherData[]>("weather-history");

  const handleGetWeather = async (input: GetWeatherRequestBody) => {
    const weatherData = await getWeather(input);
    if (weatherData?.data) {
      const parsedWeatherData = parseWeatherData(weatherData.data);
      setWeatherHistory((curr) => [parsedWeatherData, ...(curr ?? [])]);
    }
  };

  const handleOnSearch = (record: WeatherData) => {
    const { lat, lon } = record;
    handleGetWeather({ city: "", country: "", lat, lon });
  };

  const handleOnDelete = (id: string) => {
    setWeatherHistory((curr) => curr?.filter((i) => i.id !== id));
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = Object.fromEntries(
      data.entries()
    ) as unknown as GetWeatherRequestBody;
    handleGetWeather(formData);
  };

  const firstWeatherResult = weatherHistory?.[0];

  return (
    <div>
      <h1 className="text-2xl py-8 font-bold">Weather App</h1>
      <form className="flex flex-wrap" onSubmit={handleOnSubmit}>
        <div className="flex flex-col sm:flex-row">
          <Input
            id="city"
            name="city"
            label="City:"
            labelClassName="mr-2"
            containerClassName="flex items-center grow justify-between m-1"
            className="min-w-0 truncate max-w-40"
          />
          <Input
            id="country"
            name="country"
            label="Country:"
            labelClassName="mr-2"
            containerClassName="flex items-center grow justify-between m-1"
            className="min-w-0 truncate max-w-40"
          />
        </div>
        <div className="basis-full sm:basis-auto m-1">
          <Button id="search" type="submit" disabled={isLoading}>
            Search
          </Button>
          <Button id="clear" type="reset" disabled={isLoading}>
            Clear
          </Button>
        </div>
      </form>
      <div className="my-4">
        {errors && (
          <div className="bg-red-300 border border-red-600 w-full px-2 text-sm py-1 rounded">
            {errors}
          </div>
        )}
        {firstWeatherResult && <WeatherDisplay data={firstWeatherResult} />}
      </div>
      <div className="flex flex-col my-8">
        <h2 className=" border-b border-gray-300 mb-2">Search history</h2>
        <WeatherSearchRecord
          data={weatherHistory ?? []}
          handleOnDelete={handleOnDelete}
          handleOnSearch={handleOnSearch}
        />
      </div>
    </div>
  );
};
