import { useState } from 'react';
import { TaskProvider } from './presentation/context/TaskContext';
import { TasksPage } from './presentation/pages/TasksPage/TasksPage';
import { WeatherPage } from './presentation/pages/WeatherPage/WeatherPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('tasks');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <TaskProvider>
      {currentPage === 'tasks' && <TasksPage onNavigate={navigateTo} />}
      {currentPage === 'weather' && <WeatherPage onNavigate={navigateTo} />}
    </TaskProvider>
  );
}

export default App;
