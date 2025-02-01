// Import UI icons and utility functions
import {
  Wind,
  Droplets,
  Globe2,
  AlertCircle,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Loader2,
} from "lucide-react";
import { TomorrowWeatherData } from "../../types";
import { convertWindSpeed } from "../../utils/windSpeedUtils";

/**
 * Maps weather icon codes to corresponding Lucide icons
 * @param iconCode - OpenWeatherMap icon code
 * @returns JSX Element of the corresponding weather icon
 */
const getWeatherIcon = (iconCode: string) => {
  const size = "w-16 h-16";
  switch (iconCode.slice(0, 2)) {
    case "01":
      return <Sun className={`${size} text-yellow-500`} />;
    case "02":
    case "03":
    case "04":
      return <Cloud className={`${size} text-gray-500`} />;
    case "09":
    case "10":
      return <CloudRain className={`${size} text-blue-500`} />;
    case "11":
      return <CloudLightning className={`${size} text-yellow-600`} />;
    case "13":
      return <CloudSnow className={`${size} text-blue-300`} />;
    default:
      return <CloudDrizzle className={`${size} text-blue-400`} />;
  }
};

/**
 * Interface for TomorrowWeather component props
 * Defines required properties for rendering weather forecast
 */
interface TomorrowWeatherProps {
  isDark: boolean; // Theme toggle
  weatherLoading: boolean; // Loading state indicator
  weatherError: string | null; // Error message if fetch fails
  weather: TomorrowWeatherData | null; // Weather forecast data
  units: "celsius" | "fahrenheit"; // Temperature unit
  windSpeedUnit: string; // Wind speed measurement unit
}

/**
 * TomorrowWeather Component
 * Displays detailed weather forecast for tomorrow
 * Including temperature, precipitation, wind, humidity, and pressure
 */
export function TomorrowWeather({
  weatherLoading,
  weatherError,
  weather,
  windSpeedUnit,
}: TomorrowWeatherProps) {
  // Loading state handler
  if (weatherLoading) {
    return (
      <div className="sm:col-span-1 lg:col-span-3 flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Error state handler
  if (weatherError) {
    return (
      <div className="sm:col-span-1 lg:col-span-3 flex flex-col items-center justify-center h-full text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{weatherError}</p>
      </div>
    );
  }

  // Null check for weather data
  if (!weather) {
    return null;
  }

  // Process weather data for display
  const windSpeed = convertWindSpeed(weather.wind_speed, windSpeedUnit);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="sm:col-span-1 lg:col-span-3 bg-[#FDF4FF] text-black rounded-xl md:rounded-2xl p-4 md:p-6">
      {/* Date display section */}
      <div className="mb-4">
        <div className="text-sm">Tomorrow</div>
        <div className="text-2xl font-bold">
          {tomorrow.toLocaleDateString("en-US", { weekday: "long" })}
        </div>
      </div>

      {/* Temperature and weather icon section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-4xl sm:text-5xl font-bold">
            {Math.round(weather.temp_max)}°
          </span>
          <span className="text-xl text-gray-600 ml-2">
            {Math.round(weather.temp_min)}°
          </span>
        </div>
        {getWeatherIcon(weather.icon)}
      </div>

      {/* Weather details section */}
      <div className="space-y-2 text-sm">
        {/* Weather description */}
        <div className="capitalize">{weather.description}</div>

        {/* Precipitation information */}
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4" />
          Precipitation: {Math.round(weather.precipitation * 100)}%
        </div>

        {/* Wind information */}
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          Wind: {weather.wind_direction} {windSpeed.value} {windSpeed.unit}
        </div>

        {/* Humidity information */}
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4" />
          Humidity: {weather.humidity}%
        </div>

        {/* Pressure information */}
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4" />
          Pressure: {weather.pressure}hPa
        </div>
      </div>
    </div>
  );
}
