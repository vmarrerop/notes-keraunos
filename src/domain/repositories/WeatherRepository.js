export class WeatherRepository {
  constructor(weatherDataSource) {
    this.weatherDataSource = weatherDataSource;
  }

  async getCurrentWeather(city) {
    return await this.weatherDataSource.fetchCurrentWeather(city);
  }

  async getWeatherForecast(city) {
    return await this.weatherDataSource.fetchWeatherForecast(city);
  }
}
