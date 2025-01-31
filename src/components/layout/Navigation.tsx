import { useTranslation } from "react-i18next";

interface NavigationProps {
  isDark: boolean;
  activeTab: "today" | "tomorrow" | "week";
  setActiveTab: (tab: "today" | "tomorrow" | "week") => void;
}

export function Navigation({
  isDark,
  activeTab,
  setActiveTab,
}: NavigationProps) {
  const { t } = useTranslation();

  return (
    <nav className="flex gap-6 mb-6 md:mb-8 overflow-x-auto pb-2 sm:pb-0">
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
