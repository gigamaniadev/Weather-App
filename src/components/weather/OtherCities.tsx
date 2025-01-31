import { useEffect, useState } from "react";
import { Globe2, AlertCircle } from "lucide-react";
import { fetchMajorCitiesWeather } from "../../services/weatherService";
import { convertTemperature } from "../../utils/temperatureUtils";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/Skeleton";

interface OtherCitiesProps {
  isDark: boolean;
  units: "celsius" | "fahrenheit";
  latitude?: number;
  longitude?: number;
}

interface CityWeather {
  city: string;
  country: string;
  temp: number;
  weather: string;
  description: string;
  icon: string;
}

function OtherCitiesSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`lg:col-span-8 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#2C2C2E]" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-48" isDark={isDark} />
        <Skeleton className="h-6 w-6" isDark={isDark} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`rounded-lg md:rounded-xl p-4 ${
              isDark ? "bg-[#3A3A3C]" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-32 mb-1" isDark={isDark} />
                <Skeleton className="h-4 w-24" isDark={isDark} />
              </div>
              <Skeleton className="h-12 w-12 rounded-full" isDark={isDark} />
            </div>
            <div className="mt-2">
              <Skeleton className="h-8 w-16 mb-1" isDark={isDark} />
              <Skeleton className="h-4 w-24" isDark={isDark} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OtherCities({
  isDark,
  units,
  latitude,
  longitude,
}: OtherCitiesProps) {
  const { t } = useTranslation();
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCitiesWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchMajorCitiesWeather(latitude, longitude);
        setCities(data);
        setError(null);
      } catch (err) {
        setError("Failed to load cities weather");
      } finally {
        setLoading(false);
      }
    };

    loadCitiesWeather();
  }, [latitude, longitude]);

  if (loading) {
    return <OtherCitiesSkeleton isDark={isDark} />;
  }

  if (error) {
    return (
      <div className="lg:col-span-8 flex flex-col items-center justify-center h-48 text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`lg:col-span-8 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#2C2C2E]" : "bg-white shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-semibold">{t("majorCities")}</h3>
        <Globe2 className="w-6 h-6 text-blue-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {cities.map((city) => (
          <div
            key={city.city}
            className={`rounded-lg md:rounded-xl p-4 transition-colors ${
              isDark
                ? "bg-[#3A3A3C] hover:bg-[#404042]"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg truncate">
                  {city.city}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } truncate`}
                >
                  {city.country}
                </div>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${city.icon}.png`}
                alt={city.description}
                className="w-12 h-12"
              />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {convertTemperature(city.temp, units)}°
              </div>
              <div
                className={`text-sm capitalize ${
                  isDark ? "text-gray-400" : "text-gray-500"
                } truncate`}
              >
                {city.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
