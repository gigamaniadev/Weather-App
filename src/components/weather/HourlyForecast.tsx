import { useEffect, useState } from "react";
import {
  Clock,
  AlertCircle,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";
import { fetchHourlyForecast } from "../../services/weatherService";
import { convertTemperature } from "../../utils/temperatureUtils";
import { convertWindSpeed } from "../../utils/windSpeedUtils";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/Skeleton";

/**
 * Props interface for the HourlyForecast component
 */
interface HourlyForecastProps {
  isDark: boolean;
  latitude: number;
  longitude: number;
  units: "celsius" | "fahrenheit";
  windSpeedUnit: string;
}

/**
 * Interface defining the structure of hourly weather data
 */
interface HourlyData {
  time: string;
  temp: number;
  icon: string;
  description: string;
  feelsLike: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

/**
 * Maps weather icon codes to corresponding Lucide icons
 * @param iconCode - OpenWeatherMap icon code
 * @returns JSX Element of the corresponding weather icon
 */
const getWeatherIcon = (iconCode: string) => {
  const size = "w-6 h-6";
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
 * Loading skeleton component for HourlyForecast
 * @param props.isDark - Dark mode toggle
 */
function HourlyForecastSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`lg:col-span-6 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#2C2C2E]" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-48" isDark={isDark} />
        <Skeleton className="h-6 w-6" isDark={isDark} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDark ? "bg-[#3A3A3C]" : "bg-gray-50"
            }`}
          >
            <Skeleton className="h-4 w-16 mb-2" isDark={isDark} />
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-6 w-6 rounded-full" isDark={isDark} />
              <Skeleton className="h-6 w-16" isDark={isDark} />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-24" isDark={isDark} />
              <Skeleton className="h-3 w-20" isDark={isDark} />
              <Skeleton className="h-3 w-24" isDark={isDark} />
              <Skeleton className="h-3 w-20" isDark={isDark} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Component to display weather data for a specific hour
 * @param props - Component properties including weather data and display preferences
 * @param props.data - Weather data for the specific hour
 * @param props.isDark - Dark mode toggle
 * @param props.isNow - Indicates if this is the current hour
 * @param props.units - Temperature unit (celsius/fahrenheit)
 * @param props.windSpeedUnit - Wind speed measurement unit
 */
const HourCard = ({
  data,
  isDark,
  isNow,
  units,
  windSpeedUnit,
}: {
  data: HourlyData;
  isDark: boolean;
  isNow: boolean;
  units: "celsius" | "fahrenheit";
  windSpeedUnit: string;
}) => {
  const { t } = useTranslation();
  const windSpeed = convertWindSpeed(data.windSpeed, windSpeedUnit);

  return (
    <div
      className={`p-4 rounded-lg transition-colors ${
        isDark
          ? isNow
            ? "bg-blue-500/20"
            : "bg-[#3A3A3C] hover:bg-[#404042]"
          : isNow
          ? "bg-blue-50"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <div
        className={`text-sm mb-2 font-medium ${isNow ? "text-blue-500" : ""}`}
      >
        {isNow ? t("today") : data.time}
      </div>

      <div className="flex items-center gap-2 mb-3">
        {getWeatherIcon(data.icon)}
        <span className="text-xl font-semibold">
          {convertTemperature(data.temp, units)}°
        </span>
      </div>

      <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <div className="mb-1">
          {t("weather.feelsLike")}: {convertTemperature(data.feelsLike, units)}°
        </div>
        <div className="mb-1">
          {t("weather.rain")}: {Math.round(data.precipitation * 100)}%
        </div>
        <div className="mb-1">
          {t("weather.wind")}: {windSpeed.value} {windSpeed.unit}
        </div>
        <div>
          {t("weather.humidity")}: {data.humidity}%
        </div>
      </div>
    </div>
  );
};

/**
 * Main HourlyForecast component that displays weather forecast for next few hours
 * Fetches and displays hourly weather data including temperature, precipitation, wind, and humidity
 * @param props - Component properties including location coordinates and display preferences
 */
export function HourlyForecast({
  isDark,
  latitude,
  longitude,
  units,
  windSpeedUnit,
}: HourlyForecastProps) {
  const { t } = useTranslation();
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches and formats hourly forecast data
   * Updates component state with the formatted data or error message
   */
  useEffect(() => {
    const loadHourlyForecast = async () => {
      if (!latitude || !longitude) return;

      try {
        setLoading(true);
        const data = await fetchHourlyForecast(latitude, longitude);

        const formattedData = data.map((item: any) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "numeric",
            hour12: true,
          }),
          temp: Math.round(item.main.temp),
          feelsLike: Math.round(item.main.feels_like),
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          precipitation: item.pop || 0,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        }));

        setHourlyData(formattedData);
        setError(null);
      } catch (err) {
        setError("Failed to load hourly forecast");
      } finally {
        setLoading(false);
      }
    };

    loadHourlyForecast();
  }, [latitude, longitude]);

  if (loading) {
    return <HourlyForecastSkeleton isDark={isDark} />;
  }

  if (error) {
    return (
      <div className="lg:col-span-6 flex flex-col items-center justify-center h-48 text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`lg:col-span-6 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#2C2C2E]" : "bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-semibold">{t("nextHours")}</h3>
        <Clock className="w-6 h-6 text-blue-500" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {hourlyData.map((hour, index) => (
          <HourCard
            key={index}
            data={hour}
            isDark={isDark}
            isNow={index === 0}
            units={units}
            windSpeedUnit={windSpeedUnit}
          />
        ))}
      </div>
    </div>
  );
}
