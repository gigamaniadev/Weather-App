import { MapPin, Settings, Sun, Moon, Cloud, CloudRain } from "lucide-react";
import { SearchBox } from "../search/SearchBox";
import { LocationData } from "../../types";
import { useEffect } from "react";

interface HeaderProps {
  isDark: boolean;
  location: LocationData;
  toggleTheme: () => void;
  toggleSettings: () => void;
  onCitySelect: (
    lat: number,
    lon: number,
    name: string,
    country: string
  ) => void;
}

export function Header({
  isDark,
  location,
  toggleTheme,
  toggleSettings,
  onCitySelect,
}: HeaderProps) {
  // Effect to check and apply the saved theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    // If a theme is saved, apply it to the document
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // If no saved theme, default to system preference or the app's default
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
    }
  }, [isDark]);

  // Handle theme toggle and persist it to localStorage
  const handleThemeToggle = () => {
    toggleTheme(); // Toggle the theme state (dark <-> light)
    const newTheme = isDark ? "light" : "dark"; // Switch theme
    localStorage.setItem("theme", newTheme); // Save theme to localStorage
    document.documentElement.setAttribute("data-theme", newTheme); // Apply theme
  };

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <a
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            <Cloud className="w-8 h-8 text-blue-500" />
            <CloudRain className="w-6 h-6 text-blue-400 absolute -bottom-1 -right-1" />
          </div>
          <span className="text-xl font-semibold text-blue-500">WEATHER</span>
        </a>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span className="text-sm sm:text-base">
            {location.loading
              ? "Loading..."
              : location.error
              ? location.error
              : `${location.city}, ${location.country}`}
          </span>
        </div>
      </div>

      <SearchBox isDark={isDark} onCitySelect={onCitySelect} />

      <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
        <button
          onClick={toggleSettings}
          className={`p-2 rounded-lg ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <Settings className="w-5 h-5" />
        </button>
        <button
          onClick={handleThemeToggle} // Use the new handleThemeToggle
          className={`p-2 rounded-lg transition-colors ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
