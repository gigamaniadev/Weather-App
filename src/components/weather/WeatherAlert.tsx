import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { fetchWeatherAlerts } from "../../services/weatherService";
import { Skeleton } from "../ui/Skeleton";

interface WeatherAlertProps {
  isDark: boolean;
  latitude: number;
  longitude: number;
}

interface Alert {
  event: string;
  description: string;
  start: number;
  end: number;
  severity?: string;
}

function WeatherAlertSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`lg:col-span-4 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#2C2C2E]" : "bg-white shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-48" isDark={isDark} />
        <Skeleton className="h-6 w-6" isDark={isDark} />
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDark ? "bg-[#3A3A3C]" : "bg-gray-50"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" isDark={isDark} />
                <Skeleton className="h-5 w-32" isDark={isDark} />
              </div>
              <Skeleton className="h-4 w-16" isDark={isDark} />
            </div>
            <Skeleton className="h-4 w-full mb-2" isDark={isDark} />
            <Skeleton className="h-4 w-3/4" isDark={isDark} />
            <Skeleton className="h-3 w-48 mt-2" isDark={isDark} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherAlert({
  isDark,
  latitude,
  longitude,
}: WeatherAlertProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAlerts = async () => {
      if (!latitude || !longitude) return;

      try {
        setLoading(true);
        const data = await fetchWeatherAlerts(latitude, longitude);
        setAlerts(data);
        setError(null);
      } catch (err) {
        setError("Failed to load weather alerts");
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();

    // Set up polling every 5 minutes
    const interval = setInterval(loadAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp * 1000;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const getSeverityColor = (severity: string = "moderate") => {
    switch (severity.toLowerCase()) {
      case "extreme":
        return "bg-red-500";
      case "severe":
        return "bg-orange-500";
      case "moderate":
        return "bg-yellow-500";
      case "minor":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return <WeatherAlertSkeleton isDark={isDark} />;
  }

  if (error) {
    return (
      <div
        className={`lg:col-span-4 rounded-xl md:rounded-2xl p-4 md:p-6 ${
          isDark ? "bg-[#2C2C2E]" : "bg-white shadow-md"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-48 text-red-500">
          <AlertTriangle className="w-8 h-8 mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`lg:col-span-4 rounded-xl md:rounded-2xl p-4 md:p-6 ${
        isDark ? "bg-[#2C2C2E]" : "bg-white shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-semibold">Weather Alerts</h3>
        <AlertTriangle
          className={`w-6 h-6 ${
            alerts.length > 0 ? "text-red-500" : "text-blue-500"
          }`}
        />
      </div>

      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        {alerts.length === 0 ? (
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-[#3A3A3C]" : "bg-gray-50"
            }`}
          >
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No active weather alerts for your area
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={`${alert.event}-${index}`}
                className={`p-4 rounded-lg transition-colors ${
                  isDark
                    ? "bg-[#3A3A3C] hover:bg-[#404042]"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getSeverityColor(
                        alert.severity
                      )}`}
                    />
                    <h4 className="font-medium line-clamp-1">{alert.event}</h4>
                  </div>
                  <span
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    } whitespace-nowrap ml-2`}
                  >
                    {formatTimeAgo(alert.start)}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } line-clamp-3`}
                >
                  {alert.description}
                </p>
                <div
                  className={`mt-2 text-xs ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Valid until {new Date(alert.end * 1000).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
