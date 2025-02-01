// Import necessary hooks and components
import { useState, useRef, useEffect } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { searchCities } from "../../services/weatherService";
import { useDebounce } from "../../hooks/useDebounce";

// Define props interface for the SearchBox component
interface SearchBoxProps {
  isDark: boolean; // Current theme state
  onCitySelect: (
    // Callback when a city is selected
    lat: number,
    lon: number,
    name: string,
    country: string
  ) => void;
}

// Define the structure of city search results
interface SearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

export function SearchBox({ isDark, onCitySelect }: SearchBoxProps) {
  // State management for search functionality
  const [query, setQuery] = useState(""); // Current search query
  const [results, setResults] = useState<SearchResult[]>([]); // Search results
  const [loading, setLoading] = useState(false); // Loading state
  const [showResults, setShowResults] = useState(false); // Control results visibility
  const searchRef = useRef<HTMLDivElement>(null); // Reference for click outside detection
  const debouncedQuery = useDebounce(query, 500); // Debounced search query

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch search results when query changes
  useEffect(() => {
    const searchCity = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await searchCities(debouncedQuery);
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Failed to search cities:", error);
      } finally {
        setLoading(false);
      }
    };

    searchCity();
  }, [debouncedQuery]);

  // Handle selection of a search result
  const handleResultClick = (result: SearchResult) => {
    onCitySelect(result.lat, result.lon, result.name, result.country);
    setQuery("");
    setShowResults(false);
  };

  return (
    <div
      ref={searchRef}
      className="relative flex-1 w-full sm:max-w-xl sm:mx-4 md:mx-8"
    >
      {/* Search input container */}
      <div className="relative">
        {/* Search icon */}
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

        {/* Loading indicator */}
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin text-blue-500" />
        )}

        {/* Search input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className={`w-full rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDark
              ? "bg-[#3A3A3C] text-white placeholder-gray-500"
              : "bg-gray-100 text-gray-900 placeholder-gray-500"
          }`}
        />
      </div>

      {/* Search results dropdown */}
      {showResults && results.length > 0 && (
        <div
          className={`absolute z-50 w-full mt-2 rounded-lg shadow-lg overflow-hidden ${
            isDark ? "bg-[#3A3A3C]" : "bg-white"
          }`}
        >
          {/* Map through and render search results */}
          {results.map((result, index) => (
            <button
              key={`${result.lat}-${result.lon}-${index}`}
              onClick={() => handleResultClick(result)}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 ${
                isDark ? "hover:bg-[#2C2C2E]" : "hover:bg-gray-50"
              }`}
            >
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">{result.name}</div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {result.state ? `${result.state}, ` : ""}
                  {result.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
