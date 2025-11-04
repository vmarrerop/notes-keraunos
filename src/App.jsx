import { TaskProvider } from './presentation/context/TaskContext';
import { TasksPage } from './presentation/pages/TasksPage/TasksPage';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <TasksPage />
    </TaskProvider>
  );
}

export default App;
