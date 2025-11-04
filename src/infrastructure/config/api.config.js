export const WEATHER_API_CONFIG = {
  BASE_URL: 'https://api.open-meteo.com/v1',
  GEOCODING_URL: 'https://geocoding-api.open-meteo.com/v1',
  TIMEOUT: 10000,
  DEFAULT_VISIBILITY: 10,
};

export const WEATHER_API_PARAMS = {
  CURRENT: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m',
  HOURLY: 'temperature_2m,weather_code,precipitation,cloud_cover',
  LANGUAGE: 'es',
  TIMEZONE: 'auto',
  FORECAST_DAYS: 1,
  GEOCODING_COUNT: 1,
};
