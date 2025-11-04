export class Task {
  constructor({ id, title, description, dueDate, statuses = [], notes = '' }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.statuses = statuses;
    this.notes = notes;
  }

  getCurrentStatus() {
    return this.statuses.length > 0 
      ? this.statuses.at(-1) 
      : null;
  }

  addStatus(status) {
    this.statuses.push({
      value: status,
      timestamp: new Date().toISOString()
    });
  }
}
