import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// main routing for app handles all routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
