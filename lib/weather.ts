const GEOCODING_API =
  "https://geocoding-api.open-meteo.com/v1/search";

const FORECAST_API =
  "https://api.open-meteo.com/v1/forecast";

// Types
export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone: string;
}

export interface GeocodingResponse {
  results?: City[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;

  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };

hourly: {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  is_day: number[];
};

  hourly_units: {
    temperature_2m: string;
    wind_speed_10m: string;
  };
}

// Search cities
export async function searchCities(
  query: string,
): Promise<City[]> {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: trimmedQuery,
    count: "5",
    language: "en",
    format: "json",
  });

  const response = await fetch(
    `${GEOCODING_API}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Unable to search for cities.");
  }

  const data: GeocodingResponse = await response.json();

  return data.results ?? [];
}

// Fetch weather
export async function getWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
    ].join(","),

hourly: [
  "temperature_2m",
  "relative_humidity_2m",
  "precipitation_probability",
  "weather_code",
  "wind_speed_10m",
  "is_day",
].join(","),

    timezone: "auto",
    forecast_days: "2",
    wind_speed_unit: "kmh",
  });

  const response = await fetch(
    `${FORECAST_API}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather data.");
  }

  return (await response.json()) as WeatherData;
}

export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",

    45: "Fog",
    48: "Depositing rime fog",

    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",

    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",

    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",

    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",

    85: "Slight snow showers",
    86: "Heavy snow showers",

    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    97: "Heavy thunderstorm",
    99: "Thunderstorm with heavy hail",
  };

  return descriptions[code] ?? "Unknown conditions";
}
