import { describe, it, expect } from 'vitest';
import { Weather } from './Weather';

describe('Weather Entity', () => {
  const weatherData = {
    city: 'Madrid',
    country: 'ES',
    temperature: 25,
    feelsLike: 27,
    humidity: 60,
    pressure: 1013,
    windSpeed: 5.5,
    description: 'Despejado',
    icon: '01d',
    clouds: 10,
    visibility: 10,
    timestamp: new Date('2025-01-01T12:00:00'),
  };

  it('crea una instancia de Weather correctamente', () => {
    const weather = new Weather(weatherData);

    expect(weather.city).toBe('Madrid');
    expect(weather.country).toBe('ES');
    expect(weather.temperature).toBe(25);
    expect(weather.description).toBe('Despejado');
  });

  it('getTemperatureDisplay devuelve formato correcto', () => {
    const weather = new Weather(weatherData);

    expect(weather.getTemperatureDisplay()).toBe('25°C');
  });

  it('getFeelsLikeDisplay devuelve formato correcto', () => {
    const weather = new Weather(weatherData);

    expect(weather.getFeelsLikeDisplay()).toBe('27°C');
  });

  it('getLocationDisplay combina ciudad y país', () => {
    const weather = new Weather(weatherData);

    expect(weather.getLocationDisplay()).toBe('Madrid, ES');
  });

  it('getLocationDisplay solo muestra ciudad si no hay país', () => {
    const weather = new Weather({
      ...weatherData,
      country: '',
    });

    expect(weather.getLocationDisplay()).toBe('Madrid');
  });

  it('mantiene todos los datos meteorológicos', () => {
    const weather = new Weather(weatherData);

    expect(weather.humidity).toBe(60);
    expect(weather.pressure).toBe(1013);
    expect(weather.windSpeed).toBe(5.5);
    expect(weather.clouds).toBe(10);
    expect(weather.visibility).toBe(10);
  });
});
