import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const en = {
  "today": "Today",
  "tomorrow": "Tomorrow",
  "nextWeek": "Next 7 days",
  "nextHours": "Next 10 Hours",
  "majorCities": "Major World Cities",
  "search": {
    "placeholder": "Search city...",
    "noResults": "No cities found"
  },
  "airQuality": {
    "title": "Air Quality",
    "good": "Good",
    "fair": "Fair",
    "moderate": "Moderate",
    "poor": "Poor",
    "veryPoor": "Very Poor",
    "unknown": "Unknown",
    "goodDesc": "Air quality is satisfactory, and air pollution poses little or no risk.",
    "fairDesc": "Air quality is acceptable. However, there may be a risk for some people.",
    "moderateDesc": "Members of sensitive groups may experience health effects.",
    "poorDesc": "Everyone may begin to experience health effects.",
    "veryPoorDesc": "Health warnings of emergency conditions. The entire population is likely to be affected.",
    "unknownDesc": "Air quality data is currently unavailable.",
    "pollutants": {
      "pm25": "PM2.5",
      "pm10": "PM10",
      "o3": "O₃",
      "no2": "NO₂",
      "so2": "SO₂",
      "co": "CO"
    }
  },
  "weather": {
    "feelsLike": "Feels like",
    "wind": "Wind",
    "humidity": "Humidity",
    "pressure": "Pressure",
    "precipitation": "Precipitation",
    "rain": "Rain",
    "sunrise": "Sunrise",
    "sunset": "Sunset",
    "forecast": {
      "today": "Today's Forecast",
      "tomorrow": "Tomorrow's Forecast",
      "weekly": "7-Day Forecast",
      "hourly": "Hourly Forecast",
      "high": "High",
      "low": "Low",
      "chance": "Chance of rain"
    },
    "alerts": {
      "title": "Weather Alerts",
      "noAlerts": "No active weather alerts for your area",
      "validUntil": "Valid until",
      "severity": {
        "extreme": "Extreme",
        "severe": "Severe",
        "moderate": "Moderate",
        "minor": "Minor"
      }
    }
  },
  "settings": {
    "title": "Settings",
    "units": {
      "title": "Temperature Units",
      "celsius": "Celsius (°C)",
      "fahrenheit": "Fahrenheit (°F)"
    },
    "windSpeed": {
      "title": "Wind Speed",
      "kmh": "km/h",
      "mph": "mph",
      "ms": "m/s"
    },
    "language": {
      "title": "Language",
      "en": "English",
      "es": "Español",
      "fr": "Français",
      "ka": "ქართული"
    }
  },
  "errors": {
    "location": {
      "denied": "Please allow location access",
      "unavailable": "Location is unavailable",
      "timeout": "Location request timed out",
      "unsupported": "Geolocation is not supported"
    },
    "weather": {
      "fetch": "Failed to fetch weather data",
      "forecast": "Failed to load forecast",
      "hourly": "Failed to load hourly forecast",
      "alerts": "Failed to load weather alerts",
      "airQuality": "Failed to load air quality data"
    }
  }
};

const es = {
  "today": "Hoy",
  "tomorrow": "Mañana",
  "nextWeek": "Próximos 7 días",
  "nextHours": "Próximas 10 horas",
  "majorCities": "Principales ciudades mundiales",
  "search": {
    "placeholder": "Buscar ciudad...",
    "noResults": "No se encontraron ciudades"
  },
  "airQuality": {
    "title": "Calidad del aire",
    "good": "Buena",
    "fair": "Aceptable",
    "moderate": "Moderada",
    "poor": "Mala",
    "veryPoor": "Muy mala",
    "unknown": "Desconocida",
    "goodDesc": "La calidad del aire es satisfactoria y la contaminación del aire representa poco o ningún riesgo.",
    "fairDesc": "La calidad del aire es aceptable. Sin embargo, puede haber riesgo para algunas personas.",
    "moderateDesc": "Los miembros de grupos sensibles pueden experimentar efectos en la salud.",
    "poorDesc": "Todos pueden comenzar a experimentar efectos en la salud.",
    "veryPoorDesc": "Advertencias sanitarias de condiciones de emergencia. Es probable que toda la población se vea afectada.",
    "unknownDesc": "Los datos de calidad del aire no están disponibles actualmente.",
    "pollutants": {
      "pm25": "PM2.5",
      "pm10": "PM10",
      "o3": "O₃",
      "no2": "NO₂",
      "so2": "SO₂",
      "co": "CO"
    }
  },
  "weather": {
    "feelsLike": "Sensación térmica",
    "wind": "Viento",
    "humidity": "Humedad",
    "pressure": "Presión",
    "precipitation": "Precipitación",
    "rain": "Lluvia",
    "sunrise": "Amanecer",
    "sunset": "Atardecer",
    "forecast": {
      "today": "Pronóstico de hoy",
      "tomorrow": "Pronóstico de mañana",
      "weekly": "Pronóstico de 7 días",
      "hourly": "Pronóstico por hora",
      "high": "Máxima",
      "low": "Mínima",
      "chance": "Probabilidad de lluvia"
    },
    "alerts": {
      "title": "Alertas meteorológicas",
      "noAlerts": "No hay alertas meteorológicas activas para su área",
      "validUntil": "Válido hasta",
      "severity": {
        "extreme": "Extrema",
        "severe": "Severa",
        "moderate": "Moderada",
        "minor": "Menor"
      }
    }
  },
  "settings": {
    "title": "Ajustes",
    "units": {
      "title": "Unidades de temperatura",
      "celsius": "Celsius (°C)",
      "fahrenheit": "Fahrenheit (°F)"
    },
    "windSpeed": {
      "title": "Velocidad del viento",
      "kmh": "km/h",
      "mph": "mph",
      "ms": "m/s"
    },
    "language": {
      "title": "Idioma",
      "en": "English",
      "es": "Español",
      "fr": "Français",
      "ka": "ქართული"
    }
  },
  "errors": {
    "location": {
      "denied": "Por favor, permita el acceso a la ubicación",
      "unavailable": "La ubicación no está disponible",
      "timeout": "La solicitud de ubicación expiró",
      "unsupported": "La geolocalización no está soportada"
    },
    "weather": {
      "fetch": "Error al obtener datos meteorológicos",
      "forecast": "Error al cargar el pronóstico",
      "hourly": "Error al cargar el pronóstico por hora",
      "alerts": "Error al cargar las alertas meteorológicas",
      "airQuality": "Error al cargar los datos de calidad del aire"
    }
  }
};

