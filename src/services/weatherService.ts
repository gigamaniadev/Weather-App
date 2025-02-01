/**
 * Weather API service module
 * Handles all weather-related API calls with caching
 */

// API key from environment variables
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

/**
 * Cache duration constants (in milliseconds)
 */
const CACHE_DURATION = {
  MAJOR_CITIES: 24 * 60 * 60 * 1000, // 24 hours
  DEFAULT: 5 * 60 * 1000, // 5 minutes
};

// Cache implementation for API responses
const cache = new Map<string, { data: any; timestamp: number }>();

/**
 * Fetches and caches API responses
 * @param url - API endpoint URL
 * @param duration - Cache duration in milliseconds
 */
const fetchWithCache = async (
  url: string,
  duration = CACHE_DURATION.DEFAULT
) => {
  const cached = cache.get(url);
  const now = Date.now();

  if (cached && now - cached.timestamp < duration) {
    return cached.data;
  }

  const response = await fetch(url);
  const data = await response.json();

  cache.set(url, { data, timestamp: now });
  return data;
};

/**
 * Major world cities grouped by geographical regions
 * Used for default weather displays and suggestions
 */
const CITIES_BY_REGION = {
  NORTH_AMERICA: [
    { name: "New York", country: "US", lat: 40.7128, lon: -74.006 },
    { name: "Los Angeles", country: "US", lat: 34.0522, lon: -118.2437 },
    { name: "Toronto", country: "CA", lat: 43.6532, lon: -79.3832 },
    { name: "Mexico City", country: "MX", lat: 19.4326, lon: -99.1332 },
  ],
  EUROPE: [
    { name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
    { name: "Berlin", country: "DE", lat: 52.52, lon: 13.405 },
    { name: "Madrid", country: "ES", lat: 40.4168, lon: -3.7038 },
  ],
  ASIA: [
    { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },
    { name: "Singapore", country: "SG", lat: 1.3521, lon: 103.8198 },
    { name: "Dubai", country: "AE", lat: 25.2048, lon: 55.2708 },
    { name: "Seoul", country: "KR", lat: 37.5665, lon: 126.978 },
  ],
  OCEANIA: [
    { name: "Sydney", country: "AU", lat: -33.8688, lon: 151.2093 },
    { name: "Melbourne", country: "AU", lat: -37.8136, lon: 144.9631 },
    { name: "Auckland", country: "NZ", lat: -36.8509, lon: 174.7645 },
    { name: "Brisbane", country: "AU", lat: -27.4705, lon: 153.026 },
  ],
  SOUTH_AMERICA: [
    { name: "São Paulo", country: "BR", lat: -23.5505, lon: -46.6333 },
    { name: "Buenos Aires", country: "AR", lat: -34.6037, lon: -58.3816 },
    { name: "Rio de Janeiro", country: "BR", lat: -22.9068, lon: -43.1729 },
    { name: "Lima", country: "PE", lat: -12.0464, lon: -77.0428 },
  ],
  AFRICA: [
    { name: "Cairo", country: "EG", lat: 30.0444, lon: 31.2357 },
    { name: "Cape Town", country: "ZA", lat: -33.9249, lon: 18.4241 },
    { name: "Lagos", country: "NG", lat: 6.5244, lon: 3.3792 },
    { name: "Nairobi", country: "KE", lat: -1.2921, lon: 36.8219 },
  ],
};

/**
 * Determines geographical region based on coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 */
const getRegionFromCoordinates = (
  lat: number,
  lon: number
): keyof typeof CITIES_BY_REGION => {
  // Simple region detection based on coordinates
  if (lat > 0) {
    if (lon < -30) return "NORTH_AMERICA";
    if (lon > -30 && lon < 40) return "EUROPE";
    return "ASIA";
  } else {
    if (lon < -30) return "SOUTH_AMERICA";
    if (lon > 100) return "OCEANIA";
    return "AFRICA";
  }
};

/**
 * API Functions
 * Each function handles a specific type of weather data request
 */

/**
 * Searches cities by name
 * @param query - Search string
 */
export async function searchCities(query: string) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${WEATHER_API_KEY}`;
  return fetchWithCache(url);
}

/**
 * Fetches weather data for major cities
 * Prioritizes cities in user's region if coordinates provided
 */
export async function fetchMajorCitiesWeather(
  userLat?: number,
  userLon?: number
) {
  let selectedCities = [];

  if (userLat && userLon) {
    // Get user's region
    const userRegion = getRegionFromCoordinates(userLat, userLon);

    // Add all cities from user's region
    selectedCities.push(...CITIES_BY_REGION[userRegion]);

    // Add one city from each other region
    Object.entries(CITIES_BY_REGION).forEach(([region, cities]) => {
      if (region !== userRegion) {
        selectedCities.push(cities[0]);
      }
    });
  } else {
    // If no user location, take first two cities from each region
    Object.values(CITIES_BY_REGION).forEach((cities) => {
      selectedCities.push(...cities.slice(0, 2));
    });
  }

  // Limit to 6 cities total
  selectedCities = selectedCities.slice(0, 6);

  const promises = selectedCities.map((city) =>
    fetchWeatherData(city.lat, city.lon, CACHE_DURATION.MAJOR_CITIES).then(
      (data) => ({
        city: city.name,
        country: city.country,
        temp: Math.round(data.main.temp),
        weather: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      })
    )
  );

  return Promise.all(promises);
}

/**
 * Core weather data fetching functions
 */

/**
 * Fetches current weather for given coordinates
 */
export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  cacheDuration = CACHE_DURATION.DEFAULT
) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
  return fetchWithCache(url, cacheDuration);
}

/**
 * Fetches tomorrow's weather forecast
 */
export async function fetchTomorrowWeather(
  latitude: number,
  longitude: number
) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
  const data = await fetchWithCache(url);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(12, 0, 0, 0);

  return data.list.find((item: any) => {
    const itemDate = new Date(item.dt * 1000);
    return itemDate.getDate() === tomorrow.getDate();
  });
}

/**
 * Fetches and processes 7-day weather forecast
 * Includes daily high/low temperatures and weather conditions
 */
export async function fetchWeeklyForecast(latitude: number, longitude: number) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
  const data = await fetchWithCache(url);

  const dailyForecasts = data.list.reduce((acc: any, forecast: any) => {
    const date = new Date(forecast.dt * 1000);
    const dateKey = date.toISOString().split("T")[0];

    if (!acc[dateKey]) {
      acc[dateKey] = {
        dt: forecast.dt,
        temp_max: forecast.main.temp,
        temp_min: forecast.main.temp,
        weather: forecast.weather[0],
        date: date,
      };
    } else {
      acc[dateKey].temp_max = Math.max(
        acc[dateKey].temp_max,
        forecast.main.temp
      );
      acc[dateKey].temp_min = Math.min(
        acc[dateKey].temp_min,
        forecast.main.temp
      );
    }

    return acc;
  }, {});

  return Object.values(dailyForecasts)
    .filter((forecast: any) => forecast.date > new Date())
    .sort((a: any, b: any) => a.date.getTime() - b.date.getTime())
    .slice(0, 7);
}

/**
 * Additional weather-related data fetching functions
 */

/**
 * Fetches location name from coordinates using OpenStreetMap
 */
export async function fetchLocationData(latitude: number, longitude: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;
  return fetchWithCache(url);
}

/**
 * Fetches air quality data
 */
export async function fetchAirQuality(latitude: number, longitude: number) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
  return fetchWithCache(url);
}

/**
 * Fetches hourly forecast for next 10 hours
 */
export async function fetchHourlyForecast(latitude: number, longitude: number) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
  const data = await fetchWithCache(url);
  return data.list.slice(0, 10);
}

/**
 * Fetches active weather alerts for location
 */
export async function fetchWeatherAlerts(latitude: number, longitude: number) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,daily&appid=${WEATHER_API_KEY}`;
  const data = await fetchWithCache(url, 5 * 60 * 1000); // Cache for 5 minutes
  return data.alerts || [];
}
