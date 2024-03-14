import { WeatherData } from "../utils/parseWeatherData";

export interface WeatherDisplayProps {
  data: WeatherData;
}

export const WeatherDisplay = ({ data }: WeatherDisplayProps) => {
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
    <div className="flex flex-col">
      <div className="text-gray-500 text-sm">
        {city},&nbsp;{countryCode}
      </div>
      <div className="text-3xl font-bold p-2">{weatherMain}</div>
      <table className="text-left text-sm">
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