const fr = {
  "today": "Aujourd'hui",
  "tomorrow": "Demain",
  "nextWeek": "7 prochains jours",
  "nextHours": "10 prochaines heures",
  "majorCities": "Grandes villes mondiales",
  "search": {
    "placeholder": "Rechercher une ville...",
    "noResults": "Aucune ville trouvée"
  },
  "airQuality": {
    "title": "Qualité de l'air",
    "good": "Bonne",
    "fair": "Correcte",
    "moderate": "Modérée",
    "poor": "Mauvaise",
    "veryPoor": "Très mauvaise",
    "unknown": "Inconnue",
    "goodDesc": "La qualité de l'air est satisfaisante et la pollution de l'air présente peu ou pas de risque.",
    "fairDesc": "La qualité de l'air est acceptable. Cependant, il peut y avoir un risque pour certaines personnes.",
    "moderateDesc": "Les membres des groupes sensibles peuvent ressentir des effets sur la santé.",
    "poorDesc": "Tout le monde peut commencer à ressentir des effets sur la santé.",
    "veryPoorDesc": "Avertissements sanitaires de conditions d'urgence. Toute la population est susceptible d'être affectée.",
    "unknownDesc": "Les données sur la qualité de l'air ne sont pas disponibles actuellement.",
    "pollutants": {
      "pm25": "PM2.5",
      "pm10": "PM10",
      "o3": "O₃",
      "no2": "NO₂",
      "so2": "SO₂",
      "co": "CO"
    }
  },
  "weather": {
    "feelsLike": "Ressenti",
    "wind": "Vent",
    "humidity": "Humidité",
    "pressure": "Pression",
    "precipitation": "Précipitation",
    "rain": "Pluie",
    "sunrise": "Lever du soleil",
    "sunset": "Coucher du soleil",
    "forecast": {
      "today": "Prévisions du jour",
      "tomorrow": "Prévisions de demain",
      "weekly": "Prévisions sur 7 jours",
      "hourly": "Prévisions horaires",
      "high": "Maximum",
      "low": "Minimum",
      "chance": "Risque de pluie"
    },
    "alerts": {
      "title": "Alertes météo",
      "noAlerts": "Aucune alerte météo active pour votre région",
      "validUntil": "Valable jusqu'à",
      "severity": {
        "extreme": "Extrême",
        "severe": "Sévère",
        "moderate": "Modérée",
        "minor": "Mineure"
      }
    }
  },
  "settings": {
    "title": "Paramètres",
    "units": {
      "title": "Unités de température",
      "celsius": "Celsius (°C)",
      "fahrenheit": "Fahrenheit (°F)"
    },
    "windSpeed": {
      "title": "Vitesse du vent",
      "kmh": "km/h",
      "mph": "mph",
      "ms": "m/s"
    },
    "language": {
      "title": "Langue",
      "en": "English",
      "es": "Español",
      "fr": "Français",
      "ka": "ქართული"
    }
  },
  "errors": {
    "location": {
      "denied": "Veuillez autoriser l'accès à la localisation",
      "unavailable": "La localisation n'est pas disponible",
      "timeout": "La demande de localisation a expiré",
      "unsupported": "La géolocalisation n'est pas supportée"
    },
    "weather": {
      "fetch": "Échec de la récupération des données météo",
      "forecast": "Échec du chargement des prévisions",
      "hourly": "Échec du chargement des prévisions horaires",
      "alerts": "Échec du chargement des alertes météo",
      "airQuality": "Échec du chargement des données de qualité de l'air"
    }
  }
};

