import { Button, Spinner } from "@/components/common";
import { FormEvent, useState } from "react";
import { useWeather } from "./loader/weather";
import { GetWeatherRequestBody } from "@/pages/api/getWeather";
import { WeatherDisplay } from "./components/WeatherDisplay";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { WeatherData, parseWeatherData } from "./utils/parseWeatherData";
import { WeatherSearchRecord } from "./components/WeatherSearchRecord";
import { FancySearch } from "./components/FancySearch";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const HomePage = () => {
  const [data, setData] = useState<WeatherData>();
  const [showSearch, setShowSearch] = useState(false);
  const { getWeather, isLoading, errors } = useWeather();
  const { value: weatherHistory, setValue: setWeatherHistory } =
    useLocalStorage<WeatherData[]>("weather-history");

  const handleGetWeather = async (input: GetWeatherRequestBody) => {
    const weatherData = await getWeather(input);
    if (weatherData?.data) {
      const parsedWeatherData = parseWeatherData(weatherData.data);
      setData(parsedWeatherData);
      setWeatherHistory((curr) => [parsedWeatherData, ...(curr ?? [])]);
    }
  };

  const handleOnSearch = (record: WeatherData) => {
    const { lat, lon } = record;
    setShowSearch(false);
    handleGetWeather({ city: "", country: "", lat, lon });
  };

  const handleOnDelete = (id: string) => {
    setWeatherHistory((curr) => curr?.filter((i) => i.id !== id));
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSearch(false);
    const data = new FormData(e.currentTarget);
    const formData = Object.fromEntries(
      data.entries()
    ) as unknown as GetWeatherRequestBody;
    handleGetWeather(formData);
  };

  const handleOnSearchMenuClick = () => {
    setShowSearch((curr) => !curr);
  };

  const handleHideSearchMenu = () => {
    setShowSearch(false);
  };

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="text-lg font-medium py-8 flex w-full justify-between max-w-3xl text-black">
        React Weather
        <Button variant="secondary" onClick={handleOnSearchMenuClick}>
          <MagnifyingGlassIcon className="w-6 h-6 text-[#6E6E73]" />
        </Button>
      </div>

      <div className="flex flex-col items-center w-full">
        <FancySearch
          show={showSearch}
          onSubmit={handleOnSubmit}
          onClose={handleHideSearchMenu}
          history={weatherHistory ?? []}
          onHistoryClick={handleOnSearch}
        />
        <div className="my-4 w-full max-w-3xl">
          {errors && (
            <div className="bg-red-200 border border-red-600 text-red-800 w-full px-2 text-sm py-1 rounded">
              {errors}
            </div>
          )}
          {data && <WeatherDisplay data={data} className="w-full" />}
        </div>
        <div className="flex flex-col my-8 max-w-3xl w-full">
          <div className="mb-4 border-b border-gray-300 pb-1 font-medium text-black">
            Search history
          </div>
          {isLoading ? (
            <div className="flex justify-center my-4">
              <Spinner />
            </div>
          ) : (
            <WeatherSearchRecord
              data={weatherHistory ?? []}
              handleOnDelete={handleOnDelete}
              handleOnSearch={handleOnSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
};
