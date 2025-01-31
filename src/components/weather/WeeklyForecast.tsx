import { useEffect, useState } from "react";
import {
  Calendar,
  AlertCircle,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";
import { fetchWeeklyForecast } from "../../services/weatherService";
import { convertTemperature } from "../../utils/temperatureUtils";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/Skeleton";

interface WeeklyForecastProps {
  isDark: boolean;
  latitude: number;
  longitude: number;
  units: "celsius" | "fahrenheit";
  windSpeedUnit: string;
}

interface DailyForecast {
  dt: number;
  temp_max: number;
  temp_min: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  date: Date;
}

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

function WeeklyForecastSkeleton({ isDark }: { isDark: boolean }) {
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

      <div className="space-y-4">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${
              isDark ? "bg-[#3A3A3C]" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-28">
                <Skeleton className="h-5 w-20 mb-1" isDark={isDark} />
                <Skeleton className="h-4 w-16" isDark={isDark} />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" isDark={isDark} />
                <Skeleton className="h-4 w-24" isDark={isDark} />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-5 w-12 mb-1" isDark={isDark} />
              <Skeleton className="h-4 w-10" isDark={isDark} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeeklyForecast({
  isDark,
  latitude,
  longitude,
  units,
}: WeeklyForecastProps) {
  const { t, i18n } = useTranslation();
  const [forecasts, setForecasts] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadForecasts = async () => {
      if (!latitude || !longitude) return;

      try {
        setLoading(true);
        const data = await fetchWeeklyForecast(latitude, longitude);
        setForecasts(data as DailyForecast[]);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch weekly forecast:", err);
        setError("Failed to load weekly forecast");
      } finally {
        setLoading(false);
      }
    };

    loadForecasts();
  }, [latitude, longitude]);

  if (loading) {
    return <WeeklyForecastSkeleton isDark={isDark} />;
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
        isDark ? "bg-[#2C2C2E]" : "bg-white shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-semibold">{t("nextWeek")}</h3>
        <Calendar className="w-6 h-6 text-blue-500" />
      </div>

      <div className="space-y-4">
        {forecasts.map((forecast) => {
          const date = new Date(forecast.date);
          const isToday = date.toDateString() === new Date().toDateString();
          const dayName = isToday
            ? t("today")
            : date.toLocaleDateString(i18n.language, { weekday: "long" });

          return (
            <div
              key={forecast.dt}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                isDark
                  ? isToday
                    ? "bg-blue-500/20"
                    : "bg-[#3A3A3C] hover:bg-[#404042]"
                  : isToday
                  ? "bg-blue-50"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-28">
                  <div
                    className={`font-medium ${isToday ? "text-blue-500" : ""}`}
                  >
                    {dayName}
                  </div>
                  <div
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {date.toLocaleDateString(i18n.language, {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getWeatherIcon(forecast.weather.icon)}
                  <span className="capitalize text-sm">
                    {forecast.weather.description}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold">
                    {convertTemperature(Math.round(forecast.temp_max), units)}°
                  </div>
                  <div
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {convertTemperature(Math.round(forecast.temp_min), units)}°
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
