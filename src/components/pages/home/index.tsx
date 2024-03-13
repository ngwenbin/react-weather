import { Button, Input } from "@/components/common";
import { FormEvent } from "react";
import { useWeather } from "./loader/weather";
import { GetWeatherRequestBody } from "@/pages/api/getWeather";
import { WeatherDisplay } from "./components/WeatherDisplay";

export const HomePage = () => {
  const { getWeather, isLoading, errors, data } = useWeather();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let formData = Object.fromEntries(data.entries()) as GetWeatherRequestBody;
    getWeather(formData);
  };

  return (
    <div>
      <h1 className="text-2xl p-4">Weather App</h1>
      <form className="flex" onSubmit={handleOnSubmit}>
        <Input
          id="city"
          name="city"
          label="City:"
          labelClassName="mr-2"
          containerClassName="mr-4"
        />
        <Input
          id="country"
          name="country"
          label="Country:"
          labelClassName="mr-2"
          containerClassName="mr-4"
        />
        <Button id="search" type="submit" disabled={isLoading}>
          Search
        </Button>
        <Button id="clear" disabled={isLoading}>
          Clear
        </Button>
      </form>
      <div className="mt-4">
        {errors && (
          <div className="bg-red-300 border border-red-600 w-full px-2 text-sm py-1 rounded">
            {errors}
          </div>
        )}
        {data && (
          <WeatherDisplay
            city={data.name}
            time={data.dt}
            temperatuerMin={data.main.temp_min}
            temperatureMax={data.main.temp_max}
            weatherMain={data.weather[0].main}
            weatherDescription={data.weather[0].description}
            countryCode={data.sys.country}
            humidity={data.main.humidity}
          />
        )}
      </div>
    </div>
  );
};
