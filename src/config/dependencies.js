import { TaskRepository } from '../domain/repositories/TaskRepository';
import { WeatherRepository } from '../domain/repositories/WeatherRepository';
import { LocalStorageAdapter } from '../infrastructure/adapters/LocalStorageAdapter';
import { OpenMeteoDataSource } from '../infrastructure/adapters/OpenMeteoDataSource';
import { CreateTaskUseCase } from '../application/usecases/CreateTaskUseCase';
import { UpdateTaskUseCase } from '../application/usecases/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../application/usecases/DeleteTaskUseCase';
import { GetTasksUseCase } from '../application/usecases/GetTasksUseCase';
import { GetWeatherUseCase } from '../application/usecases/GetWeatherUseCase';
import { GetWeatherForecastUseCase } from '../application/usecases/GetWeatherForecastUseCase';

const storageAdapter = new LocalStorageAdapter();
const taskRepository = new TaskRepository(storageAdapter);

const weatherDataSource = new OpenMeteoDataSource();
const weatherRepository = new WeatherRepository(weatherDataSource);

export const taskUseCases = {
  createTask: new CreateTaskUseCase(taskRepository),
  updateTask: new UpdateTaskUseCase(taskRepository),
  deleteTask: new DeleteTaskUseCase(taskRepository),
  getTasks: new GetTasksUseCase(taskRepository),
};

export const weatherUseCases = {
  getWeather: new GetWeatherUseCase(weatherRepository),
  getForecast: new GetWeatherForecastUseCase(weatherRepository),
};
