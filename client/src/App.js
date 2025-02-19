import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
//import RequiredAuth from './utils/requiredAuth';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// main routing for app, user is required to login to access certain files.
// dashboard has required auth of "admin" to access it.

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
