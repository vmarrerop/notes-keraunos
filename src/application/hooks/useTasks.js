import { useState } from 'react';
import { Task } from '../../domain/entities/Task';

export const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState(() => 
    initialTasks.map(task => new Task(task))
  );

  const addTask = (taskData) => {
    const newTask = new Task({
      id: crypto.randomUUID(),
      ...taskData
    });
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? new Task({ ...task, ...updates })
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getTaskById = (taskId) => {
    return tasks.find(task => task.id === taskId);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById
  };
};
