export class GetWeatherForecastUseCase {
  constructor(weatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  async execute(city) {
    if (!city || city.trim() === '') {
      throw new Error('Por favor ingresa el nombre de una ciudad.');
    }

    return await this.weatherRepository.getWeatherForecast(city.trim());
  }
}
