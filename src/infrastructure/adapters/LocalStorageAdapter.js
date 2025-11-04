import { Task } from '../../domain/entities/Task';

const STORAGE_KEY = 'keraunos_tasks';

export class LocalStorageAdapter {
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      
      return parsed.map(task => new Task(task));
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  }

  getById(id) {
    const tasks = this.getAll();
    return tasks.find(task => task.id === id) || null;
  }

  create(taskData) {
    const tasks = this.getAll();
    const newTask = new Task({
      id: crypto.randomUUID(),
      ...taskData,
    });
    tasks.push(newTask);
    this._save(tasks);
    return newTask;
  }

  update(id, updates) {
    const tasks = this.getAll();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    const updatedTask = new Task({ ...tasks[index], ...updates });
    tasks[index] = updatedTask;
    this._save(tasks);
    return updatedTask;
  }

  delete(id) {
    const tasks = this.getAll();
    const filteredTasks = tasks.filter(task => task.id !== id);
    this._save(filteredTasks);
    return true;
  }

  _save(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      throw error;
    }
  }
}
