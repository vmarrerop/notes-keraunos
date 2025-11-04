import { Weather } from '../../domain/entities/Weather';
import { WeatherForecast, ForecastItem } from '../../domain/entities/WeatherForecast';
import { 
  WEATHER_DESCRIPTIONS, 
  WEATHER_ICONS, 
  DEFAULT_WEATHER_DESCRIPTION, 
  DEFAULT_WEATHER_ICON 
} from '../../domain/constants/weatherCodes';
import { WEATHER_API_CONFIG } from '../config/api.config';

export class WeatherMapper {
  static getWeatherDescription(code) {
    return WEATHER_DESCRIPTIONS[code] || DEFAULT_WEATHER_DESCRIPTION;
  }

  static getWeatherIcon(code) {
    return WEATHER_ICONS[code] || DEFAULT_WEATHER_ICON;
  }

  static toWeatherEntity(apiData, location) {
    const current = apiData.current;
    
    return new Weather({
      city: location.name,
      country: location.country_code || location.country || '',
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      pressure: Math.round(current.pressure_msl),
      windSpeed: current.wind_speed_10m,
      description: this.getWeatherDescription(current.weather_code),
      icon: this.getWeatherIcon(current.weather_code),
      clouds: current.cloud_cover,
      visibility: WEATHER_API_CONFIG.DEFAULT_VISIBILITY,
      timestamp: new Date(),
    });
  }

  static toWeatherForecastEntity(apiData, location) {
    const hourly = apiData.hourly;
    const now = new Date();
    const currentHour = now.getHours();
    
    const forecastItems = hourly.time
      .slice(currentHour, currentHour + 8)
      .map((time, index) => new ForecastItem({
        time: new Date(time),
        temperature: Math.round(hourly.temperature_2m[currentHour + index]),
        description: this.getWeatherDescription(hourly.weather_code[currentHour + index]),
        icon: this.getWeatherIcon(hourly.weather_code[currentHour + index]),
        rain: hourly.precipitation[currentHour + index] || 0,
        clouds: hourly.cloud_cover[currentHour + index],
      }));

    return new WeatherForecast({
      city: location.name,
      forecasts: forecastItems,
    });
  }
}
