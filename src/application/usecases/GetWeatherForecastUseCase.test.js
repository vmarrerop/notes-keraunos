import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetWeatherForecastUseCase } from './GetWeatherForecastUseCase';
import { WeatherForecast, ForecastItem } from '../../domain/entities/WeatherForecast';

describe('GetWeatherForecastUseCase', () => {
  let mockRepository;
  let useCase;

  beforeEach(() => {
    mockRepository = {
      getWeatherForecast: vi.fn(),
    };
    useCase = new GetWeatherForecastUseCase(mockRepository);
  });

  it('ejecuta correctamente con una ciudad válida', async () => {
    const mockForecast = new WeatherForecast({
      city: 'Madrid',
      forecasts: [
        new ForecastItem({
          time: new Date(),
          temperature: 22,
          description: 'Nublado',
          icon: '03d',
          rain: 0,
          clouds: 75,
        })
      ]
    });

    mockRepository.getWeatherForecast.mockResolvedValue(mockForecast);

    const result = await useCase.execute('Madrid');

    expect(mockRepository.getWeatherForecast).toHaveBeenCalledWith('Madrid');
    expect(result).toBe(mockForecast);
  });

  it('elimina espacios en blanco del nombre de la ciudad', async () => {
    const mockForecast = new WeatherForecast({
      city: 'Barcelona',
      forecasts: []
    });

    mockRepository.getWeatherForecast.mockResolvedValue(mockForecast);

    await useCase.execute('  Barcelona  ');

    expect(mockRepository.getWeatherForecast).toHaveBeenCalledWith('Barcelona');
  });

  it('lanza error cuando la ciudad está vacía', async () => {
    await expect(useCase.execute('')).rejects.toThrow(
      'Por favor ingresa el nombre de una ciudad.'
    );

    expect(mockRepository.getWeatherForecast).not.toHaveBeenCalled();
  });

  it('lanza error cuando la ciudad es solo espacios', async () => {
    await expect(useCase.execute('   ')).rejects.toThrow(
      'Por favor ingresa el nombre de una ciudad.'
    );

    expect(mockRepository.getWeatherForecast).not.toHaveBeenCalled();
  });

  it('propaga errores del repositorio', async () => {
    const error = new Error('Ciudad no encontrada');
    mockRepository.getWeatherForecast.mockRejectedValue(error);

    await expect(useCase.execute('CiudadInexistente')).rejects.toThrow(
      'Ciudad no encontrada'
    );
  });
});
