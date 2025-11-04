export class WeatherForecast {
  constructor({ city, forecasts }) {
    this.city = city;
    this.forecasts = forecasts;
  }

  getHourlyForecasts(count = 8) {
    return this.forecasts.slice(0, count);
  }

  getForecastCount() {
    return this.forecasts.length;
  }
}

export class ForecastItem {
  constructor({ time, temperature, description, icon, rain, clouds }) {
    this.time = time;
    this.temperature = temperature;
    this.description = description;
    this.icon = icon;
    this.rain = rain;
    this.clouds = clouds;
  }

  getTimeDisplay() {
    return this.time.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  getTemperatureDisplay() {
    return `${this.temperature}°C`;
  }
}
