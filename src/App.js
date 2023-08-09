
import './App.css';
import Dashboard from './Dashboard';
import Form from './Form';
import Login from './Login';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
