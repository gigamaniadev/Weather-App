// Import necessary dependencies and components
import { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { CurrentWeather } from "./components/weather/CurrentWeather";
import { TomorrowWeather } from "./components/weather/TomorrowWeather";
import { WeeklyForecast } from "./components/weather/WeeklyForecast";
import { AirQuality } from "./components/weather/AirQuality";
import { HourlyForecast } from "./components/weather/HourlyForecast";
import { MajorCities } from "./components/weather/MajorCities";
import { WeatherAlert } from "./components/weather/WeatherAlert";
import { SettingsModal } from "./components/settings/SettingsModal";
import {
  fetchWeatherData,
  fetchLocationData,
  fetchTomorrowWeather,
} from "./services/weatherService";
import { getWindDirection } from "./utils/weatherUtils";
import { LocationData, WeatherData, TomorrowWeatherData } from "./types";

function App() {
  // Theme state and preferences
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false; // default to light theme
  });

  // Application state
  const [showSettings, setShowSettings] = useState(false);
  const [units, setUnits] = useState<"celsius" | "fahrenheit">("celsius");
  const [windSpeed, setWindSpeed] = useState("kmh");
  const [language, setLanguage] = useState("en");
  const [activeTab, setActiveTab] = useState<"today" | "tomorrow" | "week">(
    "today"
  );

  // Location and weather state
  const [location, setLocation] = useState<LocationData>({
    city: "Loading...",
    country: "",
    error: null,
    loading: true,
    lat: 0,
    lon: 0,
  });
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [tomorrowWeather, setTomorrowWeather] =
    useState<TomorrowWeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // UI state handlers
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
  const toggleSettings = () => setShowSettings(!showSettings);

  // Data fetching function
  const loadWeatherData = async (latitude: number, longitude: number) => {
    try {
      setWeatherLoading(true);

      const [weatherData, tomorrowData, locationData] = await Promise.all([
        fetchWeatherData(latitude, longitude),
        fetchTomorrowWeather(latitude, longitude),
        fetchLocationData(latitude, longitude),
      ]);

      if (weatherData.cod === 200) {
        setWeather({
          temp: Math.round(weatherData.main.temp),
          feels_like: Math.round(weatherData.main.feels_like),
          humidity: weatherData.main.humidity,
          wind_speed: weatherData.wind.speed,
          wind_direction: getWindDirection(weatherData.wind.deg),
          pressure: weatherData.main.pressure,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          sunrise: weatherData.sys.sunrise,
          sunset: weatherData.sys.sunset,
        });

        if (tomorrowData) {
          setTomorrowWeather({
            temp_max: Math.round(tomorrowData.main.temp_max),
            temp_min: Math.round(tomorrowData.main.temp_min),
            humidity: tomorrowData.main.humidity,
            wind_speed: tomorrowData.wind.speed,
            wind_direction: getWindDirection(tomorrowData.wind.deg),
            pressure: tomorrowData.main.pressure,
            description: tomorrowData.weather[0].description,
            icon: tomorrowData.weather[0].icon,
            precipitation: tomorrowData.pop || 0,
            date: tomorrowData.dt,
          });
        }

        setLocation({
          city:
            locationData.address.city ||
            locationData.address.town ||
            locationData.address.village ||
            "Unknown",
          country: locationData.address.country || "",
          error: null,
          loading: false,
          lat: latitude,
          lon: longitude,
        });

        setWeatherError(null);
      } else {
        throw new Error(weatherData.message);
      }
    } catch (error) {
      setWeatherError("Couldn't fetch weather data");
    } finally {
      setWeatherLoading(false);
    }
  };

  // Location selection handler
  const handleCitySelect = (
    lat: number,
    lon: number,
    city: string,
    country: string
  ) => {
    setLocation({
      city,
      country,
      error: null,
      loading: false,
      lat,
      lon,
    });
    loadWeatherData(lat, lon);
  };

  // Initial geolocation effect
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          loadWeatherData(latitude, longitude);
        },
        (error) => {
          let errorMessage = "Couldn't get your location";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Please allow location access";
          }
          setLocation((prev) => ({
            ...prev,
            error: errorMessage,
            loading: false,
          }));
          setWeatherLoading(false);
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported",
        loading: false,
      }));
      setWeatherLoading(false);
    }
  }, []);

  // Weather data update effect
  useEffect(() => {
    if (location.lat && location.lon) {
      loadWeatherData(location.lat, location.lon);
    }
  }, [units]);

  // Weather content renderer based on active tab
  const renderWeatherContent = () => {
    switch (activeTab) {
      case "today":
        return (
          <CurrentWeather
            weatherLoading={weatherLoading}
            weatherError={weatherError}
            weather={weather}
            units={units}
            windSpeedUnit={windSpeed}
            isDark={isDark}
          />
        );
      case "tomorrow":
        return (
          <TomorrowWeather
            isDark={isDark}
            weatherLoading={weatherLoading}
            weatherError={weatherError}
            weather={tomorrowWeather}
            units={units}
            windSpeedUnit={windSpeed}
          />
        );
      case "week":
        return (
          <WeeklyForecast
            isDark={isDark}
            latitude={location.lat}
            longitude={location.lon}
            units={units}
            windSpeedUnit={windSpeed}
          />
        );
      default:
        return null;
    }
  };

  return (
    // Main app container with theme-based styling
    <div
      className={`min-h-screen ${
        isDark ? "bg-[#1C1C1E] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Settings Modal Component */}
      <SettingsModal
        isDark={isDark}
        showSettings={showSettings}
        toggleSettings={toggleSettings}
        units={units}
        setUnits={setUnits}
        windSpeed={windSpeed}
        setWindSpeed={setWindSpeed}
        language={language}
        setLanguage={setLanguage}
      />

      <div className="max-w-[1600px] mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Main content container */}
        <div
          className={`rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 ${
            isDark ? "bg-[#2C2C2E]" : "bg-white shadow-sm"
          }`}
        >
          {/* Header Section */}
          <Header
            isDark={isDark}
            location={location}
            toggleTheme={toggleTheme}
            toggleSettings={toggleSettings}
            onCitySelect={handleCitySelect}
          />

          {/* Navigation Tabs */}
          <Navigation
            isDark={isDark}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {activeTab !== "week" ? (
              // Today and Tomorrow view layout
              <>
                {/* Main weather information */}
                <div className="lg:col-span-3">{renderWeatherContent()}</div>

                {/* Additional weather data sections */}
                <div className="lg:col-span-9">
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                      <HourlyForecast
                        isDark={isDark}
                        latitude={location.lat}
                        longitude={location.lon}
                        units={units}
                        windSpeedUnit={windSpeed}
                      />
                      <WeeklyForecast
                        isDark={isDark}
                        latitude={location.lat}
                        longitude={location.lon}
                        units={units}
                        windSpeedUnit={windSpeed}
                      />

                      <AirQuality
                        isDark={isDark}
                        latitude={location.lat}
                        longitude={location.lon}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                      <div className="lg:col-span-8">
                        <MajorCities
                          isDark={isDark}
                          units={units}
                          latitude={location.lat}
                          longitude={location.lon}
                        />
                      </div>
                      <div className="lg:col-span-4">
                        <WeatherAlert
                          isDark={isDark}
                          latitude={location.lat}
                          longitude={location.lon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Weekly view layout
              <div className="lg:col-span-12">
                <WeeklyForecast
                  isDark={isDark}
                  latitude={location.lat}
                  longitude={location.lon}
                  units={units}
                  windSpeedUnit={windSpeed}
                />
              </div>
            )}
          </div>
        </div>
        {/* Footer Component */}
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}

export default App;
