import {
  Thermometer,
  Wind,
  Droplets,
  Globe2,
  Sunrise,
  Sunset,
  AlertCircle,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
} from "lucide-react";
import { WeatherData } from "../../types";
import { formatTime } from "../../utils/dateUtils";
import { convertWindSpeed } from "../../utils/windSpeedUtils";
import { convertTemperature } from "../../utils/temperatureUtils";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/Skeleton";

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
 * Props interface for the CurrentWeather component
 */
interface CurrentWeatherProps {
  weatherLoading: boolean;
  weatherError: string | null;
  weather: WeatherData | null;
  units: "celsius" | "fahrenheit";
  windSpeedUnit: string;
  isDark: boolean;
}

/**
 * Loading skeleton component for CurrentWeather
 * @param props.isDark - Dark mode toggle
 */
function CurrentWeatherSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`sm:col-span-1 lg:col-span-3 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#E3F2FD]" : "bg-[#E3F2FD]"
      }`}
    >
      <div className="mb-4">
        <Skeleton className="h-4 w-24 mb-1" isDark={isDark} />
        <Skeleton className="h-6 w-32" isDark={isDark} />
      </div>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-16 w-32" isDark={isDark} />
        <Skeleton className="h-16 w-16 rounded-full" isDark={isDark} />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" isDark={isDark} />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" isDark={isDark} />
          <Skeleton className="h-4 w-48" isDark={isDark} />
          <Skeleton className="h-4 w-48" isDark={isDark} />
          <Skeleton className="h-4 w-48" isDark={isDark} />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" isDark={isDark} />
            <Skeleton className="h-4 w-24" isDark={isDark} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Component that displays current weather conditions
 * Shows temperature, weather description, and various meteorological measurements
 * @param props - Component properties including weather data and display preferences
 */
export function CurrentWeather({
  weatherLoading,
  weatherError,
  weather,
  units,
  windSpeedUnit,
  isDark,
}: CurrentWeatherProps) {
  const { t } = useTranslation();

  if (weatherLoading) {
    return <CurrentWeatherSkeleton isDark={isDark} />;
  }

  if (weatherError) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{weatherError}</p>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const windSpeed = convertWindSpeed(weather.wind_speed, windSpeedUnit);

  return (
    <div
      className={`sm:col-span-1 lg:col-span-3 rounded-xl md:rounded-2xl p-4 md:p-6 bg-[#E3F2FD] text-gray-900`}
    >
      <div className="mb-4">
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </div>
        <div className="text-2xl font-bold">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-5xl sm:text-6xl font-bold">
          {convertTemperature(weather.temp, units)}°
        </span>
        {getWeatherIcon(weather.icon)}
      </div>
      <div className="space-y-2 text-sm">
        <div className="capitalize">{weather.description}</div>
        <div className="flex items-center gap-2 text-gray-600">
          <Thermometer className="w-4 h-4" />
          {t("weather.feelsLike")}{" "}
          {convertTemperature(weather.feels_like, units)}°
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Wind className="w-4 h-4" />
          {t("weather.wind")}: {weather.wind_direction} {windSpeed.value}{" "}
          {windSpeed.unit}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Droplets className="w-4 h-4" />
          {t("weather.humidity")}: {weather.humidity}%
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Globe2 className="w-4 h-4" />
          {t("weather.pressure")}: {weather.pressure}hPa
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex items-center gap-1">
            <Sunrise className="w-4 h-4" />
            {formatTime(weather.sunrise)}
          </div>
          <div className="flex items-center gap-1">
            <Sunset className="w-4 h-4" />
            {formatTime(weather.sunset)}
          </div>
        </div>
      </div>
    </div>
  );
}
