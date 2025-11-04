import { useReducer, useEffect, useCallback, useMemo } from 'react';
import { taskUseCases } from '../../config/dependencies';
import { TaskContext } from './TaskContextDefinition';

const TASK_ACTIONS = {
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

const removeDuplicates = (tasks) => {
  const uniqueTasks = [];
  const seenIds = new Set();
  
  for (const task of tasks) {
    if (!seenIds.has(task.id)) {
      seenIds.add(task.id);
      uniqueTasks.push(task);
    } else {
      console.warn(`⚠️ Tarea duplicada detectada y eliminada - ID: ${task.id}, Título: ${task.title}`);
    }
  }
  
  return uniqueTasks;
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: removeDuplicates(action.payload),
        isLoading: false,
        error: null,
      };
    
    case TASK_ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: removeDuplicates([...state.tasks, action.payload]),
        error: null,
      };
    
    case TASK_ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: removeDuplicates(
          state.tasks.map(task =>
            task.id === action.payload.id ? action.payload : task
          )
        ),
        error: null,
      };
    
    case TASK_ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        error: null,
      };
    
    case TASK_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case TASK_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  isLoading: true,
  error: null,
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        dispatch({ type: TASK_ACTIONS.SET_LOADING, payload: true });
        const storedTasks = await taskUseCases.getTasks.execute();
        dispatch({ type: TASK_ACTIONS.SET_TASKS, payload: storedTasks });
      } catch (error) {
        console.error('Error loading tasks:', error);
        dispatch({ type: TASK_ACTIONS.SET_ERROR, payload: error.message });
      }
    };

    loadTasks();
  }, []);

  const addTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskUseCases.createTask.execute(taskData);
      dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: newTask });
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      dispatch({ type: TASK_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (taskId, updates) => {
    try {
      const updatedTask = await taskUseCases.updateTask.execute(taskId, updates);
      dispatch({ type: TASK_ACTIONS.UPDATE_TASK, payload: updatedTask });
    } catch (error) {
      console.error('Error updating task:', error);
      dispatch({ type: TASK_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    try {
      await taskUseCases.deleteTask.execute(taskId);
      dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: taskId });
    } catch (error) {
      console.error('Error deleting task:', error);
      dispatch({ type: TASK_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const getTaskById = useCallback((taskId) => {
    return state.tasks.find(task => task.id === taskId);
  }, [state.tasks]);

  const value = useMemo(() => ({
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
  }), [state.tasks, state.isLoading, state.error, addTask, updateTask, deleteTask, getTaskById]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
