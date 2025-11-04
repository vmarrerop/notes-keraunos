import { Task } from '../../domain/entities/Task';
import { STORAGE_CONFIG } from '../config/storage.config';
import dbData from '../../../db.json';

export class LocalStorageAdapter {
  _loadRaw() {
    try {
      const data = localStorage.getItem(STORAGE_CONFIG.TASKS_KEY);
      if (!data) {
        return dbData.tasks || [];
      }

      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];

      return parsed;
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  }

  _saveRaw(tasks) {
    try {
      localStorage.setItem(STORAGE_CONFIG.TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      throw error;
    }
  }

  _serializeForStorage(taskLike) {
    const {
      id,
      title = '',
      description = '',
      dueDate = null,
      statuses = [],
      notes = '',
    } = taskLike;

    return {
      id: id || crypto.randomUUID(),
      title,
      description,
      dueDate,
      notes,
      statuses: Array.isArray(statuses)
        ? statuses.map(({ value, timestamp }) => ({ value, timestamp }))
        : [],
    };
  }

  async getAll() {
    const rawTasks = this._loadRaw();
    let hasChanges = false;

    const normalized = rawTasks.map((task) => {
      const serialized = this._serializeForStorage(task);
      if (!hasChanges) {
        hasChanges = JSON.stringify(serialized) !== JSON.stringify(task);
      }
      return serialized;
    });

    if (hasChanges) {
      this._saveRaw(normalized);
    }

    return normalized.map((task) => new Task(task));
  }

  async getById(id) {
    const tasks = this._loadRaw();
    const found = tasks.find((task) => task.id === id);
    return found ? new Task(found) : null;
  }

  async create(taskData) {
    const tasks = this._loadRaw();
    const newTaskData = this._serializeForStorage({
      ...taskData,
      id: taskData.id || crypto.randomUUID(),
    });
    tasks.push(newTaskData);
    this._saveRaw(tasks);
    return new Task(newTaskData);
  }

  async update(id, updates) {
    const tasks = this._loadRaw();
    const index = tasks.findIndex((task) => task.id === id);
    
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    const baseTask = tasks[index];
    const merged = this._serializeForStorage({
      ...baseTask,
      ...updates,
      statuses: Array.isArray(updates?.statuses)
        ? updates.statuses
        : baseTask.statuses,
    });

    tasks[index] = merged;
    this._saveRaw(tasks);
    return new Task(merged);
  }

  async delete(id) {
    const tasks = this._loadRaw();
    const filteredTasks = tasks.filter((task) => task.id !== id);
    this._saveRaw(filteredTasks);
    return true;
  }
}
