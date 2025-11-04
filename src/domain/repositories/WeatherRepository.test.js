import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WeatherRepository } from './WeatherRepository';

describe('WeatherRepository', () => {
  let mockDataSource;
  let repository;

  beforeEach(() => {
    mockDataSource = {
      fetchCurrentWeather: vi.fn(),
      fetchWeatherForecast: vi.fn(),
    };
    repository = new WeatherRepository(mockDataSource);
  });

  describe('getCurrentWeather', () => {
    it('delega la llamada al data source', async () => {
      const mockWeather = {
        city: 'Madrid',
        temperature: 25,
      };

      mockDataSource.fetchCurrentWeather.mockResolvedValue(mockWeather);

      const result = await repository.getCurrentWeather('Madrid');

      expect(mockDataSource.fetchCurrentWeather).toHaveBeenCalledWith('Madrid');
      expect(result).toEqual(mockWeather);
    });

    it('propaga errores del data source', async () => {
      const error = new Error('API Error');
      mockDataSource.fetchCurrentWeather.mockRejectedValue(error);

      await expect(repository.getCurrentWeather('InvalidCity')).rejects.toThrow('API Error');
    });
  });

  describe('getWeatherForecast', () => {
    it('delega la llamada al data source', async () => {
      const mockForecast = {
        city: 'Barcelona',
        forecasts: [],
      };

      mockDataSource.fetchWeatherForecast.mockResolvedValue(mockForecast);

      const result = await repository.getWeatherForecast('Barcelona');

      expect(mockDataSource.fetchWeatherForecast).toHaveBeenCalledWith('Barcelona');
      expect(result).toEqual(mockForecast);
    });

    it('propaga errores del data source', async () => {
      const error = new Error('Network Error');
      mockDataSource.fetchWeatherForecast.mockRejectedValue(error);

      await expect(repository.getWeatherForecast('InvalidCity')).rejects.toThrow('Network Error');
    });
  });
});
