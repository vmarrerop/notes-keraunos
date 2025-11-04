import dbData from '../../../db.json';

export class JsonDataAdapter {
  constructor() {
    this.data = dbData;
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.tasks || []);
      }, 100);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = this.data.tasks.find(t => t.id === id);
        resolve(task || null);
      }, 100);
    });
  }

  async create(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          id: crypto.randomUUID(),
          ...taskData,
        };
        this.data.tasks.push(newTask);
        resolve(newTask);
      }, 100);
    });
  }

  async update(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.data.tasks.findIndex(t => t.id === id);
        
        if (index === -1) {
          reject(new Error(`Task with id ${id} not found`));
          return;
        }

        this.data.tasks[index] = { ...this.data.tasks[index], ...updates };
        resolve(this.data.tasks[index]);
      }, 100);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.data.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.data.tasks.splice(index, 1);
        }
        resolve(true);
      }, 100);
    });
  }
}
