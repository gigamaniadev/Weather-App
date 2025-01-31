import {
  Wind,
  Droplets,
  Globe2,
  CloudRain,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { TomorrowWeatherData } from "../../types";
import { convertWindSpeed } from "../../utils/windSpeedUtils";

interface TomorrowWeatherProps {
  isDark: boolean;
  weatherLoading: boolean;
  weatherError: string | null;
  weather: TomorrowWeatherData | null;
  units: "celsius" | "fahrenheit";
  windSpeedUnit: string;
}

export function TomorrowWeather({
  weatherLoading,
  weatherError,
  weather,
  windSpeedUnit,
}: TomorrowWeatherProps) {
  if (weatherLoading) {
    return (
      <div className="sm:col-span-1 lg:col-span-3 flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (weatherError) {
    return (
      <div className="sm:col-span-1 lg:col-span-3 flex flex-col items-center justify-center h-full text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{weatherError}</p>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const windSpeed = convertWindSpeed(weather.wind_speed, windSpeedUnit);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="sm:col-span-1 lg:col-span-3 bg-[#FDF4FF] text-black rounded-xl md:rounded-2xl p-4 md:p-6">
      <div className="mb-4">
        <div className="text-sm">Tomorrow</div>
        <div className="text-2xl font-bold">
          {tomorrow.toLocaleDateString("en-US", { weekday: "long" })}
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-4xl sm:text-5xl font-bold">
            {Math.round(weather.temp_max)}°
          </span>
          <span className="text-xl text-gray-600 ml-2">
            {Math.round(weather.temp_min)}°
          </span>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="w-16 h-16"
        />
      </div>
      <div className="space-y-2 text-sm">
        <div className="capitalize">{weather.description}</div>
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4" />
          Precipitation: {Math.round(weather.precipitation * 100)}%
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          Wind: {weather.wind_direction} {windSpeed.value} {windSpeed.unit}
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4" />
          Humidity: {weather.humidity}%
        </div>
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4" />
          Pressure: {weather.pressure}hPa
        </div>
      </div>
    </div>
  );
}
