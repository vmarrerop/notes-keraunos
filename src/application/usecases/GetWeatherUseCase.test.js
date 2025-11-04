import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetWeatherUseCase } from './GetWeatherUseCase';
import { Weather } from '../../domain/entities/Weather';

describe('GetWeatherUseCase', () => {
  let mockRepository;
  let useCase;

  beforeEach(() => {
    mockRepository = {
      getCurrentWeather: vi.fn(),
    };
    useCase = new GetWeatherUseCase(mockRepository);
  });

  it('ejecuta correctamente con una ciudad válida', async () => {
    const mockWeather = new Weather({
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
      timestamp: new Date(),
    });

    mockRepository.getCurrentWeather.mockResolvedValue(mockWeather);

    const result = await useCase.execute('Madrid');

    expect(mockRepository.getCurrentWeather).toHaveBeenCalledWith('Madrid');
    expect(result).toBe(mockWeather);
  });

  it('elimina espacios en blanco del nombre de la ciudad', async () => {
    const mockWeather = new Weather({
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
      timestamp: new Date(),
    });

    mockRepository.getCurrentWeather.mockResolvedValue(mockWeather);

    await useCase.execute('  Madrid  ');

    expect(mockRepository.getCurrentWeather).toHaveBeenCalledWith('Madrid');
  });

  it('lanza error cuando la ciudad está vacía', async () => {
    await expect(useCase.execute('')).rejects.toThrow(
      'Por favor ingresa el nombre de una ciudad.'
    );

    expect(mockRepository.getCurrentWeather).not.toHaveBeenCalled();
  });

  it('lanza error cuando la ciudad es solo espacios', async () => {
    await expect(useCase.execute('   ')).rejects.toThrow(
      'Por favor ingresa el nombre de una ciudad.'
    );

    expect(mockRepository.getCurrentWeather).not.toHaveBeenCalled();
  });

  it('propaga errores del repositorio', async () => {
    const error = new Error('Ciudad no encontrada');
    mockRepository.getCurrentWeather.mockRejectedValue(error);

    await expect(useCase.execute('CiudadInexistente')).rejects.toThrow(
      'Ciudad no encontrada'
    );
  });
});
