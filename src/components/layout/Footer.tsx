// Import necessary icons from lucide-react
import { Cloud, CloudRain } from "lucide-react";

// Define props interface for Footer component
interface FooterProps {
  isDark: boolean;
}

// Footer component that adapts to light/dark mode
export function Footer({ isDark }: FooterProps) {
  return (
    // Main footer container with conditional dark/light text color
    <footer className={`text-sm ${isDark ? "text-gray-300" : "text-black"}`}>
      {/* Flex container for footer content */}
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        {/* Logo and brand name */}
        <a
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {/* Stacked weather icons */}
          <div className="relative">
            <Cloud className="w-8 h-8 text-blue-500" />
            <CloudRain className="w-6 h-6 text-blue-400 absolute -bottom-1 -right-1" />
          </div>
          <span className="text-xl font-semibold text-blue-500">WEATHER</span>
        </a>

        {/* Copyright text */}
        <p className="text-sm">© Copyright 2025. All Rights Reserved.</p>

        {/* Social media links */}
        <div className="flex -mx-2">
          {/* Linkedin link */}
          <a
            href="https://www.linkedin.com/in/gigamaniadev/"
            target="_blank"
            className={`mx-2 transition-colors duration-300 ${
              isDark ? "text-gray-300" : "text-black"
            } hover:text-blue-500 dark:hover:text-blue-400`}
            aria-label="Facebook"
          >
            {/* Linkedin icon */}
            <svg
              className="w-5 h-5 fill-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
            </svg>
          </a>

          {/* Github link */}
          <a
            href="https://github.com/gigamaniadev"
            target="_blank"
            className={`mx-2 transition-colors duration-300 ${
              isDark ? "text-gray-300" : "text-black"
            } hover:text-blue-500 dark:hover:text-blue-400`}
            aria-label="Github"
          >
            {/* Github icon */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
