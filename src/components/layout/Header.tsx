// Import necessary icons and components
import { MapPin, Settings, Sun, Moon, Cloud, CloudRain } from "lucide-react";
import { SearchBox } from "../search/SearchBox";
import { LocationData } from "../../types";
import { useEffect } from "react";

// Define the props interface for the Header component
interface HeaderProps {
  isDark: boolean; // Current theme state
  location: LocationData; // Location information
  toggleTheme: () => void; // Function to toggle between light/dark themes
  toggleSettings: () => void; // Function to toggle settings panel
  onCitySelect: (
    lat: number,
    lon: number,
    name: string,
    country: string
  ) => void; // Callback for when a city is selected
}

export function Header({
  isDark,
  location,
  toggleTheme,
  toggleSettings,
  onCitySelect,
}: HeaderProps) {
  // Initialize theme from localStorage or system preferences on component mount
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

  // Handle theme changes and persist to localStorage
  const handleThemeToggle = () => {
    toggleTheme(); // Toggle the theme state (dark <-> light)
    const newTheme = isDark ? "light" : "dark"; // Switch theme
    localStorage.setItem("theme", newTheme); // Save theme to localStorage
    document.documentElement.setAttribute("data-theme", newTheme); // Apply theme
  };

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
      {/* Logo and location section */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Weather app logo and title */}
        <a
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {/* Overlapping cloud icons for logo */}
          <div className="relative">
            <Cloud className="w-8 h-8 text-blue-500" />
            <CloudRain className="w-6 h-6 text-blue-400 absolute -bottom-1 -right-1" />
          </div>
          <span className="text-xl font-semibold text-blue-500">WEATHER</span>
        </a>
        {/* Current location display */}
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

      {/* Search box component */}
      <SearchBox isDark={isDark} onCitySelect={onCitySelect} />

      {/* Settings and theme toggle buttons */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
        {/* Settings button */}
        <button
          onClick={toggleSettings}
          className={`p-2 rounded-lg ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <Settings className="w-5 h-5" />
        </button>
        {/* Theme toggle button */}
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
