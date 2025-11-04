import { WeatherMapper } from '../mappers/WeatherMapper';
import { WEATHER_API_CONFIG, WEATHER_API_PARAMS } from '../config/api.config';

export class OpenMeteoDataSource {
  async _fetchCoordinates(city) {
    const url = `${WEATHER_API_CONFIG.GEOCODING_URL}/search?name=${encodeURIComponent(city)}&count=${WEATHER_API_PARAMS.GEOCODING_COUNT}&language=${WEATHER_API_PARAMS.LANGUAGE}&format=json`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Error al buscar la ciudad');
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('Ciudad no encontrada. Por favor verifica el nombre.');
    }
    
    return data.results[0];
  }

  async fetchCurrentWeather(city) {
    try {
      const location = await this._fetchCoordinates(city);
      
      const url = `${WEATHER_API_CONFIG.BASE_URL}/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=${WEATHER_API_PARAMS.CURRENT}&timezone=${WEATHER_API_PARAMS.TIMEZONE}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error al obtener los datos del clima.');
      }

      const data = await response.json();
      return WeatherMapper.toWeatherEntity(data, location);
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Sin conexión a internet. Por favor verifica tu conexión.');
      }
      throw error;
    }
  }

  async fetchWeatherForecast(city) {
    try {
      const location = await this._fetchCoordinates(city);
      
      const url = `${WEATHER_API_CONFIG.BASE_URL}/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=${WEATHER_API_PARAMS.HOURLY}&timezone=${WEATHER_API_PARAMS.TIMEZONE}&forecast_days=${WEATHER_API_PARAMS.FORECAST_DAYS}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error al obtener el pronóstico del clima.');
      }

      const data = await response.json();
      return WeatherMapper.toWeatherForecastEntity(data, location);
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Sin conexión a internet para el pronóstico.');
      }
      throw error;
    }
  }
}
