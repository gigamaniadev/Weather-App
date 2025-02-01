import { useEffect, useState } from "react";
import { AlertCircle, Activity } from "lucide-react";
import { fetchAirQuality } from "../../services/weatherService";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/Skeleton";

/**
 * Base props interface for the AirQuality component
 */
interface AirQualityProps {
  isDark: boolean;
  latitude: number;
  longitude: number;
}

/**
 * Interface defining the structure of air quality measurement data
 */
interface AirQualityData {
  aqi: number;
  co: number;
  no2: number;
  o3: number;
  pm2_5: number;
  pm10: number;
  so2: number;
}

/**
 * Helper function to get air quality information based on AQI value
 * @param aqi - Air Quality Index value
 * @param t - Translation function
 * @returns Object containing label, color and description for the AQI
 */
const getAQIInfo = (
  aqi: number,
  t: any
): { label: string; color: string; description: string } => {
  switch (aqi) {
    case 1:
      return {
        label: t("airQuality.good"),
        color: "text-green-500",
        description: t("airQuality.goodDesc"),
      };
    case 2:
      return {
        label: t("airQuality.fair"),
        color: "text-yellow-500",
        description: t("airQuality.fairDesc"),
      };
    case 3:
      return {
        label: t("airQuality.moderate"),
        color: "text-orange-500",
        description: t("airQuality.moderateDesc"),
      };
    case 4:
      return {
        label: t("airQuality.poor"),
        color: "text-red-500",
        description: t("airQuality.poorDesc"),
      };
    case 5:
      return {
        label: t("airQuality.veryPoor"),
        color: "text-purple-500",
        description: t("airQuality.veryPoorDesc"),
      };
    default:
      return {
        label: t("airQuality.unknown"),
        color: "text-gray-500",
        description: t("airQuality.unknownDesc"),
      };
  }
};

/**
 * Component to display individual pollutant measurements
 * @param props - Component properties including value, threshold and display options
 */
const PollutantCard = ({
  label,
  value,
  unit,
  isDark,
  threshold = 0,
  isHighBad = true,
}: {
  label: string;
  value: number;
  unit: string;
  isDark: boolean;
  threshold?: number;
  isHighBad?: boolean;
}) => {
  /**
   * Determines text color based on pollutant value and threshold
   */
  const getHealthStatus = (
    value: number,
    threshold: number,
    isHighBad: boolean
  ) => {
    if (threshold === 0) return "";
    const condition = isHighBad ? value > threshold : value < threshold;
    return condition ? "text-red-500" : "text-green-500";
  };

  return (
    <div
      className={`p-4 rounded-lg transition-colors ${
        isDark
          ? "bg-[#3A3A3C] hover:bg-[#404042]"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <div
        className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        {label}
      </div>
      <div
        className={`text-xl font-semibold ${getHealthStatus(
          value,
          threshold,
          isHighBad
        )}`}
      >
        {value.toFixed(1)}
        <span className="text-sm ml-1 font-normal text-gray-500">{unit}</span>
      </div>
    </div>
  );
};

/**
 * Loading skeleton component for AirQuality
 * @param props.isDark - Dark mode toggle
 */
function AirQualitySkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`lg:col-span-6 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#2C2C2E]" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-32" isDark={isDark} />
        <Skeleton className="h-6 w-6" isDark={isDark} />
      </div>

      <div className="mb-6">
        <Skeleton className="h-8 w-24 mb-2" isDark={isDark} />
        <Skeleton className="h-4 w-64" isDark={isDark} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDark ? "bg-[#3A3A3C]" : "bg-gray-50"
            }`}
          >
            <Skeleton className="h-4 w-16 mb-2" isDark={isDark} />
            <Skeleton className="h-6 w-20" isDark={isDark} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Main AirQuality component that displays current air quality data
 * Fetches and displays AQI and individual pollutant measurements
 * @param props - Component properties including location coordinates and display mode
 */
export function AirQuality({ isDark, latitude, longitude }: AirQualityProps) {
  const { t } = useTranslation();
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAirQuality = async () => {
      if (!latitude || !longitude) return;

      try {
        setLoading(true);
        const data = await fetchAirQuality(latitude, longitude);
        if (data.list && data.list[0]) {
          const current = data.list[0];
          setAirQuality({
            aqi: current.main.aqi,
            co: current.components.co,
            no2: current.components.no2,
            o3: current.components.o3,
            pm2_5: current.components.pm2_5,
            pm10: current.components.pm10,
            so2: current.components.so2,
          });
        }
      } catch (err) {
        setError("Failed to load air quality data");
      } finally {
        setLoading(false);
      }
    };

    loadAirQuality();

    // Poll every 30 minutes
    const interval = setInterval(loadAirQuality, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  if (loading) {
    return <AirQualitySkeleton isDark={isDark} />;
  }

  if (error) {
    return (
      <div className="lg:col-span-6 flex flex-col items-center justify-center h-48 text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (!airQuality) return null;

  const aqiInfo = getAQIInfo(airQuality.aqi, t);

  return (
    <div
      className={`lg:col-span-6 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#2C2C2E]" : "bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-semibold">
          {t("airQuality.title")}
        </h3>
        <Activity className="w-6 h-6 text-blue-500" />
      </div>

      <div className="mb-6">
        <div className={`text-3xl font-bold ${aqiInfo.color} mb-2`}>
          {aqiInfo.label}
        </div>
        <div
          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          {aqiInfo.description}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <PollutantCard
          label="PM2.5"
          value={airQuality.pm2_5}
          unit="µg/m³"
          isDark={isDark}
          threshold={10}
        />
        <PollutantCard
          label="PM10"
          value={airQuality.pm10}
          unit="µg/m³"
          isDark={isDark}
          threshold={20}
        />
        <PollutantCard
          label="O₃"
          value={airQuality.o3}
          unit="µg/m³"
          isDark={isDark}
          threshold={100}
        />
        <PollutantCard
          label="NO₂"
          value={airQuality.no2}
          unit="µg/m³"
          isDark={isDark}
          threshold={40}
        />
        <PollutantCard
          label="SO₂"
          value={airQuality.so2}
          unit="µg/m³"
          isDark={isDark}
          threshold={20}
        />
        <PollutantCard
          label="CO"
          value={airQuality.co}
          unit="µg/m³"
          isDark={isDark}
          threshold={4000}
        />
      </div>
    </div>
  );
}
