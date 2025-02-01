// Import necessary dependencies
import { useEffect, useState } from "react";
import { Globe2, AlertCircle } from "lucide-react";
import { fetchMajorCitiesWeather } from "../../services/weatherService";
import { convertTemperature } from "../../utils/temperatureUtils";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/Skeleton";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
} from "lucide-react";

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

// Interface definitions for component props and data structures
interface MajorCitiesProps {
  isDark: boolean; // Controls dark/light theme
  units: "celsius" | "fahrenheit"; // Temperature unit selection
  latitude?: number; // Optional user location latitude
  longitude?: number; // Optional user location longitude
}

// Interface for weather data of each city
interface CityWeather {
  city: string; // City name
  country: string; // Country name
  temp: number; // Temperature value
  weather: string; // Main weather condition
  description: string; // Detailed weather description
  icon: string; // Weather icon code
}

/**
 * Skeleton loading component for OtherCities
 * Displays placeholder content while data is being fetched
 */
function MajorCitiesSkeleton({ isDark }: { isDark: boolean }) {
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

/**
 * OtherCities Component
 * Displays weather information for major cities around the world
 * Features:
 * - Responsive grid layout
 * - Loading skeleton state
 * - Error handling
 * - Theme support (dark/light)
 * - Temperature unit conversion
 */
export function MajorCities({
  isDark,
  units,
  latitude,
  longitude,
}: MajorCitiesProps) {
  const { t } = useTranslation();
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data for major cities when component mounts or location changes
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

  // Show loading skeleton while fetching data
  if (loading) {
    return <MajorCitiesSkeleton isDark={isDark} />;
  }

  // Display error message if data fetch fails
  if (error) {
    return (
      <div className="lg:col-span-8 flex flex-col items-center justify-center h-48 text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  // Render main component with weather data
  return (
    <div
      className={`lg:col-span-8 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#2C2C2E]" : "bg-white shadow-sm"
      }`}
    >
      {/* Header section with title and globe icon */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-semibold">{t("majorCities")}</h3>
        <Globe2 className="w-6 h-6 text-blue-500" />
      </div>

      {/* Grid of city weather cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {cities.map((city) => (
          // Individual city weather card
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
              {getWeatherIcon(city.icon)}
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
