<div align="left" style="position: relative;">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>WEATHER-APP</h1>
<p align="left">
    <em><code>❯ REPLACE-ME</code></em>
</p>
<p align="left">
    <img src="https://img.shields.io/github/license/gigamaniadev/Weather-App?style=flat&logo=opensourceinitiative&logoColor=white&color=6200ff" alt="license">
    <img src="https://img.shields.io/github/last-commit/gigamaniadev/Weather-App?style=flat&logo=git&logoColor=white&color=6200ff" alt="last-commit">
    <img src="https://img.shields.io/github/languages/top/gigamaniadev/Weather-App?style=flat&color=6200ff" alt="repo-top-language">
    <img src="https://img.shields.io/github/languages/count/gigamaniadev/Weather-App?style=flat&color=6200ff" alt="repo-language-count">
</p>
<p align="left">Built with the tools and technologies:</p>
<p align="left">
    <img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
    <img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
    <br>
    <img src="https://img.shields.io/badge/i18next-26A69A.svg?style=flat&logo=i18next&logoColor=white" alt="i18next">
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
</p>
</div>
<br clear="right">

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
  - [🧪 Testing](#🧪-testing)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

<code>Weather Forecasts:

The app is likely designed to display current weather information like temperature, humidity, wind speed, and possibly forecasts for the coming days.
Location Search:

Users might be able to search for weather details by entering a city name or location, which would trigger an API call to fetch relevant data for that region.
Dynamic Data Updates:

The application would update weather information dynamically, likely using an API such as OpenWeatherMap, Weatherstack, or similar.
User Interface:

Since it is built with React, the UI would likely be responsive, sleek, and modern. React helps in managing dynamic content updates without requiring full page reloads, so the user experience would be smooth.
Additional Weather Information:

In addition to the basic weather details, it might include information on things like air quality, UV index, and sunrise/sunset times.
Error Handling:

If a user enters an invalid location or the API fails, the app would likely display an error message, ensuring a user-friendly experience.</code>

---

## 👾 Features

<code>1. Real-Time Weather Data
Provides live, current weather information for any searched location (city, zip code, or coordinates).
Displays details such as:
Temperature (current, feels like)
Humidity levels
Wind speed and direction
Atmospheric pressure
Cloud cover percentage 2. Weather Forecast
Shows a multi-day forecast, typically for the next 5-7 days, including:
High and low temperatures
Weather conditions (clear, cloudy, rainy, etc.)
Precipitation chances
Wind speed/forecast 3. Location Search
Allows users to search for weather by city, postal code, or geographical coordinates.
Option to use geolocation to automatically detect the user's current location. 4. Weather Icons and Visuals
Displays weather conditions using intuitive weather icons (e.g., sun, rain, snowflakes) to make it visually appealing.
Might use background images or animations (like cloud movement, sun rays, etc.) to reflect real-time weather conditions. 5. Unit Selection (Celsius/Fahrenheit)
Users can toggle between Celsius and Fahrenheit to suit their preferences. 6. Hourly Forecast
Provides a detailed hour-by-hour weather forecast for the day, including temperature and precipitation predictions. 7. Air Quality Index (AQI)
Displays air quality information, such as pollution levels (PM2.5, PM10), ozone levels, and overall air quality index (AQI). 8. UV Index
Shows the current UV index to help users assess the level of sun exposure risk. 9. Sunrise and Sunset Times
Displays the exact times for sunrise and sunset based on the selected location. 10. Error Handling and Alerts
Alerts users when the location is invalid or if there’s a connectivity issue with the weather data source.
Error messages guiding users to correct their input or try again later. 11. Responsive Design
Fully mobile-friendly interface, ensuring smooth user experience across desktops, tablets, and smartphones. 12. Smooth User Interaction
The app would likely use React's state and component reactivity to seamlessly update the weather data without page reloads, providing a smooth, interactive experience. 13. Favorites/History (Optional)
Ability for users to save frequently searched locations for quick access to weather details. 14. Localized Language/Timezone
Ability to display the weather data in the user's preferred language and local timezone.</code>

---

## 📁 Project Structure

```sh
└── Weather-App/
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── src
    │   ├── App.tsx
    │   ├── components
    │   ├── hooks
    │   ├── i18n
    │   ├── index.css
    │   ├── main.tsx
    │   ├── services
    │   ├── types
    │   ├── utils
    │   └── vite-env.d.ts
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

### 📂 Project Index

<details open>
    <summary><b><code>WEATHER-APP/</code></b></summary>
    <details> <!-- __root__ Submodule -->
        <summary><b>__root__</b></summary>
        <blockquote>
            <table>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/postcss.config.js'>postcss.config.js</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/tsconfig.node.json'>tsconfig.node.json</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/package-lock.json'>package-lock.json</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/tailwind.config.js'>tailwind.config.js</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/tsconfig.app.json'>tsconfig.app.json</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/package.json'>package.json</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/vite.config.ts'>vite.config.ts</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/index.html'>index.html</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/eslint.config.js'>eslint.config.js</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            </table>
        </blockquote>
    </details>
    <details> <!-- src Submodule -->
        <summary><b>src</b></summary>
        <blockquote>
            <table>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/main.tsx'>main.tsx</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/index.css'>index.css</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/App.tsx'>App.tsx</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/vite-env.d.ts'>vite-env.d.ts</a></b></td>
                <td><code>❯ REPLACE-ME</code></td>
            </tr>
            </table>
            <details>
                <summary><b>types</b></summary>
                <blockquote>
                    <table>
                    <tr>
                        <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/types/index.ts'>index.ts</a></b></td>
                        <td><code>❯ REPLACE-ME</code></td>
                    </tr>
                    </table>
                </blockquote>
            </details>
            <details>
                <summary><b>components</b></summary>
                <blockquote>
                    <details>
                        <summary><b>weather</b></summary>
                        <blockquote>
                            <table>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/weather/CurrentWeather.tsx'>CurrentWeather.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/weather/TomorrowWeather.tsx'>TomorrowWeather.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/weather/MajorCities.tsx'>MajorCities.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/weather/HourlyForecast.tsx'>HourlyForecast.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/weather/AirQuality.tsx'>AirQuality.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/weather/WeeklyForecast.tsx'>WeeklyForecast.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/weather/WeatherAlert.tsx'>WeatherAlert.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            </table>
                        </blockquote>
                    </details>
                    <details>
                        <summary><b>search</b></summary>
                        <blockquote>
                            <table>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/search/SearchBox.tsx'>SearchBox.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            </table>
                        </blockquote>
                    </details>
                    <details>
                        <summary><b>layout</b></summary>
                        <blockquote>
                            <table>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/layout/Footer.tsx'>Footer.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/layout/Navigation.tsx'>Navigation.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/layout/Header.tsx'>Header.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            </table>
                        </blockquote>
                    </details>
                    <details>
                        <summary><b>settings</b></summary>
                        <blockquote>
                            <table>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/settings/SettingsModal.tsx'>SettingsModal.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            </table>
                        </blockquote>
                    </details>
                    <details>
                        <summary><b>ui</b></summary>
                        <blockquote>
                            <table>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/components/ui/Skeleton.tsx'>Skeleton.tsx</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            </table>
                        </blockquote>
                    </details>
                </blockquote>
            </details>
            <details>
                <summary><b>hooks</b></summary>
                <blockquote>
                    <table>
                    <tr>
                        <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/hooks/useDebounce.ts'>useDebounce.ts</a></b></td>
                        <td><code>❯ REPLACE-ME</code></td>
                    </tr>
                    </table>
                </blockquote>
            </details>
            <details>
                <summary><b>i18n</b></summary>
                <blockquote>
                    <table>
                    <tr>
                        <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/i18n/index.ts'>index.ts</a></b></td>
                        <td><code>❯ REPLACE-ME</code></td>
                    </tr>
                    </table>
                    <details>
                        <summary><b>locales</b></summary>
                        <blockquote>
                            <table>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/i18n/locales/fr.json'>fr.json</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/i18n/locales/en.json'>en.json</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/i18n/locales/ka.json'>ka.json</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/i18n/locales/es.json'>es.json</a></b></td>
                                <td><code>❯ REPLACE-ME</code></td>
                            </tr>
                            </table>
                        </blockquote>
                    </details>
                </blockquote>
            </details>
            <details>
                <summary><b>utils</b></summary>
                <blockquote>
                    <table>
                    <tr>
                        <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/utils/weatherUtils.ts'>weatherUtils.ts</a></b></td>
                        <td><code>❯ REPLACE-ME</code></td>
                    </tr>
                    <tr>
                        <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/utils/dateUtils.ts'>dateUtils.ts</a></b></td>
                        <td><code>❯ REPLACE-ME</code></td>
                    </tr>
                    <tr>
                        <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/utils/temperatureUtils.ts'>temperatureUtils.ts</a></b></td>
                        <td><code>❯ REPLACE-ME</code></td>
                    </tr>
                    <tr>
                        <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/utils/windSpeedUtils.ts'>windSpeedUtils.ts</a></b></td>
                        <td><code>❯ REPLACE-ME</code></td>
                    </tr>
                    </table>
                </blockquote>
            </details>
            <details>
                <summary><b>services</b></summary>
                <blockquote>
                    <table>
                    <tr>
                        <td><b><a href='https://github.com/gigamaniadev/Weather-App/blob/master/src/services/weatherService.ts'>weatherService.ts</a></b></td>
                        <td><code>❯ REPLACE-ME</code></td>
                    </tr>
                    </table>
                </blockquote>
            </details>
        </blockquote>
    </details>
</details>

---

## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with Weather-App, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm

### ⚙️ Installation

Install Weather-App using one of the following methods:

**Build from source:**

1. Clone the Weather-App repository:

```sh
❯ git clone https://github.com/gigamaniadev/Weather-App
```

2. Navigate to the project directory:

```sh
❯ cd Weather-App
```

3. Install the project dependencies:

**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

### 🤖 Usage

Run Weather-App using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```

### 🧪 Testing

Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```

---

## 📌 Project Roadmap

- [x] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/gigamaniadev/Weather-App/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/gigamaniadev/Weather-App/issues)**: Submit bugs found or log feature requests for the `Weather-App` project.
- **💡 [Submit Pull Requests](https://github.com/gigamaniadev/Weather-App/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/gigamaniadev/Weather-App
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/gigamaniadev/Weather-App/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=gigamaniadev/Weather-App">
   </a>
</p>
</details>

---

## 🎗 License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 🙌 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
