// Import translation hook for internationalization
import { useTranslation } from "react-i18next";

// Define props interface for Navigation component
interface NavigationProps {
  isDark: boolean; // Current theme state
  activeTab: "today" | "tomorrow" | "week"; // Currently selected tab
  setActiveTab: (tab: "today" | "tomorrow" | "week") => void; // Tab change handler
}

export function Navigation({
  isDark,
  activeTab,
  setActiveTab,
}: NavigationProps) {
  // Initialize translation hook
  const { t } = useTranslation();

  return (
    // Navigation container with horizontal scrolling on small screens
    <nav className="flex gap-6 mb-6 md:mb-8 overflow-x-auto pb-2 sm:pb-0">
      {/* Today tab button */}
      <button
        onClick={() => setActiveTab("today")}
        className={`font-medium transition-colors ${
          activeTab === "today"
            ? "text-blue-500"
            : isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        {t("today")}
      </button>

      {/* Tomorrow tab button */}
      <button
        onClick={() => setActiveTab("tomorrow")}
        className={`font-medium transition-colors ${
          activeTab === "tomorrow"
            ? "text-blue-500"
            : isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        {t("tomorrow")}
      </button>

      {/* Next week tab button */}
      <button
        onClick={() => setActiveTab("week")}
        className={`font-medium transition-colors ${
          activeTab === "week"
            ? "text-blue-500"
            : isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        {t("nextWeek")}
      </button>
    </nav>
  );
}
