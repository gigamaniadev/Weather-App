export interface LocationData {
  city: string;
  country: string;
  error: string | null;
  loading: boolean;
  lat: number;
  lon: number;
}

export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_direction: string;
  pressure: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
}

export interface TomorrowWeatherData {
  temp_max: number;
  temp_min: number;
  humidity: number;
  wind_speed: number;
  wind_direction: string;
  pressure: number;
  description: string;
  icon: string;
  precipitation: number;
  date: number;
}