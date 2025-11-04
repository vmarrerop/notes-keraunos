import { describe, it, expect } from 'vitest';
import { WeatherMapper } from './WeatherMapper';
import { Weather } from '../../domain/entities/Weather';
import { WeatherForecast } from '../../domain/entities/WeatherForecast';

describe('WeatherMapper', () => {
  describe('getWeatherDescription', () => {
    it('devuelve descripción correcta para código conocido', () => {
      expect(WeatherMapper.getWeatherDescription(0)).toBe('Despejado');
      expect(WeatherMapper.getWeatherDescription(3)).toBe('Nublado');
      expect(WeatherMapper.getWeatherDescription(61)).toBe('Lluvia ligera');
    });

    it('devuelve "Desconocido" para código no reconocido', () => {
      expect(WeatherMapper.getWeatherDescription(999)).toBe('Desconocido');
    });
  });

  describe('getWeatherIcon', () => {
    it('devuelve icono correcto para código conocido', () => {
      expect(WeatherMapper.getWeatherIcon(0)).toBe('01d');
      expect(WeatherMapper.getWeatherIcon(3)).toBe('04d');
      expect(WeatherMapper.getWeatherIcon(61)).toBe('10d');
    });

    it('devuelve icono por defecto para código no reconocido', () => {
      expect(WeatherMapper.getWeatherIcon(999)).toBe('01d');
    });
  });

  describe('toWeatherEntity', () => {
    it('transforma datos de API a entidad Weather', () => {
      const apiData = {
        current: {
          temperature_2m: 25.5,
          apparent_temperature: 27.3,
          relative_humidity_2m: 60,
          pressure_msl: 1013,
          wind_speed_10m: 5.5,
          weather_code: 0,
          cloud_cover: 10,
        }
      };

      const location = {
        name: 'Madrid',
        country_code: 'ES',
      };

      const result = WeatherMapper.toWeatherEntity(apiData, location);

      expect(result).toBeInstanceOf(Weather);
      expect(result.city).toBe('Madrid');
      expect(result.country).toBe('ES');
      expect(result.temperature).toBe(26);
      expect(result.feelsLike).toBe(27);
      expect(result.humidity).toBe(60);
    });

    it('redondea temperaturas correctamente', () => {
      const apiData = {
        current: {
          temperature_2m: 25.4,
          apparent_temperature: 26.6,
          relative_humidity_2m: 60,
          pressure_msl: 1013.7,
          wind_speed_10m: 5.5,
          weather_code: 0,
          cloud_cover: 10,
        }
      };

      const location = { name: 'Test', country_code: 'TE' };
      const result = WeatherMapper.toWeatherEntity(apiData, location);

      expect(result.temperature).toBe(25);
      expect(result.feelsLike).toBe(27);
      expect(result.pressure).toBe(1014);
    });
  });

  describe('toWeatherForecastEntity', () => {
    it('transforma datos de API a entidad WeatherForecast', () => {
      const apiData = {
        hourly: {
          time: [
            '2025-01-01T12:00:00',
            '2025-01-01T13:00:00',
            '2025-01-01T14:00:00',
          ],
          temperature_2m: [20, 21, 22],
          weather_code: [0, 1, 2],
          precipitation: [0, 0, 0.5],
          cloud_cover: [10, 20, 30],
        }
      };

      const location = { name: 'Barcelona' };
      
      const result = WeatherMapper.toWeatherForecastEntity(apiData, location);

      expect(result).toBeInstanceOf(WeatherForecast);
      expect(result.city).toBe('Barcelona');
      expect(result.forecasts.length).toBeGreaterThan(0);
      expect(result.forecasts[0].temperature).toBe(20);
    });
  });
});
