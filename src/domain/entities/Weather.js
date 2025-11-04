export class Weather {
  constructor({
    city,
    country,
    temperature,
    feelsLike,
    humidity,
    pressure,
    windSpeed,
    description,
    icon,
    clouds,
    visibility,
    timestamp,
  }) {
    this.city = city;
    this.country = country;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.pressure = pressure;
    this.windSpeed = windSpeed;
    this.description = description;
    this.icon = icon;
    this.clouds = clouds;
    this.visibility = visibility;
    this.timestamp = timestamp;
  }

  getTemperatureDisplay() {
    return `${this.temperature}°C`;
  }

  getFeelsLikeDisplay() {
    return `${this.feelsLike}°C`;
  }

  getLocationDisplay() {
    return this.country ? `${this.city}, ${this.country}` : this.city;
  }
}
