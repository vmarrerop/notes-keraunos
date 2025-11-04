import { describe, it, expect } from 'vitest';
import { WeatherForecast, ForecastItem } from './WeatherForecast';

describe('ForecastItem Entity', () => {
  const forecastData = {
    time: new Date('2025-01-01T15:00:00'),
    temperature: 22,
    description: 'Nublado',
    icon: '03d',
    rain: 0.5,
    clouds: 75,
  };

  it('crea una instancia de ForecastItem correctamente', () => {
    const item = new ForecastItem(forecastData);

    expect(item.temperature).toBe(22);
    expect(item.description).toBe('Nublado');
    expect(item.rain).toBe(0.5);
  });

  it('getTimeDisplay devuelve formato de hora correcto', () => {
    const item = new ForecastItem(forecastData);
    const timeDisplay = item.getTimeDisplay();

    expect(timeDisplay).toMatch(/\d{2}:\d{2}/);
  });

  it('getTemperatureDisplay devuelve formato correcto', () => {
    const item = new ForecastItem(forecastData);

    expect(item.getTemperatureDisplay()).toBe('22°C');
  });
});

describe('WeatherForecast Entity', () => {
  const forecastItems = [
    new ForecastItem({
      time: new Date('2025-01-01T15:00:00'),
      temperature: 22,
      description: 'Nublado',
      icon: '03d',
      rain: 0,
      clouds: 75,
    }),
    new ForecastItem({
      time: new Date('2025-01-01T16:00:00'),
      temperature: 23,
      description: 'Despejado',
      icon: '01d',
      rain: 0,
      clouds: 10,
    }),
  ];

  it('crea una instancia de WeatherForecast correctamente', () => {
    const forecast = new WeatherForecast({
      city: 'Barcelona',
      forecasts: forecastItems,
    });

    expect(forecast.city).toBe('Barcelona');
    expect(forecast.forecasts).toHaveLength(2);
  });

  it('getHourlyForecasts devuelve el número correcto de pronósticos', () => {
    const forecast = new WeatherForecast({
      city: 'Barcelona',
      forecasts: forecastItems,
    });

    const hourly = forecast.getHourlyForecasts(1);
    expect(hourly).toHaveLength(1);
  });

  it('getHourlyForecasts devuelve máximo 8 por defecto', () => {
    const manyItems = Array.from({ length: 10 }, (_, i) =>
      new ForecastItem({
        time: new Date(`2025-01-01T${15 + i}:00:00`),
        temperature: 20 + i,
        description: 'Test',
        icon: '01d',
        rain: 0,
        clouds: 10,
      })
    );

    const forecast = new WeatherForecast({
      city: 'Test',
      forecasts: manyItems,
    });

    const hourly = forecast.getHourlyForecasts();
    expect(hourly).toHaveLength(8);
  });

  it('getForecastCount devuelve el número total de pronósticos', () => {
    const forecast = new WeatherForecast({
      city: 'Barcelona',
      forecasts: forecastItems,
    });

    expect(forecast.getForecastCount()).toBe(2);
  });
});
