// Import necessary hooks and components
import { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Define props interface for the Settings Modal
interface SettingsModalProps {
  isDark: boolean; // Current theme state
  showSettings: boolean; // Modal visibility state
  toggleSettings: () => void; // Function to toggle modal
  units: "celsius" | "fahrenheit"; // Temperature unit preference
  setUnits: (units: "celsius" | "fahrenheit") => void;
  windSpeed: string; // Wind speed unit preference
  setWindSpeed: (speed: string) => void;
  language: string; // Language preference
  setLanguage: (lang: string) => void;
}

export function SettingsModal({
  isDark,
  showSettings,
  toggleSettings,
  units,
  setUnits,
  windSpeed,
  setWindSpeed,
  language,
  setLanguage,
}: SettingsModalProps) {
  const { t, i18n } = useTranslation();

  // Handlers for settings changes with localStorage persistence
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang); // Persist language
  };

  const handleUnitsChange = (newUnits: "celsius" | "fahrenheit") => {
    setUnits(newUnits);
    localStorage.setItem("units", newUnits); // Persist units
  };

  const handleWindSpeedChange = (newSpeed: string) => {
    setWindSpeed(newSpeed);
    localStorage.setItem("windSpeed", newSpeed); // Persist wind speed
  };

  // Initialize settings from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage); // Apply saved language
    }

    const savedUnits = localStorage.getItem("units");
    if (savedUnits && savedUnits !== units) {
      setUnits(savedUnits as "celsius" | "fahrenheit");
    }

    const savedWindSpeed = localStorage.getItem("windSpeed");
    if (savedWindSpeed && savedWindSpeed !== windSpeed) {
      setWindSpeed(savedWindSpeed);
    }
  }, [i18n, language, setLanguage, units, setUnits, windSpeed, setWindSpeed]);

  // Early return if modal is not visible
  if (!showSettings) return null;

  // Utility function for button styling
  const getButtonClasses = (selected: boolean) => {
    return selected
      ? "bg-blue-500 text-white"
      : isDark
      ? "bg-[#3A3A3C] hover:bg-[#404042]"
      : "bg-gray-100 hover:bg-gray-200";
  };

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {/* Modal container */}
      <div
        className={`relative w-full max-w-md rounded-2xl p-6 ${
          isDark ? "bg-[#2C2C2E]" : "bg-white"
        }`}
      >
        {/* Close button */}
        <button
          onClick={toggleSettings}
          className={`absolute right-4 top-4 p-2 rounded-lg transition-colors ${
            isDark ? "hover:bg-[#3A3A3C]" : "hover:bg-gray-100"
          }`}
          aria-label={t("settings.close")}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal title */}
        <h2 className="text-xl font-semibold mb-6">{t("settings.title")}</h2>

        {/* Settings sections container */}
        <div className="space-y-6">
          {/* Temperature units section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("settings.units.title")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleUnitsChange("celsius")}
                className={`p-3 rounded-lg text-center transition-colors ${getButtonClasses(
                  units === "celsius"
                )}`}
              >
                {t("settings.units.celsius")}
              </button>
              <button
                onClick={() => handleUnitsChange("fahrenheit")}
                className={`p-3 rounded-lg text-center transition-colors ${getButtonClasses(
                  units === "fahrenheit"
                )}`}
              >
                {t("settings.units.fahrenheit")}
              </button>
            </div>
          </div>

          {/* Wind speed units section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("settings.windSpeed.title")}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleWindSpeedChange("kmh")}
                className={`p-3 rounded-lg text-center transition-colors ${getButtonClasses(
                  windSpeed === "kmh"
                )}`}
              >
                {t("settings.windSpeed.kmh")}
              </button>
              <button
                onClick={() => handleWindSpeedChange("mph")}
                className={`p-3 rounded-lg text-center transition-colors ${getButtonClasses(
                  windSpeed === "mph"
                )}`}
              >
                {t("settings.windSpeed.mph")}
              </button>
              <button
                onClick={() => handleWindSpeedChange("ms")}
                className={`p-3 rounded-lg text-center transition-colors ${getButtonClasses(
                  windSpeed === "ms"
                )}`}
              >
                {t("settings.windSpeed.ms")}
              </button>
            </div>
          </div>

          {/* Language selection section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("settings.language.title")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["en", "es", "fr", "ka"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`p-3 rounded-lg text-center transition-colors ${getButtonClasses(
                    language === lang
                  )}`}
                  aria-label={t(`settings.language.${lang}`)}
                >
                  {t(`settings.language.${lang}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
