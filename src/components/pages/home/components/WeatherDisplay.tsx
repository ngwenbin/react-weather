import clsx from "clsx";
import { WeatherData } from "../utils/parseWeatherData";

export interface WeatherDisplayProps {
  data: WeatherData;
  className?: string;
}

export const WeatherDisplay = ({ data, className }: WeatherDisplayProps) => {
  const {
    weatherMain,
    weatherDescription,
    city,
    countryCode,
    temperatuerMin,
    temperatureMax,
    humidity,
    time,
  } = data;
  const date = new Date(time);
  return (
    <div className={clsx(className, "flex flex-col")}>
      <div className="text-[#6E6E73] text-sm pb-2">
        {city},&nbsp;{countryCode}
      </div>
      <div className="text-4xl font-semibold pb-6">{weatherMain}</div>
      <table className="text-left text-sm max-w-sm">
        <tr>
          <th>Description: </th>
          <td>{weatherDescription}</td>
        </tr>
        <tr>
          <th>Temperature: </th>
          <td>
            {temperatuerMin}&#8457; to {temperatureMax}&#8457;
          </td>
        </tr>
        <tr>
          <th>Humidity: </th>
          <td>{humidity}%</td>
        </tr>
        <tr>
          <th>Time: </th>
          <td>{date.toLocaleString()}</td>
        </tr>
      </table>
    </div>
  );
};
