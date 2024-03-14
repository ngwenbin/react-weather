// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type GetWeatherResponse = {
  error?: string;
  data?: WeatherResponse;
};

export type GetWeatherRequestBody = {
  city: string;
  country: string;
  lat?: number;
  lon?: number;
};

const isValidBody = <T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[]
): body is T => Object.keys(body).every((key) => fields.includes(key));

type GeoCodeResponse = Array<{
  name: string;
  lat: number;
  lon: number;
  state: string;
  country: string;
}>;

export type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: string;
    main: string;
    description: string;
    icon: string;
  }[];
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  sys: { country: string };
  id: number;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetWeatherResponse>
) {
  try {
    const body = JSON.parse(req?.body);
    const isValidRequestBody = isValidBody<GetWeatherRequestBody>(body, [
      "city",
      "country",
      "lat",
      "lon",
    ]);
    if (!isValidRequestBody) throw Error("Invalid paramters");
    const { city, country, lat: initialLat, lon: initialLon } = body;
    const openWeatherAccessKey = process.env.OPEN_WEATHER ?? "";
    let lat = initialLat;
    let lon = initialLon;

    // Skip lat lon api call if provided.
    if (!lat && !lon) {
      const geoEncodeEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city},$${country}&limit=1&appid=${openWeatherAccessKey}`;
      const geoCodeResponse = await fetch(geoEncodeEndpoint);
      const geoCodeData = (await geoCodeResponse.json()) as GeoCodeResponse;

      if (geoCodeData.length === 0) {
        throw Error("No such city / country");
      }
      const { lat: geoCodeDataLat, lon: geoCodeDataLon } = geoCodeData[0];
      lat = geoCodeDataLat;
      lon = geoCodeDataLon;
    }
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAccessKey}`;
    const weatherResponse = await fetch(weatherEndpoint);
    const weatherData = (await weatherResponse.json()) as WeatherResponse;

    res.status(200).json({ data: weatherData });
  } catch (err) {
    const error = err as Error;
    return res.status(400).json({ error: error.message });
  }
}
