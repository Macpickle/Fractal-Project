import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailRecovery from './pages/EmailRecovery'
import Dashboard from './pages/Dashboard';
import RequiredAuth from './utils/requiredAuth';

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
          <Route element={<RequiredAuth type = {'login'}/>}>
              <Route path="/" element={<Home />} />

              <Route element={<RequiredAuth type = {'admin'}/>}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
          </Route>
              <Route element={<RequiredAuth callbackURL = {'/'}/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<EmailRecovery/>} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