const ka = {
  "today": "დღეს",
  "tomorrow": "ხვალ",
  "nextWeek": "მომდევნო 7 დღე",
  "nextHours": "მომდევნო 10 საათი",
  "majorCities": "მსხვილი მსოფლიო ქალაქები",
  "search": {
    "placeholder": "ქალაქის ძიება...",
    "noResults": "ქალაქები ვერ მოიძებნა"
  },
  "airQuality": {
    "title": "ჰაერის ხარისხი",
    "good": "კარგი",
    "fair": "საშუალო",
    "moderate": "ზომიერი",
    "poor": "ცუდი",
    "veryPoor": "ძალიან ცუდი",
    "unknown": "უცნობი",
    "goodDesc": "ჰაერის ხარისხი დამაკმაყოფილებელია და ჰაერის დაბინძურება წარმოადგენს მცირე ან არანაირ რისკს.",
    "fairDesc": "ჰაერის ხარისხი მისაღებია. თუმცა, შეიძლება არსებობდეს რისკი ზოგიერთი ადამიანისთვის.",
    "moderateDesc": "მგრძნობიარე ჯგუფების წევრებმა შეიძლება იგრძნონ ჯანმრთელობაზე გავლენა.",
    "poorDesc": "ყველამ შეიძლება დაიწყოს ჯანმრთელობაზე გავლენის შეგრძნება.",
    "veryPoorDesc": "ჯანმრთელობის გაფრთხილებები საგანგებო მდგომარეობის შესახებ. სავარაუდოდ მთელი მოსახლეობა დაზარალდება.",
    "unknownDesc": "ჰაერის ხარისხის მონაცემები ამჟამად მიუწვდომელია.",
    "pollutants": {
      "pm25": "PM2.5",
      "pm10": "PM10",
      "o3": "O₃",
      "no2": "NO₂",
      "so2": "SO₂",
      "co": "CO"
    }
  },
  "weather": {
    "feelsLike": "იგრძნობა როგორც",
    "wind": "ქარი",
    "humidity": "ტენიანობა",
    "pressure": "წნევა",
    "precipitation": "ნალექი",
    "rain": "წვიმა",
    "sunrise": "მზის ამოსვლა",
    "sunset": "მზის ჩასვლა",
    "forecast": {
      "today": "დღევანდელი პროგნოზი",
      "tomorrow": "ხვალინდელი პროგნოზი",
      "weekly": "7-დღიანი პროგნოზი",
      "hourly": "საათობრივი პროგნოზი",
      "high": "მაქსიმუმი",
      "low": "მინიმუმი",
      "chance": "წვიმის ალბათობა"
    },
    "alerts": {
      "title": "ამინდის გაფრთხილებები",
      "noAlerts": "თქვენს რეგიონში არ არის აქტიური ამინდის გაფრთხილებები",
      "validUntil": "ძალაშია",
      "severity": {
        "extreme": "უკიდურესი",
        "severe": "მძიმე",
        "moderate": "ზომიერი",
        "minor": "მსუბუქი"
      }
    }
  },
  "settings": {
    "title": "პარამეტრები",
    "units": {
      "title": "ტემპერატურის ერთეულები",
      "celsius": "ცელსიუსი (°C)",
      "fahrenheit": "ფარენჰეიტი (°F)"
    },
    "windSpeed": {
      "title": "ქარის სიჩქარე",
      "kmh": "კმ/სთ",
      "mph": "მილი/სთ",
      "ms": "მ/წმ"
    },
    "language": {
      "title": "ენა",
      "en": "English",
      "es": "Español",
      "fr": "Français",
      "ka": "ქართული"
    }
  },
  "errors": {
    "location": {
      "denied": "გთხოვთ დაუშვათ მდებარეობის წვდომა",
      "unavailable": "მდებარეობა მიუწვდომელია",
      "timeout": "მდებარეობის მოთხოვნის დრო ამოიწურა",
      "unsupported": "გეოლოკაცია არ არის მხარდაჭერილი"
    },
    "weather": {
      "fetch": "ამინდის მონაცემების მიღება ვერ მოხერხდა",
      "forecast": "პროგნოზის ჩატვირთვა ვერ მოხერხდა",
      "hourly": "საათობრივი პროგნოზის ჩატვირთვა ვერ მოხერხდა",
      "alerts": "ამინდის გაფრთხილებების ჩატვირთვა ვერ მოხერხდა",
      "airQuality": "ჰაერის ხარისხის მონაცემების ჩატვირთვა ვერ მოხერხდა"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      ka: { translation: ka }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;